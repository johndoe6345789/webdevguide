import type { ProjectConfig, GeneratedFile } from '../types';

export function generateMedia(config: ProjectConfig): GeneratedFile[] {
  const files: GeneratedFile[] = [];
  const isNext = config.framework === 'nextjs';
  const isMui = config.styling === 'mui';

  files.push({
    path: 'src/types/media.ts',
    language: 'typescript',
    content: `export interface MediaItem {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  mediaUrl: string;
  duration: number;
  views: number;
  uploadedAt: string;
  author: { id: string; name: string; avatar: string };
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  items: MediaItem[];
  createdAt: string;
}
`,
  });

  files.push({
    path: isNext ? 'src/app/page.tsx' : 'src/App.tsx',
    language: 'tsx',
    content: isMui
      ? `import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MediaGrid from '@/components/MediaGrid';

export default function HomePage() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
        ${config.projectName}
      </Typography>
      <MediaGrid />
    </Container>
  );
}
`
      : `import MediaGrid from './components/MediaGrid';

export default function App() {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem' }}>
      <h1>${config.projectName}</h1>
      <MediaGrid />
    </div>
  );
}
`,
  });

  files.push({
    path: 'src/components/MediaGrid.tsx',
    language: 'tsx',
    content: isMui
      ? `'use client';

import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { MediaItem } from '@/types/media';

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return \`\${m}:\${s.toString().padStart(2, '0')}\`;
}

const MOCK_ITEMS: MediaItem[] = [
  { id: '1', title: 'Introduction to Web Development', description: 'Learn the basics', thumbnailUrl: '', mediaUrl: '', duration: 720, views: 15000, uploadedAt: '2024-03-01', author: { id: 'a1', name: 'Creator', avatar: '' } },
  { id: '2', title: 'Advanced React Patterns', description: 'Deep dive into React', thumbnailUrl: '', mediaUrl: '', duration: 1200, views: 8500, uploadedAt: '2024-03-05', author: { id: 'a1', name: 'Creator', avatar: '' } },
  { id: '3', title: 'Building REST APIs', description: 'API design patterns', thumbnailUrl: '', mediaUrl: '', duration: 900, views: 12000, uploadedAt: '2024-03-10', author: { id: 'a2', name: 'Author2', avatar: '' } },
];

export default function MediaGrid() {
  const [items, setItems] = useState<MediaItem[]>([]);

  useEffect(() => { setItems(MOCK_ITEMS); }, []);

  return (
    <Grid container spacing={3}>
      {items.map((item) => (
        <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <Card variant="outlined">
            <CardActionArea href={\`/watch/\${item.id}\`}>
              <Box sx={{ position: 'relative', pt: '56.25%', bgcolor: 'grey.200' }}>
                <Box sx={{ position: 'absolute', bottom: 8, right: 8, bgcolor: 'rgba(0,0,0,0.7)', color: 'white', px: 0.75, py: 0.25, borderRadius: 1, fontSize: '0.75rem' }}>
                  {formatDuration(item.duration)}
                </Box>
              </Box>
              <CardContent>
                <Typography variant="subtitle1" fontWeight={600} noWrap>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.author.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {item.views.toLocaleString()} views
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
`
      : `'use client';

import { useState, useEffect } from 'react';
import type { MediaItem } from '../types/media';

export default function MediaGrid() {
  const [items, setItems] = useState<MediaItem[]>([]);

  useEffect(() => {
    setItems([
      { id: '1', title: 'Intro to Web Dev', description: '', thumbnailUrl: '', mediaUrl: '', duration: 720, views: 15000, uploadedAt: '2024-03-01', author: { id: 'a1', name: 'Creator', avatar: '' } },
    ]);
  }, []);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
      {items.map((item) => (
        <a key={item.id} href={\`/watch/\${item.id}\`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{ border: '1px solid #ddd', borderRadius: 8, overflow: 'hidden' }}>
            <div style={{ paddingTop: '56.25%', background: '#eee', position: 'relative' }} />
            <div style={{ padding: 12 }}>
              <h3 style={{ margin: 0, fontSize: '1rem' }}>{item.title}</h3>
              <small>{item.author.name} &middot; {item.views.toLocaleString()} views</small>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
`,
  });

  if (isNext) {
    files.push({
      path: 'src/app/api/media/route.ts',
      language: 'typescript',
      content: `import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);

  // TODO: Fetch from database
  return NextResponse.json({ items: [], total: 0, page });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const title = formData.get('title') as string;

  if (!title) {
    return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  }

  // TODO: Handle file upload and transcoding
  return NextResponse.json({ id: crypto.randomUUID(), title }, { status: 201 });
}
`,
    });
  }

  return files;
}
