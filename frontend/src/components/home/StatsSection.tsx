'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import StatItemCard from './StatItemCard';
import { STATS } from './statsData';

interface Props {
  t: (key: string) => string;
}

export default function StatsSection({ t }: Props) {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        py: { xs: 6, md: 8 },
        borderTop: '1px solid',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          {STATS.map(({ icon, value, labelKey }) => (
            <Grid size={{ xs: 6, sm: 3 }} key={labelKey}>
              <StatItemCard icon={icon} value={value} label={t(labelKey)} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
