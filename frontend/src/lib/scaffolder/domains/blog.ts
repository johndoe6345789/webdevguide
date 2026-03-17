import type { ProjectConfig, GeneratedFile } from '../types';

export function generateBlog(config: ProjectConfig): GeneratedFile[] {
  const files: GeneratedFile[] = [];
  const isNext = config.framework === 'nextjs';
  const isMui = config.styling === 'mui';

  // Main page
  files.push({
    path: isNext ? 'src/app/page.tsx' : 'src/App.tsx',
    language: 'tsx',
    content: isMui
      ? `import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import PostList from '@/components/PostList';

export default function HomePage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" fontWeight={800} gutterBottom>
        ${config.projectName}
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        Thoughts, tutorials, and insights
      </Typography>
      <PostList />
    </Container>
  );
}
`
      : `import PostList from './components/PostList';

export default function App() {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '2rem' }}>
      <h1>${config.projectName}</h1>
      <p>Thoughts, tutorials, and insights</p>
      <PostList />
    </div>
  );
}
`,
  });

  // Post type
  files.push({
    path: 'src/types/post.ts',
    language: 'typescript',
    content: `export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  ${config.features.includes('categories') ? 'category: string;\n  tags: string[];' : ''}
  ${config.features.includes('reading-time') ? 'readingTime: number;' : ''}
}
`,
  });

  // PostList
  files.push({
    path: 'src/components/PostList.tsx',
    language: 'tsx',
    content: isMui
      ? `'use client';

import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import type { Post } from '@/types/post';

const MOCK_POSTS: Post[] = [
  {
    id: '1', title: 'Getting Started with React', slug: 'getting-started-react',
    excerpt: 'Learn the fundamentals of React and build your first component.',
    content: '', author: 'Author', publishedAt: '2024-01-15',
    ${config.features.includes('categories') ? "category: 'Tutorial', tags: ['react', 'javascript']," : ''}
    ${config.features.includes('reading-time') ? 'readingTime: 5,' : ''}
  },
  {
    id: '2', title: 'TypeScript Best Practices', slug: 'typescript-best-practices',
    excerpt: 'Write safer, more maintainable code with these TypeScript patterns.',
    content: '', author: 'Author', publishedAt: '2024-02-10',
    ${config.features.includes('categories') ? "category: 'Guide', tags: ['typescript', 'patterns']," : ''}
    ${config.features.includes('reading-time') ? 'readingTime: 8,' : ''}
  },
];

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    setPosts(MOCK_POSTS);
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {posts.map((post) => (
        <Card key={post.id} variant="outlined">
          <CardActionArea href={\`/blog/\${post.slug}\`}>
            <CardContent>
              <Typography variant="h5" fontWeight={600} gutterBottom>
                {post.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {post.excerpt}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Typography variant="caption" color="text.secondary">
                  {post.publishedAt}
                </Typography>
                ${config.features.includes('reading-time') ? "{post.readingTime && (\n                  <Typography variant=\"caption\" color=\"text.secondary\">\n                    {post.readingTime} min read\n                  </Typography>\n                )}" : ''}
                ${config.features.includes('categories') ? "{post.tags?.map((tag) => (\n                  <Chip key={tag} label={tag} size=\"small\" variant=\"outlined\" />\n                ))}" : ''}
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}
`
      : `'use client';

import { useState, useEffect } from 'react';
import type { Post } from '../types/post';

const MOCK_POSTS: Post[] = [
  {
    id: '1', title: 'Getting Started with React', slug: 'getting-started-react',
    excerpt: 'Learn the fundamentals of React.', content: '', author: 'Author',
    publishedAt: '2024-01-15',
    ${config.features.includes('categories') ? "category: 'Tutorial', tags: ['react']," : ''}
    ${config.features.includes('reading-time') ? 'readingTime: 5,' : ''}
  },
];

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => { setPosts(MOCK_POSTS); }, []);

  return (
    <div>
      {posts.map((post) => (
        <article key={post.id} style={{ borderBottom: '1px solid #eee', paddingBottom: 16, marginBottom: 16 }}>
          <h2><a href={\`/blog/\${post.slug}\`}>{post.title}</a></h2>
          <p>{post.excerpt}</p>
          <small>{post.publishedAt}</small>
        </article>
      ))}
    </div>
  );
}
`,
  });

  // API route
  if (isNext) {
    files.push({
      path: 'src/app/api/posts/route.ts',
      language: 'typescript',
      content: `import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  // TODO: Fetch from database
  const posts = [
    { id: '1', title: 'Getting Started with React', slug: 'getting-started-react', excerpt: 'Learn the fundamentals.', publishedAt: '2024-01-15' },
    { id: '2', title: 'TypeScript Best Practices', slug: 'typescript-best-practices', excerpt: 'Write safer code.', publishedAt: '2024-02-10' },
  ];

  return NextResponse.json({
    posts: posts.slice((page - 1) * limit, page * limit),
    total: posts.length,
    page,
    limit,
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  // TODO: Validate and store in database
  return NextResponse.json({ id: crypto.randomUUID(), ...body }, { status: 201 });
}
`,
    });
  }

  return files;
}
