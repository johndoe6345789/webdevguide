import type { ProjectConfig, GeneratedFile } from './types';

export function generatePackageJson(config: ProjectConfig): GeneratedFile {
  const deps: Record<string, string> = {};
  const devDeps: Record<string, string> = {};

  if (config.framework === 'nextjs') {
    deps['next'] = '^14.2.0';
    deps['react'] = '^18.3.0';
    deps['react-dom'] = '^18.3.0';
    devDeps['@types/react'] = '^18.3.0';
    devDeps['@types/node'] = '^20.0.0';
    devDeps['typescript'] = '^5.4.0';
  } else {
    deps['react'] = '^18.3.0';
    deps['react-dom'] = '^18.3.0';
    deps['react-router-dom'] = '^6.23.0';
    devDeps['vite'] = '^5.2.0';
    devDeps['@vitejs/plugin-react'] = '^4.2.0';
    devDeps['@types/react'] = '^18.3.0';
    devDeps['typescript'] = '^5.4.0';
  }

  if (config.styling === 'mui') {
    deps['@mui/material'] = '^5.15.0';
    deps['@mui/icons-material'] = '^5.15.0';
    deps['@emotion/react'] = '^11.11.0';
    deps['@emotion/styled'] = '^11.11.0';
  } else if (config.styling === 'tailwind') {
    devDeps['tailwindcss'] = '^3.4.0';
    devDeps['postcss'] = '^8.4.0';
    devDeps['autoprefixer'] = '^10.4.0';
  }

  if (config.stateManagement === 'redux-toolkit') {
    deps['@reduxjs/toolkit'] = '^2.2.0';
    deps['react-redux'] = '^9.1.0';
  } else if (config.stateManagement === 'zustand') {
    deps['zustand'] = '^4.5.0';
  }

  if (config.auth === 'jwt') {
    deps['jsonwebtoken'] = '^9.0.0';
    deps['bcryptjs'] = '^2.4.0';
    devDeps['@types/jsonwebtoken'] = '^9.0.0';
    devDeps['@types/bcryptjs'] = '^2.4.0';
  } else if (config.auth === 'oauth') {
    deps['next-auth'] = '^4.24.0';
  }

  if (config.database === 'postgresql') {
    deps['prisma'] = '^5.12.0';
    deps['@prisma/client'] = '^5.12.0';
  } else if (config.database === 'mongodb') {
    deps['mongoose'] = '^8.3.0';
  } else if (config.database === 'sqlite') {
    deps['better-sqlite3'] = '^9.6.0';
    devDeps['@types/better-sqlite3'] = '^7.6.0';
  }

  if (config.features.includes('stripe')) {
    deps['stripe'] = '^15.0.0';
    deps['@stripe/stripe-js'] = '^3.0.0';
  }

  devDeps['eslint'] = '^8.57.0';
  devDeps['prettier'] = '^3.2.0';
  devDeps['vitest'] = '^1.5.0';
  devDeps['@testing-library/react'] = '^15.0.0';

  const scripts: Record<string, string> = config.framework === 'nextjs'
    ? {
        dev: 'next dev',
        build: 'next build',
        start: 'next start',
        lint: 'eslint . --ext .ts,.tsx',
        test: 'vitest',
        'test:watch': 'vitest --watch',
      }
    : {
        dev: 'vite',
        build: 'vite build',
        preview: 'vite preview',
        lint: 'eslint . --ext .ts,.tsx',
        test: 'vitest',
        'test:watch': 'vitest --watch',
      };

  const pkg = {
    name: config.projectName,
    version: '0.1.0',
    private: true,
    scripts,
    dependencies: Object.fromEntries(
      Object.entries(deps)
        .sort(([a], [b]) => a.localeCompare(b)),
    ),
    devDependencies: Object.fromEntries(
      Object.entries(devDeps)
        .sort(([a], [b]) => a.localeCompare(b)),
    ),
  };

  return {
    path: 'package.json',
    content: JSON.stringify(pkg, null, 2),
    language: 'json',
  };
}

export function generateDockerfile(config: ProjectConfig): GeneratedFile {
  const isNext = config.framework === 'nextjs';
  const content = `FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
${config.database === 'postgresql' ? 'RUN npx prisma generate\n' : ''}RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 appuser

${isNext
    ? `COPY --from=builder /app/public ./public
COPY --from=builder --chown=appuser:nodejs /app/.next/standalone ./
COPY --from=builder --chown=appuser:nodejs /app/.next/static ./.next/static`
    : `COPY --from=builder /app/dist ./dist
RUN npm install -g serve`}

USER appuser
EXPOSE 3000
ENV PORT=3000

${isNext ? 'CMD ["node", "server.js"]' : 'CMD ["serve", "-s", "dist", "-l", "3000"]'}
`;
  return { path: 'Dockerfile', content, language: 'dockerfile' };
}

export function generateDockerCompose(config: ProjectConfig): GeneratedFile {
  const services: string[] = [];

  services.push(`  app:
    build: .
    ports:
      - "3000:3000"
    env_file:
      - .env
    depends_on:${config.database === 'postgresql' ? '\n      - postgres' : config.database === 'mongodb' ? '\n      - mongo' : '\n      []'}`);

  if (config.database === 'postgresql') {
    services.push(`  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: \${DB_NAME:-${config.projectName}}
      POSTGRES_USER: \${DB_USER:-postgres}
      POSTGRES_PASSWORD: \${DB_PASSWORD:-password}
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data`);
  }

  if (config.database === 'mongodb') {
    services.push(`  mongo:
    image: mongo:7
    environment:
      MONGO_INITDB_ROOT_USERNAME: \${DB_USER:-admin}
      MONGO_INITDB_ROOT_PASSWORD: \${DB_PASSWORD:-password}
    ports:
      - "27017:27017"
    volumes:
      - mongodata:/data/db`);
  }

  if (config.features.includes('caching')) {
    services.push(`  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"`);
  }

  let volumes = '';
  if (config.database === 'postgresql') volumes += '\n  pgdata:';
  if (config.database === 'mongodb') volumes += '\n  mongodata:';

  const content = `version: "3.9"

services:
${services.join('\n\n')}
${volumes ? `\nvolumes:${volumes}\n` : ''}`;

  return { path: 'docker-compose.yml', content, language: 'yaml' };
}

export function generateEnvExample(config: ProjectConfig): GeneratedFile {
  const lines = [
    '# Application',
    `APP_NAME=${config.projectName}`,
    'NODE_ENV=development',
    'PORT=3000',
    '',
  ];

  if (config.database === 'postgresql') {
    lines.push('# Database', 'DATABASE_URL=postgresql://postgres:password@localhost:5432/' + config.projectName, 'DB_NAME=' + config.projectName, 'DB_USER=postgres', 'DB_PASSWORD=password', '');
  } else if (config.database === 'mongodb') {
    lines.push('# Database', 'MONGODB_URI=mongodb://admin:password@localhost:27017/' + config.projectName, 'DB_USER=admin', 'DB_PASSWORD=password', '');
  } else if (config.database === 'sqlite') {
    lines.push('# Database', 'DATABASE_PATH=./data/app.db', '');
  }

  if (config.auth === 'jwt') {
    lines.push('# Auth', 'JWT_SECRET=change-me-to-a-random-string', 'JWT_EXPIRES_IN=7d', '');
  } else if (config.auth === 'oauth') {
    lines.push('# Auth (NextAuth)', 'NEXTAUTH_URL=http://localhost:3000', 'NEXTAUTH_SECRET=change-me', 'GOOGLE_CLIENT_ID=', 'GOOGLE_CLIENT_SECRET=', '');
  }

  if (config.features.includes('stripe')) {
    lines.push('# Stripe', 'STRIPE_SECRET_KEY=sk_test_...', 'STRIPE_PUBLISHABLE_KEY=pk_test_...', 'STRIPE_WEBHOOK_SECRET=whsec_...', '');
  }

  if (config.features.includes('caching')) {
    lines.push('# Redis', 'REDIS_URL=redis://localhost:6379', '');
  }

  return { path: '.env.example', content: lines.join('\n'), language: 'bash' };
}

export function generateTsConfig(config: ProjectConfig): GeneratedFile {
  const tsconfig = config.framework === 'nextjs'
    ? {
        compilerOptions: {
          target: 'es2017',
          lib: ['dom', 'dom.iterable', 'esnext'],
          allowJs: true,
          skipLibCheck: true,
          strict: true,
          noEmit: true,
          esModuleInterop: true,
          module: 'esnext',
          moduleResolution: 'bundler',
          resolveJsonModule: true,
          isolatedModules: true,
          jsx: 'preserve',
          incremental: true,
          plugins: [{ name: 'next' }],
          paths: { '@/*': ['./src/*'] },
        },
        include: ['next-env.d.ts', '**/*.ts', '**/*.tsx', '.next/types/**/*.ts'],
        exclude: ['node_modules'],
      }
    : {
        compilerOptions: {
          target: 'ES2020',
          useDefineForClassFields: true,
          lib: ['ES2020', 'DOM', 'DOM.Iterable'],
          module: 'ESNext',
          skipLibCheck: true,
          moduleResolution: 'bundler',
          allowImportingTsExtensions: true,
          resolveJsonModule: true,
          isolatedModules: true,
          noEmit: true,
          jsx: 'react-jsx',
          strict: true,
          noUnusedLocals: true,
          noUnusedParameters: true,
          noFallthroughCasesInSwitch: true,
          paths: { '@/*': ['./src/*'] },
        },
        include: ['src'],
        references: [{ path: './tsconfig.node.json' }],
      };

  return { path: 'tsconfig.json', content: JSON.stringify(tsconfig, null, 2), language: 'json' };
}

export function generateGitignore(): GeneratedFile {
  const content = `node_modules/
.next/
dist/
build/
.env
.env.local
*.log
.DS_Store
coverage/
.turbo/
`;
  return { path: '.gitignore', content, language: 'bash' };
}

export function generateReadme(config: ProjectConfig): GeneratedFile {
  const domain = config.domain.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const content = `# ${config.projectName}

${domain} built with ${config.framework === 'nextjs' ? 'Next.js' : 'Vite + React'}, ${config.styling === 'mui' ? 'Material UI' : config.styling === 'tailwind' ? 'Tailwind CSS' : 'CSS Modules'}, and ${config.stateManagement === 'redux-toolkit' ? 'Redux Toolkit' : config.stateManagement === 'zustand' ? 'Zustand' : 'React Context'}.

## Getting Started

\`\`\`bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Run development server
npm run dev
\`\`\`

## Tech Stack

- **Framework:** ${config.framework === 'nextjs' ? 'Next.js 14' : 'Vite + React 18'}
- **Styling:** ${config.styling === 'mui' ? 'Material UI 5' : config.styling === 'tailwind' ? 'Tailwind CSS 3' : 'CSS Modules'}
- **State:** ${config.stateManagement === 'redux-toolkit' ? 'Redux Toolkit' : config.stateManagement === 'zustand' ? 'Zustand' : 'React Context'}
- **Auth:** ${config.auth === 'jwt' ? 'JWT' : config.auth === 'oauth' ? 'OAuth (NextAuth)' : 'None'}
- **Database:** ${config.database === 'postgresql' ? 'PostgreSQL (Prisma)' : config.database === 'mongodb' ? 'MongoDB (Mongoose)' : config.database === 'sqlite' ? 'SQLite' : 'JSON File'}

## Docker

\`\`\`bash
docker-compose up -d
\`\`\`

## Testing

\`\`\`bash
npm test
\`\`\`
`;
  return { path: 'README.md', content, language: 'markdown' };
}

export function generateTestSetup(): GeneratedFile {
  const content = `import '@testing-library/jest-dom';
`;
  return { path: 'src/test/setup.ts', content, language: 'typescript' };
}

export function generateAppTest(config: ProjectConfig): GeneratedFile {
  const content = `import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
${config.framework === 'nextjs'
    ? `import Home from '@/app/page';

describe('Home', () => {
  it('renders the home page', () => {
    render(<Home />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
});`
    : `import App from '../App';

describe('App', () => {
  it('renders the app', () => {
    render(<App />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
});`}
`;
  return { path: 'src/test/App.test.tsx', content, language: 'tsx' };
}
