'use client';

import GuidePageLayout from '@/components/content/GuidePageLayout';
import { useGuideSection } from '@/hooks/useGuideSection';

export default function GamificationPage() {
  const { section, loading, error } = useGuideSection('gamification');
  return <GuidePageLayout section={section} loading={loading} error={error} />;
}
