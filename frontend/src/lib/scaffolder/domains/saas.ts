import type { ProjectConfig, GeneratedFile } from '../types';

export function generateSaas(config: ProjectConfig): GeneratedFile[] {
  const files: GeneratedFile[] = [];
  const isNext = config.framework === 'nextjs';
  const isMui = config.styling === 'mui';

  // Dashboard page
  files.push({
    path: isNext ? 'src/app/dashboard/page.tsx' : 'src/pages/Dashboard.tsx',
    language: 'tsx',
    content: isMui
      ? `'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import StatsCard from '@/components/StatsCard';
${config.features.includes('analytics') ? "import AnalyticsChart from '@/components/AnalyticsChart';" : ''}

const STATS = [
  { title: 'Total Users', value: '12,345', change: '+12%', trend: 'up' as const },
  { title: 'Revenue', value: '$45,678', change: '+8%', trend: 'up' as const },
  { title: 'Active Sessions', value: '1,234', change: '-3%', trend: 'down' as const },
  { title: 'Conversion Rate', value: '3.2%', change: '+0.5%', trend: 'up' as const },
];

export default function DashboardPage() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {STATS.map((stat) => (
          <Grid key={stat.title} size={{ xs: 12, sm: 6, md: 3 }}>
            <StatsCard {...stat} />
          </Grid>
        ))}
      </Grid>
${config.features.includes('analytics') ? '      <AnalyticsChart />' : '      {/* Add dashboard widgets here */}'}
    </Container>
  );
}
`
      : `'use client';

import StatsCard from '../components/StatsCard';

const STATS = [
  { title: 'Total Users', value: '12,345', change: '+12%', trend: 'up' as const },
  { title: 'Revenue', value: '$45,678', change: '+8%', trend: 'up' as const },
  { title: 'Active Sessions', value: '1,234', change: '-3%', trend: 'down' as const },
  { title: 'Conversion Rate', value: '3.2%', change: '+0.5%', trend: 'up' as const },
];

export default function DashboardPage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {STATS.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>
    </div>
  );
}
`,
  });

  // Stats Card
  files.push({
    path: 'src/components/StatsCard.tsx',
    language: 'tsx',
    content: isMui
      ? `'use client';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import Box from '@mui/material/Box';

interface Props {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}

export default function StatsCard({ title, value, change, trend }: Props) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" fontWeight={700}>
          {value}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, color: trend === 'up' ? 'success.main' : 'error.main' }}>
          {trend === 'up' ? <TrendingUpIcon fontSize="small" /> : <TrendingDownIcon fontSize="small" />}
          <Typography variant="body2" sx={{ ml: 0.5 }}>{change}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
`
      : `'use client';

interface Props {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}

export default function StatsCard({ title, value, change, trend }: Props) {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 8, padding: 16 }}>
      <p style={{ color: '#666', marginBottom: 4 }}>{title}</p>
      <h3 style={{ fontSize: '1.5rem', margin: 0 }}>{value}</h3>
      <span style={{ color: trend === 'up' ? 'green' : 'red' }}>
        {trend === 'up' ? '\\u2191' : '\\u2193'} {change}
      </span>
    </div>
  );
}
`,
  });

  // Analytics Chart placeholder
  if (config.features.includes('analytics')) {
    files.push({
      path: 'src/components/AnalyticsChart.tsx',
      language: 'tsx',
      content: isMui
        ? `'use client';

import { useMemo } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const MOCK_DATA = [
  { month: 'Jan', users: 400, revenue: 2400 },
  { month: 'Feb', users: 300, revenue: 1398 },
  { month: 'Mar', users: 520, revenue: 3800 },
  { month: 'Apr', users: 470, revenue: 3908 },
  { month: 'May', users: 680, revenue: 4800 },
  { month: 'Jun', users: 590, revenue: 3800 },
];

export default function AnalyticsChart() {
  const maxUsers = useMemo(() => Math.max(...MOCK_DATA.map((d) => d.users)), []);

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          User Growth
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1, height: 200, mt: 2 }}>
          {MOCK_DATA.map((d) => (
            <Box key={d.month} sx={{ flex: 1, textAlign: 'center' }}>
              <Box
                sx={{
                  height: \`\${(d.users / maxUsers) * 160}px\`,
                  bgcolor: 'primary.main',
                  borderRadius: '4px 4px 0 0',
                  mb: 1,
                  transition: 'height 0.3s',
                }}
              />
              <Typography variant="caption">{d.month}</Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
`
        : `'use client';

import { useMemo } from 'react';

const MOCK_DATA = [
  { month: 'Jan', users: 400 },
  { month: 'Feb', users: 300 },
  { month: 'Mar', users: 520 },
  { month: 'Apr', users: 470 },
  { month: 'May', users: 680 },
  { month: 'Jun', users: 590 },
];

export default function AnalyticsChart() {
  const maxUsers = useMemo(() => Math.max(...MOCK_DATA.map((d) => d.users)), []);

  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 8, padding: 16 }}>
      <h3>User Growth</h3>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 200 }}>
        {MOCK_DATA.map((d) => (
          <div key={d.month} style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ height: \`\${(d.users / maxUsers) * 160}px\`, background: '#4f46e5', borderRadius: '4px 4px 0 0' }} />
            <small>{d.month}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
`,
    });
  }

  // API route for dashboard stats
  if (isNext) {
    files.push({
      path: 'src/app/api/dashboard/stats/route.ts',
      language: 'typescript',
      content: `import { NextResponse } from 'next/server';

export async function GET() {
  // TODO: Fetch real stats from database
  const stats = {
    totalUsers: 12345,
    revenue: 45678,
    activeSessions: 1234,
    conversionRate: 3.2,
    monthlyData: [
      { month: 'Jan', users: 400, revenue: 2400 },
      { month: 'Feb', users: 300, revenue: 1398 },
      { month: 'Mar', users: 520, revenue: 3800 },
      { month: 'Apr', users: 470, revenue: 3908 },
      { month: 'May', users: 680, revenue: 4800 },
      { month: 'Jun', users: 590, revenue: 3800 },
    ],
  };

  return NextResponse.json(stats);
}
`,
    });
  }

  // Sidebar layout
  files.push({
    path: isNext ? 'src/app/dashboard/layout.tsx' : 'src/layouts/DashboardLayout.tsx',
    language: 'tsx',
    content: isMui
      ? `'use client';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import BarChartIcon from '@mui/icons-material/BarChart';

const DRAWER_WIDTH = 240;

const NAV_ITEMS = [
  { label: 'Dashboard', icon: <DashboardIcon />, href: '/dashboard' },
  { label: 'Analytics', icon: <BarChartIcon />, href: '/dashboard/analytics' },
  { label: 'Users', icon: <PeopleIcon />, href: '/dashboard/users' },
  { label: 'Settings', icon: <SettingsIcon />, href: '/dashboard/settings' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box', top: 64 },
        }}
      >
        <List>
          {NAV_ITEMS.map((item) => (
            <ListItemButton key={item.label} href={item.href}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, ml: \`\${DRAWER_WIDTH}px\` }}>
        {children}
      </Box>
    </Box>
  );
}
`
      : `'use client';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Analytics', href: '/dashboard/analytics' },
  { label: 'Users', href: '/dashboard/users' },
  { label: 'Settings', href: '/dashboard/settings' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex' }}>
      <nav style={{ width: 240, borderRight: '1px solid #ddd', minHeight: '100vh', padding: 16 }}>
        {NAV_ITEMS.map((item) => (
          <a key={item.label} href={item.href} style={{ display: 'block', padding: '8px 16px', textDecoration: 'none', color: 'inherit' }}>
            {item.label}
          </a>
        ))}
      </nav>
      <main style={{ flex: 1 }}>{children}</main>
    </div>
  );
}
`,
  });

  return files;
}
