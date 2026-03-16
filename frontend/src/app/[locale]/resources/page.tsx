'use client';

import GuidePageLayout from '@/components/content/GuidePageLayout';
import { useGuideSection } from '@/hooks/useGuideSection';

export default function ResourcesPage() {
  const { section, loading, error } = useGuideSection('resources');
  return <GuidePageLayout section={section} loading={loading} error={error} />;
}
