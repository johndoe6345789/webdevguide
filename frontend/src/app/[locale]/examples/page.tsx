'use client';

import GuidePageLayout from '@/components/content/GuidePageLayout';
import { useGuideSection } from '@/hooks/useGuideSection';

export default function ExamplesPage() {
  const { section, loading, error } = useGuideSection('examples');
  return <GuidePageLayout section={section} loading={loading} error={error} />;
}
