import { useState } from 'react';

export const NAV_ITEMS = [
  { labelKey: 'gettingStarted', href: '/getting-started' },
  { labelKey: 'fundamentals', href: '/fundamentals' },
  { labelKey: 'examples', href: '/examples' },
  { labelKey: 'features', href: '/features' },
  { labelKey: 'codeGenerator', href: '/code-generator' },
  { labelKey: 'exam', href: '/exam' },
  { labelKey: 'glossary', href: '/glossary' },
];

export const MORE_ITEMS = [
  { labelKey: 'aiDevelopment', href: '/ai-development' },
  { labelKey: 'luaEngine', href: '/lua-engine' },
  { labelKey: 'dataArchitecture', href: '/data-architecture' },
  { labelKey: 'eslintGuide', href: '/eslint-guide' },
  { labelKey: 'backendGuide', href: '/backend-guide' },
  { labelKey: 'dockerGuide', href: '/docker-guide' },
  { labelKey: 'resources', href: '/resources' },
  { labelKey: 'bookmarks', href: '/bookmarks' },
  { labelKey: 'progress', href: '/progress' },
];

export default function useHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreAnchor, setMoreAnchor] = useState<null | HTMLElement>(null);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleMoreOpen = (event: React.MouseEvent<HTMLElement>) => setMoreAnchor(event.currentTarget);
  const handleMoreClose = () => setMoreAnchor(null);

  return { mobileOpen, moreAnchor, handleDrawerToggle, handleMoreOpen, handleMoreClose };
}
