'use client';

import GuidePageLayout from '@/components/content/GuidePageLayout';
import { useGuideSection } from '@/hooks/useGuideSection';

export default function MusicPlatformPage() {
  const { section, loading, error } = useGuideSection('music-platform');
  return <GuidePageLayout section={section} loading={loading} error={error} />;
}
