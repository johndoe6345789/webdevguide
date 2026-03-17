import type { ProjectConfig, GeneratedFile } from '../types';

export function generateSocial(config: ProjectConfig): GeneratedFile[] {
  const files: GeneratedFile[] = [];
  const isNext = config.framework === 'nextjs';
  const isMui = config.styling === 'mui';

  // Types
  files.push({
    path: 'src/types/social.ts',
    language: 'typescript',
    content: `export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  followersCount: number;
  followingCount: number;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  createdAt: string;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  createdAt: string;
}
`,
  });

  // Feed page
  files.push({
    path: isNext ? 'src/app/page.tsx' : 'src/App.tsx',
    language: 'tsx',
    content: isMui
      ? `import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Feed from '@/components/Feed';
import CreatePost from '@/components/CreatePost';

export default function HomePage() {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
        Feed
      </Typography>
      <CreatePost />
      <Feed />
    </Container>
  );
}
`
      : `import Feed from './components/Feed';
import CreatePost from './components/CreatePost';

export default function App() {
  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem' }}>
      <h1>Feed</h1>
      <CreatePost />
      <Feed />
    </div>
  );
}
`,
  });

  // Feed component
  files.push({
    path: 'src/components/Feed.tsx',
    language: 'tsx',
    content: isMui
      ? `'use client';

import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import PostCard from './PostCard';
import type { Post } from '@/types/social';

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    author: { id: 'u1', username: 'johndoe', displayName: 'John Doe', avatar: '', bio: '', followersCount: 150, followingCount: 75 },
    content: 'Just shipped a new feature! Really excited about how it turned out.',
    createdAt: '2024-03-15T10:30:00Z', likesCount: 24, commentsCount: 5, isLiked: false,
  },
  {
    id: '2',
    author: { id: 'u2', username: 'janedoe', displayName: 'Jane Doe', avatar: '', bio: '', followersCount: 320, followingCount: 120 },
    content: 'Great article on TypeScript generics. Learned a lot from it!',
    createdAt: '2024-03-14T18:00:00Z', likesCount: 42, commentsCount: 8, isLiked: true,
  },
];

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    setPosts(MOCK_POSTS);
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </Box>
  );
}
`
      : `'use client';

import { useState, useEffect } from 'react';
import PostCard from './PostCard';
import type { Post } from '../types/social';

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    setPosts([
      {
        id: '1',
        author: { id: 'u1', username: 'johndoe', displayName: 'John Doe', avatar: '', bio: '', followersCount: 150, followingCount: 75 },
        content: 'Just shipped a new feature!', createdAt: '2024-03-15T10:30:00Z',
        likesCount: 24, commentsCount: 5, isLiked: false,
      },
    ]);
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
`,
  });

  // PostCard
  files.push({
    path: 'src/components/PostCard.tsx',
    language: 'tsx',
    content: isMui
      ? `'use client';

import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import type { Post } from '@/types/social';

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  const [liked, setLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likesCount);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount((c) => liked ? c - 1 : c + 1);
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
          <Avatar>{post.author.displayName[0]}</Avatar>
          <Box>
            <Typography variant="subtitle2" fontWeight={600}>
              {post.author.displayName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              @{post.author.username}
            </Typography>
          </Box>
        </Box>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {post.content}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={handleLike} size="small" color={liked ? 'error' : 'default'}>
              {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <Typography variant="body2">{likesCount}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton size="small">
              <ChatBubbleOutlineIcon />
            </IconButton>
            <Typography variant="body2">{post.commentsCount}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
`
      : `'use client';

import { useState } from 'react';
import type { Post } from '../types/social';

interface Props { post: Post; }

export default function PostCard({ post }: Props) {
  const [liked, setLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likesCount);

  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 8, padding: 16, marginBottom: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <strong>{post.author.displayName}</strong>
        <span style={{ color: '#888' }}>@{post.author.username}</span>
      </div>
      <p>{post.content}</p>
      <div style={{ display: 'flex', gap: 16 }}>
        <button onClick={() => { setLiked(!liked); setLikesCount((c) => liked ? c - 1 : c + 1); }}>
          {liked ? '\\u2764\\uFE0F' : '\\u2661'} {likesCount}
        </button>
        <span>\\uD83D\\uDCAC {post.commentsCount}</span>
      </div>
    </div>
  );
}
`,
  });

  // Create Post
  files.push({
    path: 'src/components/CreatePost.tsx',
    language: 'tsx',
    content: isMui
      ? `'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';

export default function CreatePost() {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (!content.trim()) return;
    // TODO: Dispatch create post action
    console.log('New post:', content);
    setContent('');
  };

  return (
    <Card variant="outlined" sx={{ mb: 3 }}>
      <CardContent>
        <TextField
          multiline rows={3} fullWidth placeholder="What's on your mind?"
          value={content} onChange={(e) => setContent(e.target.value)}
          variant="outlined"
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button variant="contained" onClick={handleSubmit} disabled={!content.trim()}>
            Post
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
`
      : `'use client';

import { useState } from 'react';

export default function CreatePost() {
  const [content, setContent] = useState('');

  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 8, padding: 16, marginBottom: 24 }}>
      <textarea placeholder="What's on your mind?" value={content} onChange={(e) => setContent(e.target.value)}
        rows={3} style={{ width: '100%', resize: 'vertical' }} />
      <div style={{ textAlign: 'right', marginTop: 8 }}>
        <button onClick={() => { console.log('Post:', content); setContent(''); }} disabled={!content.trim()}>
          Post
        </button>
      </div>
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

export async function GET() {
  // TODO: Fetch posts from database, paginated
  return NextResponse.json({ posts: [], nextCursor: null });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { content } = body;

  if (!content || content.trim().length === 0) {
    return NextResponse.json({ error: 'Content is required' }, { status: 400 });
  }

  // TODO: Store in database
  const post = {
    id: crypto.randomUUID(),
    content,
    createdAt: new Date().toISOString(),
    likesCount: 0,
    commentsCount: 0,
  };

  return NextResponse.json(post, { status: 201 });
}
`,
    });
  }

  return files;
}
