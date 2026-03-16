'use client';

import GuidePageLayout from '@/components/content/GuidePageLayout';
import { useGuideSection } from '@/hooks/useGuideSection';

export default function LuaEnginePage() {
  const { section, loading, error } = useGuideSection('lua-engine');
  return <GuidePageLayout section={section} loading={loading} error={error} />;
}
