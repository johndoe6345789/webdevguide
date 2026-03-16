'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import type { TabsBlock } from '@/types/content';
import SectionRenderer from './SectionRenderer';

export default function TabsBlockRenderer({ tabs }: TabsBlock) {
  const [active, setActive] = useState(0);

  return (
    <Box>
      <Tabs value={active} onChange={(_, v) => setActive(v)} sx={{ mb: 2 }}>
        {tabs.map((t, i) => (
          <Tab key={i} label={t.label} />
        ))}
      </Tabs>
      <SectionRenderer blocks={tabs[active]?.blocks ?? []} />
    </Box>
  );
}
