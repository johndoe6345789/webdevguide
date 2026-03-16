'use client';

import GuidePageLayout from '@/components/content/GuidePageLayout';
import { useGuideSection } from '@/hooks/useGuideSection';

export default function DockerGuidePage() {
  const { section, loading, error } = useGuideSection('docker-guide');
  return <GuidePageLayout section={section} loading={loading} error={error} />;
}
