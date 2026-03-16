'use client';

import GuidePageLayout from '@/components/content/GuidePageLayout';
import { useGuideSection } from '@/hooks/useGuideSection';

export default function EslintGuidePage() {
  const { section, loading, error } = useGuideSection('eslint-guide');
  return <GuidePageLayout section={section} loading={loading} error={error} />;
}
