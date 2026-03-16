/** A content block is the atomic unit of guide content served from the backend. */
export type ContentBlock =
  | TextBlock
  | CodeBlock
  | ListBlock
  | AlertBlock
  | StepBlock
  | TabsBlock
  | AccordionBlock
  | TableBlock
  | ImageBlock
  | CardGridBlock;

export interface TextBlock {
  type: 'text';
  body: string;
  heading?: string;
  headingLevel?: 2 | 3 | 4;
}

export interface CodeBlock {
  type: 'code';
  code: string;
  language: string;
  filename?: string;
  description?: string;
}

export interface ListBlock {
  type: 'list';
  items: string[];
  ordered?: boolean;
  heading?: string;
}

export interface AlertBlock {
  type: 'alert';
  severity: 'info' | 'warning' | 'success' | 'error';
  body: string;
  title?: string;
}

export interface StepBlock {
  type: 'step';
  step: number;
  title: string;
  body: string;
  code?: string;
  language?: string;
}

export interface TabsBlock {
  type: 'tabs';
  tabs: { label: string; blocks: ContentBlock[] }[];
}

export interface AccordionBlock {
  type: 'accordion';
  title: string;
  blocks: ContentBlock[];
  defaultExpanded?: boolean;
}

export interface TableBlock {
  type: 'table';
  headers: string[];
  rows: string[][];
  heading?: string;
}

export interface ImageBlock {
  type: 'image';
  src: string;
  alt: string;
  caption?: string;
}

export interface CardGridBlock {
  type: 'cardGrid';
  cards: { title: string; body: string; icon?: string; chip?: string }[];
  columns?: number;
}

/** A full guide section as returned by the API. */
export interface GuideSectionContent {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  order: number;
  estimatedMinutes: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  blocks: ContentBlock[];
  keyPoints?: string[];
  prerequisites?: string[];
}
