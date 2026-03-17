'use client';

import GuidePageLayout from '@/components/content/GuidePageLayout';
import { useGuideSection } from '@/hooks/useGuideSection';

export default function TestingQaPage() {
  const { section, loading, error } = useGuideSection('testing-qa');
  return <GuidePageLayout section={section} loading={loading} error={error} />;
}
