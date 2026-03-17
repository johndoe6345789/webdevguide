import BuildIcon from '@mui/icons-material/Build';
import SecurityIcon from '@mui/icons-material/Security';
import WebIcon from '@mui/icons-material/Web';
import type { TopicGroup } from './topicGridTypes';
import { TOPIC_BEST_PRACTICES } from './topicItemsBestPractices';
import { TOPIC_GUIDES } from './topicItemsGuides';
import { TOPIC_WEBSITES } from './topicItemsWebsites';

export type { TopicItem, TopicGroup } from './topicGridTypes';
export { DIFF_COLORS } from './topicGridTypes';

export const TOPIC_GROUPS: TopicGroup[] = [
  { titleKey: 'topicWebsites', icon: <WebIcon />, color: '#6366f1', items: TOPIC_WEBSITES },
  { titleKey: 'topicGuides', icon: <BuildIcon />, color: '#0ea5e9', items: TOPIC_GUIDES },
  { titleKey: 'topicBestPractices', icon: <SecurityIcon />, color: '#10b981', items: TOPIC_BEST_PRACTICES },
];
