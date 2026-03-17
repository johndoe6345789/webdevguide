'use client';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import type { GeneratedFile, TreeNode } from '@/lib/scaffolder';
import MultiFileOutputExplorer from './MultiFileOutputExplorer';
import MultiFileOutputHeader from './MultiFileOutputHeader';
import MultiFileOutputViewer from './MultiFileOutputViewer';

interface Props {
  files: GeneratedFile[];
  fileTree: TreeNode | null;
  selectedFile: GeneratedFile | null;
  selectedPath: string | null;
  copied: string | null;
  onSelectFile: (p: string) => void;
  onCopyFile: (p: string) => void;
  onCopyAll: () => void;
  onBack: () => void; onReset: () => void;
}

export default function MultiFileOutput({
  files, fileTree, selectedFile,
  selectedPath, copied, onSelectFile,
  onCopyFile, onCopyAll, onBack, onReset,
}: Props) {
  const sel = selectedPath
    || (files.length > 0 ? files[0].path : null);
  return (
    <Box>
      <MultiFileOutputHeader
        fileCount={files.length}
        copied={copied} onCopyAll={onCopyAll}
        onBack={onBack} onReset={onReset} />
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4, lg: 3 }}>
          <MultiFileOutputExplorer
            fileCount={files.length}
            fileTree={fileTree}
            selectedFile={sel}
            onSelectFile={onSelectFile}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 8, lg: 9 }}>
          <MultiFileOutputViewer
            selectedFile={selectedFile}
            copied={copied} onCopyFile={onCopyFile} />
        </Grid>
      </Grid>
    </Box>
  );
}
