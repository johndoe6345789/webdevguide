export interface GuideSection {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  order: number;
  estimatedMinutes: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface GlossaryTermLink {
  label: string;
  url: string;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
  relatedTerms: string[];
  example?: string;
  links?: GlossaryTermLink[];
}
