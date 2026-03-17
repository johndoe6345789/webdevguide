'use client';

import GuidePageLayout from '@/components/content/GuidePageLayout';
import { useGuideSection } from '@/hooks/useGuideSection';

export default function SaasDashboardPage() {
  const { section, loading, error } = useGuideSection('saas-dashboard');
  return <GuidePageLayout section={section} loading={loading} error={error} />;
}
