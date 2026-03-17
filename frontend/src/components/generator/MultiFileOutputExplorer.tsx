'use client';

import { useTranslations } from 'next-intl';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import type { TreeNode } from '@/lib/scaffolder';
import FileTreeView from './FileTreeView';

interface Props {
  fileCount: number;
  fileTree: TreeNode | null;
  selectedFile: string | null;
  onSelectFile: (path: string) => void;
}

export default function MultiFileOutputExplorer({
  fileCount, fileTree, selectedFile, onSelectFile,
}: Props) {
  const t = useTranslations('generator');
  return (
    <Card variant="outlined" sx={{ position: 'sticky', top: 80 }}>
      <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
        <Box sx={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          px: 1.5, py: 1,
        }}>
          <Typography variant="subtitle2" fontWeight={600}>{t('fileExplorer')}</Typography>
          <Chip label={t('filesCount', { count: fileCount })} size="small" variant="outlined" />
        </Box>
        <Divider />
        {fileTree && <FileTreeView
          tree={fileTree}
          selectedFile={selectedFile}
          onSelectFile={onSelectFile}
        />}
      </CardContent>
    </Card>
  );
}
