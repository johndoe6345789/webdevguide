'use client';

import GuidePageLayout from '@/components/content/GuidePageLayout';
import { useGuideSection } from '@/hooks/useGuideSection';

export default function FeaturesPage() {
  const { section, loading, error } = useGuideSection('features');
  return <GuidePageLayout section={section} loading={loading} error={error} />;
}
