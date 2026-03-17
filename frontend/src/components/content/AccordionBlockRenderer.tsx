'use client';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import type { AccordionBlock } from '@/types/content';
import SectionRenderer from './SectionRenderer';

export default function AccordionBlockRenderer(
  { title, blocks, defaultExpanded }: AccordionBlock,
) {
  return (
    <Accordion defaultExpanded={defaultExpanded}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6" fontWeight={600}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <SectionRenderer blocks={blocks} />
      </AccordionDetails>
    </Accordion>
  );
}
