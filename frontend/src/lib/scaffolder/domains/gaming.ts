import type { ProjectConfig, GeneratedFile } from '../types';

export function generateGaming(config: ProjectConfig): GeneratedFile[] {
  const files: GeneratedFile[] = [];
  const isNext = config.framework === 'nextjs';
  const isMui = config.styling === 'mui';

  files.push({
    path: 'src/types/gaming.ts',
    language: 'typescript',
    content: `export interface Game {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  genre: string;
  rating: number;
  releaseDate: string;
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  avatar: string;
  score: number;
  gamesPlayed: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string | null;
}
`,
  });

  files.push({
    path: isNext ? 'src/app/page.tsx' : 'src/App.tsx',
    language: 'tsx',
    content: isMui
      ? `import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import GameCatalog from '@/components/GameCatalog';
${config.features.includes('leaderboard') ? "import Leaderboard from '@/components/Leaderboard';" : ''}

export default function HomePage() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" fontWeight={800} gutterBottom>
        ${config.projectName}
      </Typography>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, ${config.features.includes('leaderboard') ? 'md: 8' : 'md: 12'} }}>
          <GameCatalog />
        </Grid>
${config.features.includes('leaderboard') ? `        <Grid size={{ xs: 12, md: 4 }}>
          <Leaderboard />
        </Grid>` : ''}
      </Grid>
    </Container>
  );
}
`
      : `import GameCatalog from './components/GameCatalog';
${config.features.includes('leaderboard') ? "import Leaderboard from './components/Leaderboard';" : ''}

export default function App() {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem' }}>
      <h1>${config.projectName}</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '${config.features.includes('leaderboard') ? '2fr 1fr' : '1fr'}', gap: '2rem' }}>
        <GameCatalog />
${config.features.includes('leaderboard') ? '        <Leaderboard />' : ''}
      </div>
    </div>
  );
}
`,
  });

  files.push({
    path: 'src/components/GameCatalog.tsx',
    language: 'tsx',
    content: isMui
      ? `'use client';

import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import type { Game } from '@/types/gaming';

const MOCK_GAMES: Game[] = [
  { id: '1', title: 'Space Explorer', description: 'Explore the cosmos in this open-world adventure.', coverImage: '', genre: 'Adventure', rating: 4.5, releaseDate: '2024-01-15' },
  { id: '2', title: 'Code Warriors', description: 'Competitive coding battles in real-time.', coverImage: '', genre: 'Strategy', rating: 4.2, releaseDate: '2024-02-20' },
  { id: '3', title: 'Pixel Quest', description: 'Retro platformer with modern mechanics.', coverImage: '', genre: 'Platformer', rating: 4.8, releaseDate: '2024-03-01' },
];

export default function GameCatalog() {
  const [games, setGames] = useState<Game[]>([]);
  useEffect(() => { setGames(MOCK_GAMES); }, []);

  return (
    <Grid container spacing={3}>
      {games.map((game) => (
        <Grid key={game.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <Card variant="outlined">
            <CardActionArea href={\`/games/\${game.id}\`}>
              <Box sx={{ pt: '60%', bgcolor: 'grey.800' }} />
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h6" fontWeight={600}>{game.title}</Typography>
                  <Chip label={game.genre} size="small" color="primary" variant="outlined" />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {game.description}
                </Typography>
                <Rating value={game.rating} precision={0.1} readOnly size="small" />
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
import type { Game } from '../types/gaming';

const MOCK_GAMES: Game[] = [
  { id: '1', title: 'Space Explorer', description: 'Open-world adventure.', coverImage: '', genre: 'Adventure', rating: 4.5, releaseDate: '2024-01-15' },
  { id: '2', title: 'Code Warriors', description: 'Coding battles.', coverImage: '', genre: 'Strategy', rating: 4.2, releaseDate: '2024-02-20' },
];

export default function GameCatalog() {
  const [games, setGames] = useState<Game[]>([]);
  useEffect(() => { setGames(MOCK_GAMES); }, []);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
      {games.map((g) => (
        <a key={g.id} href={\`/games/\${g.id}\`} style={{ textDecoration: 'none', color: 'inherit', border: '1px solid #ddd', borderRadius: 8, overflow: 'hidden' }}>
          <div style={{ paddingTop: '60%', background: '#333' }} />
          <div style={{ padding: 12 }}>
            <h3 style={{ margin: 0 }}>{g.title}</h3>
            <small>{g.genre}</small>
            <p style={{ fontSize: '0.875rem', color: '#666' }}>{g.description}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
`,
  });

  if (config.features.includes('leaderboard')) {
    files.push({
      path: 'src/components/Leaderboard.tsx',
      language: 'tsx',
      content: isMui
        ? `'use client';

import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import type { LeaderboardEntry } from '@/types/gaming';

const MOCK_LEADERS: LeaderboardEntry[] = [
  { rank: 1, username: 'ProGamer99', avatar: '', score: 98500, gamesPlayed: 342 },
  { rank: 2, username: 'SpeedRunner', avatar: '', score: 87200, gamesPlayed: 285 },
  { rank: 3, username: 'PixelMaster', avatar: '', score: 75800, gamesPlayed: 198 },
  { rank: 4, username: 'CodeNinja', avatar: '', score: 68400, gamesPlayed: 156 },
  { rank: 5, username: 'GameDevPro', avatar: '', score: 62100, gamesPlayed: 134 },
];

const MEDAL_COLORS = ['#FFD700', '#C0C0C0', '#CD7F32'];

export default function Leaderboard() {
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);
  useEffect(() => { setLeaders(MOCK_LEADERS); }, []);

  return (
    <Card variant="outlined">
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <EmojiEventsIcon color="primary" />
          <Typography variant="h6" fontWeight={600}>Leaderboard</Typography>
        </Box>
        <List disablePadding>
          {leaders.map((entry) => (
            <ListItem key={entry.rank} divider>
              <Typography variant="body2" fontWeight={700} sx={{ mr: 2, color: MEDAL_COLORS[entry.rank - 1] || 'text.primary' }}>
                #{entry.rank}
              </Typography>
              <ListItemAvatar><Avatar>{entry.username[0]}</Avatar></ListItemAvatar>
              <ListItemText primary={entry.username} secondary={\`\${entry.score.toLocaleString()} pts\`} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
`
        : `'use client';

import { useState, useEffect } from 'react';
import type { LeaderboardEntry } from '../types/gaming';

const MOCK_LEADERS: LeaderboardEntry[] = [
  { rank: 1, username: 'ProGamer99', avatar: '', score: 98500, gamesPlayed: 342 },
  { rank: 2, username: 'SpeedRunner', avatar: '', score: 87200, gamesPlayed: 285 },
  { rank: 3, username: 'PixelMaster', avatar: '', score: 75800, gamesPlayed: 198 },
];

export default function Leaderboard() {
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);
  useEffect(() => { setLeaders(MOCK_LEADERS); }, []);

  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 8, padding: 16 }}>
      <h3>Leaderboard</h3>
      <ol style={{ paddingLeft: 20 }}>
        {leaders.map((e) => (
          <li key={e.rank} style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
            <strong>{e.username}</strong> - {e.score.toLocaleString()} pts
          </li>
        ))}
      </ol>
    </div>
  );
}
`,
    });
  }

  if (isNext) {
    files.push({
      path: 'src/app/api/games/route.ts',
      language: 'typescript',
      content: `import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const genre = searchParams.get('genre');

  // TODO: Fetch from database
  return NextResponse.json({ games: [], total: 0 });
}
`,
    });
  }

  return files;
}
