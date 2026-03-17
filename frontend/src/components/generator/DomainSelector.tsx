'use client';

import { useTranslations } from 'next-intl';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { DOMAIN_OPTIONS } from '@/lib/scaffolder';
import type { ProjectDomain } from '@/lib/scaffolder';
import DomainCard from './DomainCard';

interface Props {
  onSelect: (domain: ProjectDomain) => void;
}

export default function DomainSelector({ onSelect }: Props) {
  const t = useTranslations('generator');
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        {t('chooseDomainTitle')}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {t('chooseDomainDesc')}
      </Typography>
      <Grid container spacing={3}>
        {DOMAIN_OPTIONS.map((domain) => (
          <Grid key={domain.id} size={{ xs: 12, sm: 6, md: 3 }}>
            <DomainCard domain={domain} onSelect={onSelect} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
