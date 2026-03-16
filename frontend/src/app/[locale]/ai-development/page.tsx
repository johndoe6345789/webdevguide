'use client';

import GuidePageLayout from '@/components/content/GuidePageLayout';
import { useGuideSection } from '@/hooks/useGuideSection';

export default function AIDevelopmentPage() {
  const { section, loading, error } = useGuideSection('ai-development');
  return <GuidePageLayout section={section} loading={loading} error={error} />;
}
