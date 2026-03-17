'use client';

import GuidePageLayout from '@/components/content/GuidePageLayout';
import { useGuideSection } from '@/hooks/useGuideSection';

export default function PersonalHomepagePage() {
  const { section, loading, error } = useGuideSection('personal-homepage');
  return <GuidePageLayout section={section} loading={loading} error={error} />;
}
