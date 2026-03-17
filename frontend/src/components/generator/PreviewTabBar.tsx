'use client';
import type { SyntheticEvent } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import PreviewCopyButton from './PreviewCopyButton';

interface Props {
  activeTab: number;
  mainFilename: string;
  testFilename: string;
  showTest: boolean;
  copied: boolean;
  onTabChange: (
    _: SyntheticEvent, v: number,
  ) => void;
  onCopy: () => void;
}

const barSx = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  mb: 2,
};

export default function PreviewTabBar(
  p: Props,
) {
  return (
    <Box sx={barSx}>
      <Tabs
        value={p.activeTab}
        onChange={p.onTabChange}
      >
        <Tab label={p.mainFilename} />
        {p.showTest && (
          <Tab label={p.testFilename} />
        )}
      </Tabs>
      <PreviewCopyButton
        copied={p.copied}
        onCopy={p.onCopy}
      />
    </Box>
  );
}
