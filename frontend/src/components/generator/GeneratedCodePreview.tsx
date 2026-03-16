'use client';

import type { SyntheticEvent } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Tooltip from '@mui/material/Tooltip';
import CodeBlock from '@/components/common/CodeBlock';
import type { GeneratorConfig } from '@/store/slices/generatorSlice';
import SummaryChips from './SummaryChips';

interface Props {
  config: GeneratorConfig; generatedCode: string; testCode: string;
  mainFilename: string; testFilename: string;
  activeTab: number; copied: boolean;
  onTabChange: (_: SyntheticEvent, v: number) => void; onCopy: () => void;
}

export default function GeneratedCodePreview(p: Props) {
  const lang = p.config.useTypeScript ? 'tsx' : 'jsx';
  return (
    <Card variant="outlined">
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Tabs value={p.activeTab} onChange={p.onTabChange} aria-label="Generated file tabs">
            <Tab label={p.mainFilename} />
            {p.config.includeTests && <Tab label={p.testFilename} />}
          </Tabs>
          <Tooltip title={p.copied ? 'Copied!' : 'Copy all code'}>
            <Button variant="outlined" size="small" startIcon={p.copied ? <CheckIcon color="success" /> : <ContentCopyIcon />}
              onClick={p.onCopy} color={p.copied ? 'success' : 'primary'}>
              {p.copied ? 'Copied!' : 'Copy All'}
            </Button>
          </Tooltip>
        </Box>
        {p.activeTab === 0 && <CodeBlock language={lang} filename={p.mainFilename} code={p.generatedCode} />}
        {p.activeTab === 1 && p.config.includeTests && <CodeBlock language={lang} filename={p.testFilename} code={p.testCode} />}
        <SummaryChips config={p.config} />
      </CardContent>
    </Card>
  );
}
