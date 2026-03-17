'use client';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { NAV_ITEMS } from '@/hooks/useHeader';
import { Link } from '@/i18n/navigation';

interface Props {
  t: (key: string) => string;
  onMoreOpen: (e: React.MouseEvent<HTMLElement>) => void;
}

export default function DesktopNavButtons({ t, onMoreOpen }: Props) {
  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, flexGrow: 1 }}>
      {NAV_ITEMS.map(({ labelKey, href }) => (
        <Button key={labelKey} component={Link} href={href} color="inherit" size="small">{t(labelKey)}</Button>
      ))}
      <Button color="inherit" size="small" onClick={onMoreOpen} endIcon={<MoreVertIcon />}>{t('more')}</Button>
    </Box>
  );
}
