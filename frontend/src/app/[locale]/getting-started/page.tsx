'use client';

import GuidePageLayout from '@/components/content/GuidePageLayout';
import { useGuideSection } from '@/hooks/useGuideSection';

export default function GettingStartedPage() {
  const { section, loading, error } = useGuideSection('getting-started');
  return <GuidePageLayout section={section} loading={loading} error={error} />;
}
