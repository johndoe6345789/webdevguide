'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { Link } from '@/i18n/navigation';
import { DIFF_COLORS, type TopicGroup } from './topicGridData';

interface Props {
  group: TopicGroup;
  tNav: (key: string) => string;
  tCommon: (key: string) => string;
  t: (key: string) => string;
}

const cardSx = (color: string) => ({ p: 1.5, textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'all 0.15s', borderLeft: `3px solid ${color}`, '&:hover': { bgcolor: 'action.hover', borderLeftWidth: 5 } });

export default function TopicGroupColumn({ group, tNav, tCommon, t }: Props) {
  return (
    <Box>
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box sx={{ color: group.color, display: 'flex' }}>{group.icon}</Box>
        <Typography variant="h6" fontWeight={700}>{t(group.titleKey)}</Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {group.items.map((item) => (
          <Card key={item.href} component={Link} href={item.href} variant="outlined" sx={cardSx(group.color)}>
            <Typography variant="body2" fontWeight={500}>{tNav(item.labelKey)}</Typography>
            <Chip label={tCommon(item.difficulty)} size="small" color={DIFF_COLORS[item.difficulty]} sx={{ height: 20, fontSize: '0.65rem', textTransform: 'capitalize' }} />
          </Card>
        ))}
      </Box>
    </Box>
  );
}
