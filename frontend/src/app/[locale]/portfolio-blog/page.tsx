'use client';

import GuidePageLayout from '@/components/content/GuidePageLayout';
import { useGuideSection } from '@/hooks/useGuideSection';

export default function PortfolioBlogPage() {
  const { section, loading, error } = useGuideSection('portfolio-blog');
  return <GuidePageLayout section={section} loading={loading} error={error} />;
}
