'use client';

import GuidePageLayout from '@/components/content/GuidePageLayout';
import { useGuideSection } from '@/hooks/useGuideSection';

export default function AuthenticationAuthorizationPage() {
  const { section, loading, error } = useGuideSection('authentication-authorization');
  return <GuidePageLayout section={section} loading={loading} error={error} />;
}
