export interface PathStep {
  number: string;
  titleKey: string;
  descKey: string;
  href: string;
  color: string;
}

export const STEPS: PathStep[] = [
  { number: '01', titleKey: 'pathStep1Title', descKey: 'pathStep1Desc', href: '/getting-started', color: '#22c55e' },
  { number: '02', titleKey: 'pathStep2Title', descKey: 'pathStep2Desc', href: '/fundamentals', color: '#3b82f6' },
  { number: '03', titleKey: 'pathStep3Title', descKey: 'pathStep3Desc', href: '/examples', color: '#8b5cf6' },
  { number: '04', titleKey: 'pathStep4Title', descKey: 'pathStep4Desc', href: '/best-practices', color: '#f59e0b' },
  { number: '05', titleKey: 'pathStep5Title', descKey: 'pathStep5Desc', href: '/ci-cd-github-actions', color: '#ef4444' },
];
