import type { ProjectConfig, GeneratedFile } from '../types';

export function generateApiBackend(config: ProjectConfig): GeneratedFile[] {
  const files: GeneratedFile[] = [];

  // Server entry point
  files.push({
    path: 'src/server.ts',
    language: 'typescript',
    content: `import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
${config.features.includes('rate-limiting') ? "import rateLimit from 'express-rate-limit';" : ''}
${config.features.includes('logging') ? "import morgan from 'morgan';\nimport { logger } from './lib/logger';" : ''}
import { errorHandler } from './middleware/errorHandler';
import apiRouter from './routes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
${config.features.includes('logging') ? "app.use(morgan('combined'));" : ''}

${config.features.includes('rate-limiting') ? `// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);
` : ''}
// Routes
app.use('/api', apiRouter);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  ${config.features.includes('logging') ? "logger.info(`Server running on port \${PORT}`);" : "console.log(`Server running on port \${PORT}`);"}
});

export default app;
`,
  });

  // Routes index
  files.push({
    path: 'src/routes/index.ts',
    language: 'typescript',
    content: `import { Router } from 'express';
${config.auth !== 'none' ? "import authRouter from './auth';" : ''}
import usersRouter from './users';

const router = Router();

${config.auth !== 'none' ? "router.use('/auth', authRouter);" : ''}
router.use('/users', usersRouter);

export default router;
`,
  });

  // Users route
  files.push({
    path: 'src/routes/users.ts',
    language: 'typescript',
    content: `import { Router, type Request, type Response } from 'express';
${config.features.includes('validation') ? "import { validateBody } from '../middleware/validate';\nimport { userSchema } from '../schemas/user';" : ''}
${config.auth !== 'none' ? "import { authenticate } from '../middleware/auth';" : ''}

const router = Router();

// GET /api/users
router.get('/', ${config.auth !== 'none' ? 'authenticate, ' : ''}async (_req: Request, res: Response) => {
  // TODO: Fetch users from database
  res.json({ users: [], total: 0 });
});

// GET /api/users/:id
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  // TODO: Fetch user by ID
  res.json({ id, name: 'John Doe', email: 'john@example.com' });
});

// POST /api/users
router.post('/', ${config.features.includes('validation') ? "validateBody(userSchema), " : ''}async (req: Request, res: Response) => {
  const { name, email } = req.body;
  // TODO: Store in database
  res.status(201).json({ id: crypto.randomUUID(), name, email });
});

// PUT /api/users/:id
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  // TODO: Update in database
  res.json({ id, ...req.body });
});

// DELETE /api/users/:id
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  // TODO: Delete from database
  res.json({ deleted: true, id });
});

export default router;
`,
  });

  // Error handler middleware
  files.push({
    path: 'src/middleware/errorHandler.ts',
    language: 'typescript',
    content: `import type { Request, Response, NextFunction } from 'express';
${config.features.includes('logging') ? "import { logger } from '../lib/logger';" : ''}

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true,
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  ${config.features.includes('logging') ? "logger.error('Unhandled error:', err);" : "console.error('Unhandled error:', err);"}

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: { message: err.message, status: err.statusCode },
    });
  }

  return res.status(500).json({
    error: { message: 'Internal server error', status: 500 },
  });
}
`,
  });

  // Auth middleware
  if (config.auth !== 'none') {
    files.push({
      path: 'src/middleware/auth.ts',
      language: 'typescript',
      content: config.auth === 'jwt'
        ? `import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './errorHandler';

const JWT_SECRET = process.env.JWT_SECRET || 'change-me';

interface JwtPayload {
  userId: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export function authenticate(req: Request, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError(401, 'Authentication required');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = decoded;
    next();
  } catch {
    throw new AppError(401, 'Invalid or expired token');
  }
}
`
        : `import type { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler';

export function authenticate(req: Request, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError(401, 'Authentication required');
  }

  // TODO: Validate OAuth token
  next();
}
`,
    });

    // Auth routes
    files.push({
      path: 'src/routes/auth.ts',
      language: 'typescript',
      content: `import { Router, type Request, type Response } from 'express';
${config.auth === 'jwt' ? "import jwt from 'jsonwebtoken';\nimport bcrypt from 'bcryptjs';" : ''}

const router = Router();

${config.auth === 'jwt' ? `const JWT_SECRET = process.env.JWT_SECRET || 'change-me';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// POST /api/auth/register
router.post('/register', async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  // TODO: Check if user exists in database
  const hashedPassword = await bcrypt.hash(password, 12);

  // TODO: Store user in database
  const user = { id: crypto.randomUUID(), email, name, password: hashedPassword };

  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  res.status(201).json({ user: { id: user.id, email, name }, token });
});

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // TODO: Fetch user from database
  const user = { id: '1', email, password: await bcrypt.hash('password', 12), name: 'User' };

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  return res.json({ user: { id: user.id, email, name: user.name }, token });
});
` : `// POST /api/auth/callback
router.post('/callback', async (req: Request, res: Response) => {
  const { code } = req.body;
  // TODO: Exchange OAuth code for tokens
  res.json({ accessToken: 'mock-token', code });
});
`}
export default router;
`,
    });
  }

  // Validation middleware
  if (config.features.includes('validation')) {
    files.push({
      path: 'src/middleware/validate.ts',
      language: 'typescript',
      content: `import type { Request, Response, NextFunction } from 'express';
import type { ZodSchema } from 'zod';

export function validateBody(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: {
          message: 'Validation failed',
          details: result.error.flatten().fieldErrors,
        },
      });
    }
    req.body = result.data;
    return next();
  };
}
`,
    });

    files.push({
      path: 'src/schemas/user.ts',
      language: 'typescript',
      content: `import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8).optional(),
});

export type UserInput = z.infer<typeof userSchema>;
`,
    });
  }

  // Logger
  if (config.features.includes('logging')) {
    files.push({
      path: 'src/lib/logger.ts',
      language: 'typescript',
      content: `const LOG_LEVELS = { debug: 0, info: 1, warn: 2, error: 3 } as const;
type LogLevel = keyof typeof LOG_LEVELS;

const currentLevel: LogLevel = (process.env.LOG_LEVEL as LogLevel) || 'info';

function log(level: LogLevel, message: string, ...args: unknown[]) {
  if (LOG_LEVELS[level] < LOG_LEVELS[currentLevel]) return;

  const timestamp = new Date().toISOString();
  const entry = { timestamp, level, message, ...(args.length > 0 ? { data: args } : {}) };

  if (level === 'error') {
    console.error(JSON.stringify(entry));
  } else if (level === 'warn') {
    console.warn(JSON.stringify(entry));
  } else {
    console.log(JSON.stringify(entry));
  }
}

export const logger = {
  debug: (msg: string, ...args: unknown[]) => log('debug', msg, ...args),
  info: (msg: string, ...args: unknown[]) => log('info', msg, ...args),
  warn: (msg: string, ...args: unknown[]) => log('warn', msg, ...args),
  error: (msg: string, ...args: unknown[]) => log('error', msg, ...args),
};
`,
    });
  }

  // Override package.json for backend-only projects
  const deps: Record<string, string> = {
    express: '^4.19.0',
    cors: '^2.8.5',
    helmet: '^7.1.0',
    dotenv: '^16.4.0',
  };
  const devDeps: Record<string, string> = {
    '@types/express': '^4.17.0',
    '@types/cors': '^2.8.0',
    '@types/node': '^20.0.0',
    typescript: '^5.4.0',
    'ts-node-dev': '^2.0.0',
    vitest: '^1.5.0',
  };

  if (config.auth === 'jwt') {
    deps['jsonwebtoken'] = '^9.0.0';
    deps['bcryptjs'] = '^2.4.0';
    devDeps['@types/jsonwebtoken'] = '^9.0.0';
    devDeps['@types/bcryptjs'] = '^2.4.0';
  }
  if (config.features.includes('validation')) {
    deps['zod'] = '^3.23.0';
  }
  if (config.features.includes('rate-limiting')) {
    deps['express-rate-limit'] = '^7.2.0';
  }
  if (config.features.includes('logging')) {
    deps['morgan'] = '^1.10.0';
    devDeps['@types/morgan'] = '^1.9.0';
  }

  files.push({
    path: 'package.json',
    language: 'json',
    content: JSON.stringify({
      name: config.projectName,
      version: '0.1.0',
      private: true,
      scripts: {
        dev: 'ts-node-dev --respawn src/server.ts',
        build: 'tsc',
        start: 'node dist/server.js',
        test: 'vitest',
        lint: 'eslint . --ext .ts',
      },
      dependencies: Object.fromEntries(
        Object.entries(deps)
          .sort(([a], [b]) => a.localeCompare(b)),
      ),
      devDependencies: Object.fromEntries(
        Object.entries(devDeps)
          .sort(([a], [b]) => a.localeCompare(b)),
      ),
    }, null, 2),
  });

  return files;
}
