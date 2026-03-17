'use client';

import GuidePageLayout from '@/components/content/GuidePageLayout';
import { useGuideSection } from '@/hooks/useGuideSection';

export default function MediaSitePage() {
  const { section, loading, error } = useGuideSection('media-site');
  return <GuidePageLayout section={section} loading={loading} error={error} />;
}
