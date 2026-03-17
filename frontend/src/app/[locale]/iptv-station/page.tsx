'use client';

import GuidePageLayout from '@/components/content/GuidePageLayout';
import { useGuideSection } from '@/hooks/useGuideSection';

export default function IptvStationPage() {
  const { section, loading, error } = useGuideSection('iptv-station');
  return <GuidePageLayout section={section} loading={loading} error={error} />;
}
