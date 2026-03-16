'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';

const STAT_KEYS = ['statsChapters', 'statsExamples', 'statsQuestions'] as const;

interface Props {
  t: (key: string) => string;
}

export default function StatsSection({ t }: Props) {
  return (
    <Box sx={{ bgcolor: 'background.paper', py: { xs: 6, md: 8 } }}>
      <Container maxWidth="md">
        <Grid container spacing={4} justifyContent="center">
          {STAT_KEYS.map((key) => (
            <Grid size={{ xs: 12, sm: 4 }} key={key}>
              <Box textAlign="center">
                <Typography variant="h4" component="p" fontWeight={700} color="primary.main">{t(key)}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
