'use client';

import GuidePageLayout from '@/components/content/GuidePageLayout';
import { useGuideSection } from '@/hooks/useGuideSection';

export default function WritingDocumentationPage() {
  const { section, loading, error } = useGuideSection('writing-documentation');
  return <GuidePageLayout section={section} loading={loading} error={error} />;
}
