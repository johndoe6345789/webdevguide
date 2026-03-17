'use client';

import { useTranslations } from 'next-intl';
import BuildIcon from '@mui/icons-material/Build';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import {
  FRAMEWORK_OPTIONS, STYLING_OPTIONS,
  STATE_OPTIONS, AUTH_OPTIONS, DATABASE_OPTIONS,
} from '@/lib/scaffolder';
import type { ScaffolderConfig } from '@/store/slices/generatorSlice';

interface Props {
  scaffolder: ScaffolderConfig;
  onGenerate: () => void;
}

export default function StackSummaryCard({ scaffolder, onGenerate }: Props) {
  const t = useTranslations('generator');
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="subtitle2" fontWeight={600} gutterBottom>{t('stackSummary')}</Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
          <Chip label={FRAMEWORK_OPTIONS.find((o) => o.value === scaffolder.framework)?.label} size="small" color="primary" />
          <Chip label={STYLING_OPTIONS.find((o) => o.value === scaffolder.styling)?.label} size="small" variant="outlined" />
          <Chip label={STATE_OPTIONS.find((o) => o.value === scaffolder.stateManagement)?.label} size="small" variant="outlined" />
          {scaffolder.auth !== 'none' && (
            <Chip label={AUTH_OPTIONS.find((o) => o.value === scaffolder.auth)?.label} size="small" variant="outlined" />
          )}
          <Chip label={DATABASE_OPTIONS.find((o) => o.value === scaffolder.database)?.label} size="small" variant="outlined" />
          {scaffolder.features.length > 0 && (
            <Chip label={t('featureCount', { count: scaffolder.features.length })} size="small" variant="outlined" />
          )}
        </Box>
        <Divider sx={{ my: 2 }} />
        <Button variant="contained" size="large" fullWidth startIcon={<BuildIcon />} onClick={onGenerate}>
          {t('generateProject')}
        </Button>
      </CardContent>
    </Card>
  );
}
