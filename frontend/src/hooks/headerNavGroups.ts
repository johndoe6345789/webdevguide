import type { NavGroup } from './headerNavData';

export const MORE_GROUPS_EXTRA: NavGroup[] = [
  {
    labelKey: 'navGroupBestPractices',
    items: [
      { labelKey: 'bestPractices', href: '/best-practices' },
      { labelKey: 'writingDocumentation', href: '/writing-documentation' },
      { labelKey: 'authAuthorization', href: '/authentication-authorization' },
      { labelKey: 'userEngagement', href: '/user-engagement' },
      { labelKey: 'gamification', href: '/gamification' },
      { labelKey: 'notificationSystems', href: '/notification-systems' },
      { labelKey: 'eventDrivenDev', href: '/event-driven-development' },
    ],
  },
  {
    labelKey: 'navGroupMeta',
    items: [
      { labelKey: 'buildingThisGuide', href: '/building-this-guide' },
      { labelKey: 'resources', href: '/resources' },
      { labelKey: 'bookmarks', href: '/bookmarks' },
      { labelKey: 'progress', href: '/progress' },
    ],
  },
];
