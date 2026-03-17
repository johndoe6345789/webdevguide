'use client';

import GuidePageLayout from '@/components/content/GuidePageLayout';
import { useGuideSection } from '@/hooks/useGuideSection';

export default function RapidDevelopmentPage() {
  const { section, loading, error } = useGuideSection('rapid-development');
  return <GuidePageLayout section={section} loading={loading} error={error} />;
}
