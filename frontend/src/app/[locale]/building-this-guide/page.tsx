'use client';

import GuidePageLayout from '@/components/content/GuidePageLayout';
import { useGuideSection } from '@/hooks/useGuideSection';

export default function BuildingThisGuidePage() {
  const { section, loading, error } = useGuideSection('building-this-guide');
  return <GuidePageLayout section={section} loading={loading} error={error} />;
}
