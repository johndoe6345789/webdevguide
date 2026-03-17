'use client';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { MORE_GROUPS } from '@/hooks/useHeader';
import { Link } from '@/i18n/navigation';

interface Props {
  t: (key: string) => string;
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

const gridSx = { display: 'grid', gridTemplateColumns: { md: '1fr 1fr' }, gap: 0, minWidth: 480, maxWidth: 620, p: 1 } as const;
const headerSx = (idx: number) => ({ display: 'block', px: 2, pt: idx < 2 ? 1 : 2, pb: 0.5, color: 'text.secondary', fontWeight: 700, letterSpacing: 1, fontSize: '0.7rem', lineHeight: 1.5, userSelect: 'none' });
const itemSx = { fontSize: '0.875rem', py: 0.75, px: 2, minHeight: 'auto', borderRadius: 1, mx: 0.5 } as const;

export default function MorePopover({ t, anchorEl, onClose }: Props) {
  return (
    <Popover
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      slotProps={{ paper: { sx: {
        mt: 0.5, maxHeight: '80vh', overflowY: 'auto',
      } } }}
    >
      <Box sx={gridSx}>
        {MORE_GROUPS.map((group, gi) => (
          <Box key={group.labelKey} sx={{ minWidth: 0 }}>
            <Typography variant="overline" sx={headerSx(gi)}>{t(group.labelKey)}</Typography>
            {group.items.map(({ labelKey, href }) => (
              <MenuItem
                key={labelKey}
                component={Link}
                href={href}
                onClick={onClose}
                sx={itemSx}
              >{t(labelKey)}</MenuItem>
            ))}
            {gi < MORE_GROUPS.length - 1 && <Divider sx={{ my: 1, display: { md: 'none' } }} />}
          </Box>
        ))}
      </Box>
    </Popover>
  );
}
