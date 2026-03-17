export interface TopicItem {
  labelKey: string;
  href: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface TopicGroup {
  titleKey: string;
  icon: React.ReactNode;
  color: string;
  items: TopicItem[];
}

export const DIFF_COLORS: Record<string, 'success' | 'warning' | 'error'> = {
  beginner: 'success',
  intermediate: 'warning',
  advanced: 'error',
};
