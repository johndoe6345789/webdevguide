import type { ProjectConfig, GeneratedFile } from '../types';

export function generatePersonalHomepage(
  config: ProjectConfig,
): GeneratedFile[] {
  const files: GeneratedFile[] = [];
  const isNext = config.framework === 'nextjs';
  const isMui = config.styling === 'mui';
  const isTw = config.styling === 'tailwind';

  // Main page / App entry
  if (isNext) {
    files.push({
      path: 'src/app/page.tsx',
      language: 'tsx',
      content: `import HeroSection from '@/components/HeroSection';
${config.features.includes('project-gallery') ? "import ProjectGallery from '@/components/ProjectGallery';" : ''}
${config.features.includes('contact-form') ? "import ContactForm from '@/components/ContactForm';" : ''}

export default function HomePage() {
  return (
    <main>
      <HeroSection />
${config.features.includes('project-gallery') ? '      <ProjectGallery />' : ''}
${config.features.includes('contact-form') ? '      <ContactForm />' : ''}
    </main>
  );
}
`,
    });

    files.push({
      path: 'src/app/layout.tsx',
      language: 'tsx',
      content: `import type { Metadata } from 'next';
${isMui ? "import { ThemeProvider } from '@mui/material/styles';\nimport CssBaseline from '@mui/material/CssBaseline';\nimport theme from '@/theme';" : ''}
${isTw ? "import './globals.css';" : ''}

export const metadata: Metadata = {
  title: '${config.projectName} | Portfolio',
  description: 'Personal portfolio website',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        ${isMui ? '<ThemeProvider theme={theme}>\n          <CssBaseline />\n          {children}\n        </ThemeProvider>' : '{children}'}
      </body>
    </html>
  );
}
`,
    });
  } else {
    files.push({
      path: 'src/App.tsx',
      language: 'tsx',
      content: `import HeroSection from './components/HeroSection';
${config.features.includes('project-gallery') ? "import ProjectGallery from './components/ProjectGallery';" : ''}
${config.features.includes('contact-form') ? "import ContactForm from './components/ContactForm';" : ''}

export default function App() {
  return (
    <main>
      <HeroSection />
${config.features.includes('project-gallery') ? '      <ProjectGallery />' : ''}
${config.features.includes('contact-form') ? '      <ContactForm />' : ''}
    </main>
  );
}
`,
    });
  }

  // Hero Section
  files.push({
    path: `src/components/HeroSection.tsx`,
    language: 'tsx',
    content: isMui
      ? `'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function HeroSection() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography variant="h2" component="h1" fontWeight={800} gutterBottom>
          Hi, I&apos;m Your Name
        </Typography>
        <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
          Full-Stack Developer &amp; Designer
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button variant="contained" color="secondary" size="large" href="#projects">
            View My Work
          </Button>
          <Button variant="outlined" sx={{ color: 'white', borderColor: 'white' }} size="large" href="#contact">
            Get in Touch
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
`
      : `'use client';

export default function HeroSection() {
  return (
    <section${isTw ? ' className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white"' : ''}>
      <div${isTw ? ' className="text-center max-w-2xl mx-auto px-4"' : ''}>
        <h1${isTw ? ' className="text-5xl font-bold mb-4"' : ''}>Hi, I&apos;m Your Name</h1>
        <p${isTw ? ' className="text-xl mb-8 opacity-90"' : ''}>Full-Stack Developer &amp; Designer</p>
        <div${isTw ? ' className="flex gap-4 justify-center"' : ''}>
          <a href="#projects"${isTw ? ' className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100"' : ''}>View My Work</a>
          <a href="#contact"${isTw ? ' className="px-6 py-3 border-2 border-white rounded-lg font-semibold hover:bg-white/10"' : ''}>Get in Touch</a>
        </div>
      </div>
    </section>
  );
}
`,
  });

  // Project Gallery
  if (config.features.includes('project-gallery')) {
    files.push({
      path: 'src/components/ProjectGallery.tsx',
      language: 'tsx',
      content: isMui
        ? `'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';

interface Project {
  title: string;
  description: string;
  tags: string[];
  demoUrl: string;
  repoUrl: string;
}

const PROJECTS: Project[] = [
  {
    title: 'Project One',
    description: 'A full-stack web application with real-time features.',
    tags: ['React', 'Node.js', 'WebSocket'],
    demoUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'Project Two',
    description: 'Mobile-first e-commerce platform with Stripe payments.',
    tags: ['Next.js', 'Stripe', 'PostgreSQL'],
    demoUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'Project Three',
    description: 'Open-source CLI tool for developer productivity.',
    tags: ['TypeScript', 'Node.js', 'CLI'],
    demoUrl: '#',
    repoUrl: '#',
  },
];

export default function ProjectGallery() {
  return (
    <Box id="projects" sx={{ py: 10 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" component="h2" fontWeight={700} textAlign="center" gutterBottom>
          Projects
        </Typography>
        <Typography variant="h6" color="text.secondary" textAlign="center" sx={{ mb: 6 }}>
          A selection of my recent work
        </Typography>
        <Grid container spacing={4}>
          {PROJECTS.map((project) => (
            <Grid key={project.title} size={{ xs: 12, md: 4 }}>
              <Card variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {project.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {project.description}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    {project.tags.map((tag) => (
                      <Chip key={tag} label={tag} size="small" variant="outlined" />
                    ))}
                  </Box>
                </CardContent>
                <CardActions>
                  <Button size="small" href={project.demoUrl}>Live Demo</Button>
                  <Button size="small" href={project.repoUrl}>Source Code</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
`
        : `'use client';

interface Project {
  title: string;
  description: string;
  tags: string[];
  demoUrl: string;
  repoUrl: string;
}

const PROJECTS: Project[] = [
  { title: 'Project One', description: 'A full-stack web app.', tags: ['React', 'Node.js'], demoUrl: '#', repoUrl: '#' },
  { title: 'Project Two', description: 'E-commerce platform.', tags: ['Next.js', 'Stripe'], demoUrl: '#', repoUrl: '#' },
  { title: 'Project Three', description: 'Open-source CLI tool.', tags: ['TypeScript', 'CLI'], demoUrl: '#', repoUrl: '#' },
];

export default function ProjectGallery() {
  return (
    <section id="projects"${isTw ? ' className="py-20 px-4"' : ''}>
      <h2${isTw ? ' className="text-3xl font-bold text-center mb-8"' : ''}>Projects</h2>
      <div${isTw ? ' className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6"' : ''}>
        {PROJECTS.map((p) => (
          <div key={p.title}${isTw ? ' className="border rounded-lg p-6 hover:shadow-lg transition-shadow"' : ''}>
            <h3${isTw ? ' className="text-xl font-semibold mb-2"' : ''}>{p.title}</h3>
            <p${isTw ? ' className="text-gray-600 mb-4"' : ''}>{p.description}</p>
            <div${isTw ? ' className="flex gap-2 flex-wrap mb-4"' : ''}>
              {p.tags.map((t) => (
                <span key={t}${isTw ? ' className="px-2 py-1 bg-gray-100 rounded text-sm"' : ''}>{t}</span>
              ))}
            </div>
            <div${isTw ? ' className="flex gap-4"' : ''}>
              <a href={p.demoUrl}${isTw ? ' className="text-indigo-600 hover:underline"' : ''}>Demo</a>
              <a href={p.repoUrl}${isTw ? ' className="text-indigo-600 hover:underline"' : ''}>Source</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
`,
    });
  }

  // Contact Form
  if (config.features.includes('contact-form')) {
    files.push({
      path: 'src/components/ContactForm.tsx',
      language: 'tsx',
      content: isMui
        ? `'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send form data to API
    console.log('Contact form submitted:', form);
  };

  return (
    <Box id="contact" sx={{ py: 10, bgcolor: 'action.hover' }}>
      <Container maxWidth="sm">
        <Typography variant="h3" component="h2" fontWeight={700} textAlign="center" gutterBottom>
          Get in Touch
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required fullWidth />
          <TextField label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required fullWidth />
          <TextField label="Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required fullWidth multiline rows={4} />
          <Button type="submit" variant="contained" size="large">Send Message</Button>
        </Box>
      </Container>
    </Box>
  );
}
`
        : `'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', form);
  };

  return (
    <section id="contact"${isTw ? ' className="py-20 px-4 bg-gray-50"' : ''}>
      <div${isTw ? ' className="max-w-md mx-auto"' : ''}>
        <h2${isTw ? ' className="text-3xl font-bold text-center mb-8"' : ''}>Get in Touch</h2>
        <form onSubmit={handleSubmit}${isTw ? ' className="space-y-4"' : ''}>
          <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required${isTw ? ' className="w-full px-4 py-2 border rounded-lg"' : ''} />
          <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required${isTw ? ' className="w-full px-4 py-2 border rounded-lg"' : ''} />
          <textarea placeholder="Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required rows={4}${isTw ? ' className="w-full px-4 py-2 border rounded-lg"' : ''} />
          <button type="submit"${isTw ? ' className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700"' : ''}>Send Message</button>
        </form>
      </div>
    </section>
  );
}
`,
    });
  }

  // API route for contact form
  if (config.features.includes('contact-form') && isNext) {
    files.push({
      path: 'src/app/api/contact/route.ts',
      language: 'typescript',
      content: `import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  // TODO: Send email or store in database
  console.log('Contact form submission:', { name, email, message });

  return NextResponse.json({ success: true, message: 'Message received!' });
}
`,
    });
  }

  return files;
}
