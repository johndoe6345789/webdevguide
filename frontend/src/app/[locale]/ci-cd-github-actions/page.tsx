'use client';

import GuidePageLayout from '@/components/content/GuidePageLayout';
import { useGuideSection } from '@/hooks/useGuideSection';

export default function CiCdGithubActionsPage() {
  const { section, loading, error } = useGuideSection('ci-cd-github-actions');
  return <GuidePageLayout section={section} loading={loading} error={error} />;
}
