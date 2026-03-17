'use client';

import { useTranslations } from 'next-intl';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import { TOPIC_GROUPS } from './topicGridData';
import TopicGroupColumn from './TopicGroupColumn';

interface Props {
  t: (key: string) => string;
}

export default function TopicGridSection({ t }: Props) {
  const tNav = useTranslations('nav');
  const tCommon = useTranslations('common');

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" fontWeight={700} textAlign="center" gutterBottom>
          {t('topicGridTitle')}
        </Typography>
        <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 6, maxWidth: 650, mx: 'auto' }}>
          {t('topicGridSubtitle')}
        </Typography>
        <Grid container spacing={4}>
          {TOPIC_GROUPS.map((group) => (
            <Grid size={{ xs: 12, md: 4 }} key={group.titleKey}>
              <TopicGroupColumn
                group={group}
                tNav={tNav}
                tCommon={tCommon}
                t={t}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
