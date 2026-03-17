import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import CodeIcon from '@mui/icons-material/Code';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import WebIcon from '@mui/icons-material/Web';
import type { SvgIconProps } from '@mui/material/SvgIcon';

export interface StatItem {
  icon: React.ComponentType<SvgIconProps>;
  value: string;
  labelKey: string;
}

export const STATS: StatItem[] = [
  { icon: AutoStoriesIcon, value: '33', labelKey: 'statsChaptersValue' },
  { icon: WebIcon, value: '13', labelKey: 'statsWebsitesValue' },
  { icon: CodeIcon, value: '500+', labelKey: 'statsCodeValue' },
  { icon: MenuBookIcon, value: '120+', labelKey: 'statsGlossaryValue' },
];
