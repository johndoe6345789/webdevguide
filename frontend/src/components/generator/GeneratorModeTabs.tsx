'use client';

import type { SyntheticEvent } from 'react';
import { useTranslations } from 'next-intl';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

interface Props {
  activeMode: 'quick' | 'scaffolder';
  onChange: (_: SyntheticEvent, v: 'quick' | 'scaffolder') => void;
}

export default function GeneratorModeTabs({ activeMode, onChange }: Props) {
  const t = useTranslations('generator');
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
      <Tabs value={activeMode} onChange={onChange} aria-label="Generator mode">
        <Tab label={t('quickGenerate')} value="quick" />
        <Tab label={t('projectScaffolder')} value="scaffolder" />
      </Tabs>
    </Box>
  );
}
