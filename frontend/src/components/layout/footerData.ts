export interface FooterLinkGroup {
  titleKey: string;
  links: { labelKey: string; href: string }[];
}

export const FOOTER_GROUPS: FooterLinkGroup[] = [
  { titleKey: 'footerLearn', links: [
    { labelKey: 'gettingStarted', href: '/getting-started' },
    { labelKey: 'fundamentals', href: '/fundamentals' },
    { labelKey: 'examples', href: '/examples' },
    { labelKey: 'features', href: '/features' },
    { labelKey: 'bestPractices', href: '/best-practices' },
    { labelKey: 'writingDocumentation', href: '/writing-documentation' },
  ]},
  { titleKey: 'footerBuild', links: [
    { labelKey: 'personalHomepage', href: '/personal-homepage' },
    { labelKey: 'socialPlatform', href: '/social-platform' },
    { labelKey: 'ecommerce', href: '/ecommerce' },
    { labelKey: 'saasDashboard', href: '/saas-dashboard' },
    { labelKey: 'videoPlatform', href: '/video-platform' },
    { labelKey: 'gamingWebsite', href: '/gaming-website' },
  ]},
  { titleKey: 'footerDevGuides', links: [
    { labelKey: 'backendGuide', href: '/backend-guide' },
    { labelKey: 'authAuthorization', href: '/authentication-authorization' },
    { labelKey: 'dockerGuide', href: '/docker-guide' },
    { labelKey: 'ciCdGithubActions', href: '/ci-cd-github-actions' },
    { labelKey: 'testingQa', href: '/testing-qa' },
    { labelKey: 'eventDrivenDev', href: '/event-driven-development' },
  ]},
  { titleKey: 'footerTools', links: [
    { labelKey: 'codeGenerator', href: '/code-generator' },
    { labelKey: 'exam', href: '/exam' },
    { labelKey: 'glossary', href: '/glossary' },
    { labelKey: 'progress', href: '/progress' },
    { labelKey: 'bookmarks', href: '/bookmarks' },
    { labelKey: 'buildingThisGuide', href: '/building-this-guide' },
  ]},
];
