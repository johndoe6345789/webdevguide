'use client';

import GuidePageLayout from '@/components/content/GuidePageLayout';
import { useGuideSection } from '@/hooks/useGuideSection';

export default function SocialPlatformPage() {
  const { section, loading, error } = useGuideSection('social-platform');
  return <GuidePageLayout section={section} loading={loading} error={error} />;
}
