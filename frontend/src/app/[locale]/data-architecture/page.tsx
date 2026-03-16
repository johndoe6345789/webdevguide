'use client';

import GuidePageLayout from '@/components/content/GuidePageLayout';
import { useGuideSection } from '@/hooks/useGuideSection';

export default function DataArchitecturePage() {
  const { section, loading, error } = useGuideSection('data-architecture');
  return <GuidePageLayout section={section} loading={loading} error={error} />;
}
