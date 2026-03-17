'use client';

import { useTranslations } from 'next-intl';
import Box from '@mui/material/Box';
import CtaSection from '@/components/home/CtaSection';
import FeaturesGrid from '@/components/home/FeaturesGrid';
import HeroSection from '@/components/home/HeroSection';
import LearningPathSection from '@/components/home/LearningPathSection';
import StatsSection from '@/components/home/StatsSection';
import TopicGridSection from '@/components/home/TopicGridSection';

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <Box>
      <HeroSection
        title={t('heroTitle')}
        subtitle={t('heroSubtitle')}
        getStartedLabel={t('getStarted')}
        learnMoreLabel={t('learnMore')}
        badgeLabel={t('heroBadge')}
      />
      <StatsSection t={t} />
      <FeaturesGrid t={t} />
      <TopicGridSection t={t} />
      <LearningPathSection t={t} />
      <CtaSection
        title={t('ctaTitle')}
        subtitle={t('ctaSubtitle')}
        buttonLabel={t('ctaButton')}
        secondaryLabel={t('ctaSecondary')}
      />
    </Box>
  );
}
