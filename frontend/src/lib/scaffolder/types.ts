export type ProjectDomain =
  | 'personal-homepage'
  | 'blog'
  | 'ecommerce'
  | 'social-platform'
  | 'saas-dashboard'
  | 'media-streaming'
  | 'gaming-website'
  | 'api-backend';

export type FrameworkOption = 'nextjs' | 'vite-react';
export type StylingOption = 'mui' | 'tailwind' | 'css-modules';
export type StateOption = 'redux-toolkit' | 'zustand' | 'react-context';
export type AuthOption = 'jwt' | 'oauth' | 'none';
export type DatabaseOption = 'postgresql' | 'mongodb' | 'sqlite' | 'json-file';

export interface ProjectConfig {
  domain: ProjectDomain;
  projectName: string;
  framework: FrameworkOption;
  styling: StylingOption;
  stateManagement: StateOption;
  auth: AuthOption;
  database: DatabaseOption;
  features: string[];
}

export interface GeneratedFile {
  path: string;
  content: string;
  language: string;
}

export interface DomainInfo {
  id: ProjectDomain;
  label: string;
  description: string;
  icon: string;
  features: { key: string; label: string }[];
  defaultFeatures: string[];
}

export const DOMAIN_OPTIONS: DomainInfo[] = [
  {
    id: 'personal-homepage',
    label: 'Personal Homepage / Portfolio',
    description: 'Showcase your work, skills, and contact info',
    icon: 'Person',
    features: [
      { key: 'hero-section', label: 'Hero Section' },
      { key: 'project-gallery', label: 'Project Gallery' },
      { key: 'contact-form', label: 'Contact Form' },
      { key: 'resume-download', label: 'Resume Download' },
      { key: 'dark-mode', label: 'Dark Mode Toggle' },
      { key: 'animations', label: 'Scroll Animations' },
    ],
    defaultFeatures: ['hero-section', 'project-gallery', 'contact-form'],
  },
  {
    id: 'blog',
    label: 'Blog / Content Site',
    description: 'Publish articles with categories, tags, and search',
    icon: 'Article',
    features: [
      { key: 'markdown-support', label: 'Markdown Support' },
      { key: 'categories', label: 'Categories & Tags' },
      { key: 'search', label: 'Full-text Search' },
      { key: 'comments', label: 'Comments System' },
      { key: 'rss-feed', label: 'RSS Feed' },
      { key: 'reading-time', label: 'Reading Time Estimate' },
    ],
    defaultFeatures: ['markdown-support', 'categories', 'search'],
  },
  {
    id: 'ecommerce',
    label: 'E-Commerce Store',
    description: 'Product catalog, cart, and checkout flow',
    icon: 'ShoppingCart',
    features: [
      { key: 'product-catalog', label: 'Product Catalog' },
      { key: 'shopping-cart', label: 'Shopping Cart' },
      { key: 'checkout', label: 'Checkout Flow' },
      { key: 'stripe', label: 'Stripe Payments' },
      { key: 'inventory', label: 'Inventory Management' },
      { key: 'order-history', label: 'Order History' },
    ],
    defaultFeatures: ['product-catalog', 'shopping-cart', 'checkout'],
  },
  {
    id: 'social-platform',
    label: 'Social Platform',
    description: 'User profiles, feeds, and social interactions',
    icon: 'People',
    features: [
      { key: 'user-profiles', label: 'User Profiles' },
      { key: 'news-feed', label: 'News Feed' },
      { key: 'comments', label: 'Comments & Replies' },
      { key: 'likes', label: 'Likes & Reactions' },
      { key: 'follow-system', label: 'Follow System' },
      { key: 'notifications', label: 'Notifications' },
    ],
    defaultFeatures: ['user-profiles', 'news-feed', 'comments', 'likes'],
  },
  {
    id: 'saas-dashboard',
    label: 'SaaS Dashboard',
    description: 'Analytics dashboard with subscriptions and multi-tenancy',
    icon: 'Dashboard',
    features: [
      { key: 'dashboard', label: 'Dashboard Overview' },
      { key: 'analytics', label: 'Analytics Charts' },
      { key: 'subscription', label: 'Subscription Plans' },
      { key: 'multi-tenant', label: 'Multi-tenant' },
      { key: 'team-management', label: 'Team Management' },
      { key: 'settings', label: 'Settings Page' },
    ],
    defaultFeatures: ['dashboard', 'analytics', 'subscription'],
  },
  {
    id: 'media-streaming',
    label: 'Media / Streaming Site',
    description: 'Video or audio streaming with playlists',
    icon: 'PlayCircle',
    features: [
      { key: 'media-player', label: 'Media Player' },
      { key: 'playlists', label: 'Playlists' },
      { key: 'upload', label: 'File Upload' },
      { key: 'transcoding', label: 'Transcoding Queue' },
      { key: 'recommendations', label: 'Recommendations' },
      { key: 'watch-history', label: 'Watch History' },
    ],
    defaultFeatures: ['media-player', 'playlists', 'upload'],
  },
  {
    id: 'gaming-website',
    label: 'Gaming Website',
    description: 'Game listings, leaderboards, and community features',
    icon: 'SportsEsports',
    features: [
      { key: 'game-catalog', label: 'Game Catalog' },
      { key: 'leaderboard', label: 'Leaderboards' },
      { key: 'user-stats', label: 'Player Stats' },
      { key: 'achievements', label: 'Achievements' },
      { key: 'forums', label: 'Community Forums' },
      { key: 'live-chat', label: 'Live Chat' },
    ],
    defaultFeatures: ['game-catalog', 'leaderboard', 'user-stats'],
  },
  {
    id: 'api-backend',
    label: 'API / Backend Service',
    description: 'RESTful API with authentication and database',
    icon: 'Api',
    features: [
      { key: 'rest-api', label: 'REST API Endpoints' },
      { key: 'validation', label: 'Input Validation' },
      { key: 'rate-limiting', label: 'Rate Limiting' },
      { key: 'logging', label: 'Structured Logging' },
      { key: 'caching', label: 'Redis Caching' },
      { key: 'websockets', label: 'WebSocket Support' },
    ],
    defaultFeatures: ['rest-api', 'validation', 'rate-limiting'],
  },
];

export const FRAMEWORK_OPTIONS = [
  { value: 'nextjs' as const, label: 'Next.js' },
  { value: 'vite-react' as const, label: 'Vite + React' },
];

export const STYLING_OPTIONS = [
  { value: 'mui' as const, label: 'Material UI' },
  { value: 'tailwind' as const, label: 'Tailwind CSS' },
  { value: 'css-modules' as const, label: 'CSS Modules' },
];

export const STATE_OPTIONS = [
  { value: 'redux-toolkit' as const, label: 'Redux Toolkit' },
  { value: 'zustand' as const, label: 'Zustand' },
  { value: 'react-context' as const, label: 'React Context' },
];

export const AUTH_OPTIONS = [
  { value: 'jwt' as const, label: 'JWT' },
  { value: 'oauth' as const, label: 'OAuth' },
  { value: 'none' as const, label: 'None' },
];

export const DATABASE_OPTIONS = [
  { value: 'postgresql' as const, label: 'PostgreSQL' },
  { value: 'mongodb' as const, label: 'MongoDB' },
  { value: 'sqlite' as const, label: 'SQLite' },
  { value: 'json-file' as const, label: 'JSON File' },
];
