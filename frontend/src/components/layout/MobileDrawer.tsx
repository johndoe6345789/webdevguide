'use client';

import { useTranslations } from 'next-intl';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { NAV_ITEMS } from '@/hooks/useHeader';
import MobileDrawerGroups from './MobileDrawerGroups';
import MobileNavItem from './MobileNavItem';

interface MobileDrawerProps {
  onClose: () => void;
}

export default function MobileDrawer({ onClose }: MobileDrawerProps) {
  const t = useTranslations('nav');

  return (
    <Box onClick={onClose} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, fontWeight: 700 }}>{t('brandName')}</Typography>
      <Divider />
      <List>
        <MobileNavItem href="/" label={t('home')} />
        {NAV_ITEMS.map(({ labelKey, href }) => (
          <MobileNavItem key={labelKey} href={href} label={t(labelKey)} />
        ))}
        <MobileDrawerGroups t={t} />
      </List>
    </Box>
  );
}
