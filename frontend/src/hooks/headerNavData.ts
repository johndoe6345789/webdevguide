export const NAV_ITEMS = [
  { labelKey: 'gettingStarted', href: '/getting-started' },
  { labelKey: 'fundamentals', href: '/fundamentals' },
  { labelKey: 'examples', href: '/examples' },
  { labelKey: 'features', href: '/features' },
  { labelKey: 'codeGenerator', href: '/code-generator' },
  { labelKey: 'exam', href: '/exam' },
  { labelKey: 'glossary', href: '/glossary' },
];

export interface NavGroup {
  labelKey: string;
  items: { labelKey: string; href: string }[];
}

export const MORE_GROUPS: NavGroup[] = [
  {
    labelKey: 'navGroupWebsites',
    items: [
      { labelKey: 'personalHomepage', href: '/personal-homepage' },
      { labelKey: 'socialPlatform', href: '/social-platform' },
      { labelKey: 'mediaSite', href: '/media-site' },
      { labelKey: 'ecommerce', href: '/ecommerce' },
      { labelKey: 'portfolioBlog', href: '/portfolio-blog' },
      { labelKey: 'saasDashboard', href: '/saas-dashboard' },
      { labelKey: 'videoPlatform', href: '/video-platform' },
      { labelKey: 'musicPlatform', href: '/music-platform' },
      { labelKey: 'onlineRadio', href: '/online-radio' },
      { labelKey: 'iptvStation', href: '/iptv-station' },
      { labelKey: 'gamingWebsite', href: '/gaming-website' },
    ],
  },
  {
    labelKey: 'navGroupGuides',
    items: [
      { labelKey: 'rapidDevelopment', href: '/rapid-development' },
      { labelKey: 'aiDevelopment', href: '/ai-development' },
      { labelKey: 'backendGuide', href: '/backend-guide' },
      { labelKey: 'dockerGuide', href: '/docker-guide' },
      { labelKey: 'eslintGuide', href: '/eslint-guide' },
      { labelKey: 'luaEngine', href: '/lua-engine' },
      { labelKey: 'dataArchitecture', href: '/data-architecture' },
      { labelKey: 'testingQa', href: '/testing-qa' },
      { labelKey: 'ciCdGithubActions', href: '/ci-cd-github-actions' },
    ],
  },
];
