'use client';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import type { TreeNode } from '@/lib/scaffolder';
import TreeNodeItem from './TreeNodeItem';

interface Props {
  tree: TreeNode;
  selectedFile: string | null;
  onSelectFile: (path: string) => void;
}

export default function FileTreeView({
  tree, selectedFile, onSelectFile,
}: Props) {
  return (
    <Box sx={{ overflow: 'auto', maxHeight: 600 }}>
      <List disablePadding dense>
        {tree.children.map((child) => (
          <TreeNodeItem
            key={child.path}
            node={child}
            depth={0}
            selectedFile={selectedFile}
            onSelectFile={onSelectFile}
          />
        ))}
      </List>
    </Box>
  );
}
