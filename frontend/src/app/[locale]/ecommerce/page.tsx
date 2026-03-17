'use client';

import GuidePageLayout from '@/components/content/GuidePageLayout';
import { useGuideSection } from '@/hooks/useGuideSection';

export default function EcommercePage() {
  const { section, loading, error } = useGuideSection('ecommerce');
  return <GuidePageLayout section={section} loading={loading} error={error} />;
}
