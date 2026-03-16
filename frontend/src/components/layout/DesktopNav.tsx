'use client';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { NAV_ITEMS, MORE_ITEMS } from '@/hooks/useHeader';
import { Link } from '@/i18n/navigation';

interface Props {
  t: (key: string) => string;
  moreAnchor: HTMLElement | null;
  onMoreOpen: (e: React.MouseEvent<HTMLElement>) => void;
  onMoreClose: () => void;
}

export default function DesktopNav({ t, moreAnchor, onMoreOpen, onMoreClose }: Props) {
  return (
    <>
      <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, flexGrow: 1 }}>
        {NAV_ITEMS.map(({ labelKey, href }) => (
          <Button key={labelKey} component={Link} href={href} color="inherit" size="small">{t(labelKey)}</Button>
        ))}
        <Button color="inherit" size="small" onClick={onMoreOpen} endIcon={<MoreVertIcon />}>{t('more')}</Button>
      </Box>
      <Menu anchorEl={moreAnchor} open={Boolean(moreAnchor)} onClose={onMoreClose} onClick={onMoreClose}>
        {MORE_ITEMS.map(({ labelKey, href }) => (
          <MenuItem key={labelKey} component={Link} href={href}>{t(labelKey)}</MenuItem>
        ))}
      </Menu>
    </>
  );
}
