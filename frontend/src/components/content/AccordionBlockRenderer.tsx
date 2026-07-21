'use client';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { AccordionBlock } from '@/types/content';
import SectionRenderer from './SectionRenderer';

export default function AccordionBlockRenderer(
  { title, blocks, defaultExpanded, items }: AccordionBlock,
) {
  if (items && items.length > 0) {
    return (
      <Box>
        {items.map((item, i) => (
          <Accordion key={i}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" fontWeight={600}>{item.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                {item.body ?? item.content}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    );
  }

  return (
    <Accordion defaultExpanded={defaultExpanded}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6" fontWeight={600}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <SectionRenderer blocks={blocks ?? []} />
      </AccordionDetails>
    </Accordion>
  );
}
