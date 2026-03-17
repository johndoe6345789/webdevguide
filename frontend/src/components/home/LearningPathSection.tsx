'use client';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LearningPathCard from './LearningPathCard';
import { STEPS } from './learningPathData';

interface Props {
  t: (key: string) => string;
}

export default function LearningPathSection({ t }: Props) {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" fontWeight={700} textAlign="center" gutterBottom>
          {t('learningPathTitle')}
        </Typography>
        <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}>
          {t('learningPathSubtitle')}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'center', md: 'stretch' },
            gap: { xs: 2, md: 0 },
          }}
        >
          {STEPS.map((step, i) => (
            <Box
              key={step.number}
              sx={{ display: 'flex', alignItems: 'center', flex: 1, width: { xs: '100%', md: 'auto' } }}
            >
              <LearningPathCard step={step} t={t} />
              {i < STEPS.length - 1 && (
                <ArrowForwardIcon sx={{ mx: 1, color: 'text.disabled', display: { xs: 'none', md: 'block' }, flexShrink: 0 }} />
              )}
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
