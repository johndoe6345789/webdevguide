'use client';

import { useTranslations } from 'next-intl';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { NAV_ITEMS, MORE_ITEMS } from '@/hooks/useHeader';
import { Link } from '@/i18n/navigation';

interface MobileDrawerProps {
  onClose: () => void;
}

const NavItem = ({ href, label }: { href: string; label: string }) => (
  <ListItem disablePadding>
    <ListItemButton component={Link} href={href} sx={{ textAlign: 'center' }}>
      <ListItemText primary={label} />
    </ListItemButton>
  </ListItem>
);

export default function MobileDrawer({ onClose }: MobileDrawerProps) {
  const t = useTranslations('nav');

  return (
    <Box onClick={onClose} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, fontWeight: 700 }}>WebDev Guide</Typography>
      <Divider />
      <List>
        <NavItem href="/" label={t('home')} />
        {NAV_ITEMS.map(({ labelKey, href }) => (
          <NavItem key={labelKey} href={href} label={t(labelKey)} />
        ))}
        <Divider sx={{ my: 1 }} />
        <Typography variant="caption" sx={{ px: 2, py: 1, display: 'block', color: 'text.secondary' }}>
          More Topics
        </Typography>
        {MORE_ITEMS.map(({ labelKey, href }) => (
          <NavItem key={labelKey} href={href} label={t(labelKey)} />
        ))}
      </List>
    </Box>
  );
}
