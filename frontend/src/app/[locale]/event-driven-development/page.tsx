'use client';

import GuidePageLayout from '@/components/content/GuidePageLayout';
import { useGuideSection } from '@/hooks/useGuideSection';

export default function EventDrivenDevelopmentPage() {
  const { section, loading, error } = useGuideSection('event-driven-development');
  return <GuidePageLayout section={section} loading={loading} error={error} />;
}
