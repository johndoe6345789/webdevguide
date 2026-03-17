'use client';

import GuidePageLayout from '@/components/content/GuidePageLayout';
import { useGuideSection } from '@/hooks/useGuideSection';

export default function OnlineRadioPage() {
  const { section, loading, error } = useGuideSection('online-radio');
  return <GuidePageLayout section={section} loading={loading} error={error} />;
}
