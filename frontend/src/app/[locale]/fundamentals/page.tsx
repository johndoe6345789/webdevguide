'use client';

import GuidePageLayout from '@/components/content/GuidePageLayout';
import { useGuideSection } from '@/hooks/useGuideSection';

export default function FundamentalsPage() {
  const { section, loading, error } = useGuideSection('fundamentals');
  return <GuidePageLayout section={section} loading={loading} error={error} />;
}
