'use client';

import Box from '@mui/material/Box';
import type { ContentBlock } from '@/types/content';
import BlockRenderer from './BlockRenderer';

interface SectionRendererProps {
  blocks: ContentBlock[];
}

export default function SectionRenderer({ blocks }: SectionRendererProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {blocks.map((block, i) => (
        <BlockRenderer key={i} block={block} />
      ))}
    </Box>
  );
}
