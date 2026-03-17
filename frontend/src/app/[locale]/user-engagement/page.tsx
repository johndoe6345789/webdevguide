'use client';

import GuidePageLayout from '@/components/content/GuidePageLayout';
import { useGuideSection } from '@/hooks/useGuideSection';

export default function UserEngagementPage() {
  const { section, loading, error } = useGuideSection('user-engagement');
  return <GuidePageLayout section={section} loading={loading} error={error} />;
}
