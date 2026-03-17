import { useState } from 'react';
import { MORE_GROUPS as BASE_GROUPS, NAV_ITEMS } from './headerNavData';
import { MORE_GROUPS_EXTRA } from './headerNavGroups';

export type { NavGroup } from './headerNavData';
export { NAV_ITEMS };

export const MORE_GROUPS = [...BASE_GROUPS, ...MORE_GROUPS_EXTRA];

// Backwards-compatible flat list derived from the grouped structure
export const MORE_ITEMS = MORE_GROUPS.flatMap((group) => group.items);

export default function useHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreAnchor, setMoreAnchor] = useState<null | HTMLElement>(null);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleMoreOpen = (
    event: React.MouseEvent<HTMLElement>,
  ) => setMoreAnchor(event.currentTarget);
  const handleMoreClose = () => setMoreAnchor(null);

  return {
    mobileOpen, moreAnchor,
    handleDrawerToggle,
    handleMoreOpen, handleMoreClose,
  };
}
