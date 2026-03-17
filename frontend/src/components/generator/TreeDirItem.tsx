'use client';
import { useState } from 'react';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import type { TreeNode } from '@/lib/scaffolder';
import DirItemButton from './DirItemButton';
import TreeNodeItem from './TreeNodeItem';

interface Props {
  node: TreeNode; depth: number;
  selectedFile: string | null;
  onSelectFile: (p: string) => void;
}

export default function TreeDirItem(
  { node: n, depth, selectedFile, onSelectFile }: Props,
) {
  const [open, setOpen] = useState(depth < 2);
  return (
    <>
      <DirItemButton
        name={n.name}
        open={open}
        hasChildren={n.children.length > 0}
        depth={depth}
        onToggle={() => setOpen(!open)}
      />
      <Collapse
        in={open} timeout="auto"
        unmountOnExit
      >
        <List disablePadding>
          {n.children.map((c) => (
            <TreeNodeItem
              key={c.path} node={c}
              depth={depth + 1}
              selectedFile={selectedFile}
              onSelectFile={onSelectFile}
            />
          ))}
        </List>
      </Collapse>
    </>
  );
}
