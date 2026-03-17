import {
  FRAMEWORK_OPTIONS,
  STYLING_OPTIONS,
  STATE_OPTIONS,
  AUTH_OPTIONS,
  DATABASE_OPTIONS,
} from '@/lib/scaffolder';

export const SELECTS = [
  { key: 'framework', opts: FRAMEWORK_OPTIONS },
  { key: 'styling', opts: STYLING_OPTIONS },
  { key: 'stateManagement', opts: STATE_OPTIONS },
  { key: 'auth', opts: AUTH_OPTIONS },
  { key: 'database', opts: DATABASE_OPTIONS },
] as const;

export const LABEL_KEYS = [
  'framework',
  'styling',
  'stateManagement',
  'auth',
  'database',
] as const;

export const TRANS_KEYS: Record<
  string, string
> = {
  framework: 'framework',
  styling: 'styling',
  stateManagement: 'stateManagement',
  auth: 'authentication',
  database: 'database',
};

export const CONTENT_SX = {
  display: 'flex',
  flexDirection: 'column', gap: 3,
} as const;
