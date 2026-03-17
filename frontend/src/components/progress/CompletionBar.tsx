'use client';

import { useTranslations } from 'next-intl';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

interface CompletionBarProps {
  percent: number;
}

export default function CompletionBar({ percent }: CompletionBarProps) {
  const t = useTranslations('progress');
  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h5" fontWeight={600}>{t('overallCompletion')}</Typography>
          <Typography variant="h5" fontWeight={700} color="primary.main">{percent}{t('percentSign')}</Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={percent}
          sx={{ height: 12, borderRadius: 6, bgcolor: 'action.hover', '& .MuiLinearProgress-bar': { borderRadius: 6 } }}
        />
      </CardContent>
    </Card>
  );
}
