'use client';

import type { ContentBlock } from '@/types/content';
import AccordionBlockRenderer from './AccordionBlockRenderer';
import AlertBlockRenderer from './AlertBlockRenderer';
import CardGridBlockRenderer from './CardGridBlockRenderer';
import CodeBlockRenderer from './CodeBlockRenderer';
import ListBlockRenderer from './ListBlockRenderer';
import StepBlockRenderer from './StepBlockRenderer';
import TableBlockRenderer from './TableBlockRenderer';
import TabsBlockRenderer from './TabsBlockRenderer';
import TextBlockRenderer from './TextBlockRenderer';

interface BlockRendererProps {
  block: ContentBlock;
}

export default function BlockRenderer({ block }: BlockRendererProps) {
  switch (block.type) {
    case 'text': return <TextBlockRenderer {...block} />;
    case 'code': return <CodeBlockRenderer {...block} />;
    case 'list': return <ListBlockRenderer {...block} />;
    case 'alert': return <AlertBlockRenderer {...block} />;
    case 'step': return <StepBlockRenderer {...block} />;
    case 'tabs': return <TabsBlockRenderer {...block} />;
    case 'accordion': return <AccordionBlockRenderer {...block} />;
    case 'table': return <TableBlockRenderer {...block} />;
    case 'cardGrid': return <CardGridBlockRenderer {...block} />;
    default: return null;
  }
}
