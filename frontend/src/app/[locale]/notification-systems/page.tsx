'use client';

import GuidePageLayout from '@/components/content/GuidePageLayout';
import { useGuideSection } from '@/hooks/useGuideSection';

export default function NotificationSystemsPage() {
  const { section, loading, error } = useGuideSection('notification-systems');
  return <GuidePageLayout section={section} loading={loading} error={error} />;
}
