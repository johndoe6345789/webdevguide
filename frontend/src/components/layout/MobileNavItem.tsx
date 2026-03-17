'use client';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link } from '@/i18n/navigation';

interface MobileNavItemProps {
  href: string;
  label: string;
}

export default function MobileNavItem({ href, label }: MobileNavItemProps) {
  return (
    <ListItem disablePadding>
      <ListItemButton component={Link} href={href} sx={{ textAlign: 'center' }}>
        <ListItemText primary={label} />
      </ListItemButton>
    </ListItem>
  );
}
