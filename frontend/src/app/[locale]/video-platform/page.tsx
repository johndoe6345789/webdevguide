'use client';

import GuidePageLayout from '@/components/content/GuidePageLayout';
import { useGuideSection } from '@/hooks/useGuideSection';

export default function VideoPlatformPage() {
  const { section, loading, error } = useGuideSection('video-platform');
  return <GuidePageLayout section={section} loading={loading} error={error} />;
}
