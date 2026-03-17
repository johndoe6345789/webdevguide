'use client';

import GuidePageLayout from '@/components/content/GuidePageLayout';
import { useGuideSection } from '@/hooks/useGuideSection';

export default function BestPracticesPage() {
  const { section, loading, error } = useGuideSection('best-practices');
  return <GuidePageLayout section={section} loading={loading} error={error} />;
}
