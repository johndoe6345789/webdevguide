'use client';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import type { TreeNode } from '@/lib/scaffolder';
import getFileIcon from './getFileIcon';
import TreeDirItem from './TreeDirItem';

interface Props {
  node: TreeNode; depth: number;
  selectedFile: string | null;
  onSelectFile: (path: string) => void;
}

export default function TreeNodeItem(
  { node, depth, selectedFile, onSelectFile }: Props,
) {
  if (node.isDirectory) {
    return (
      <TreeDirItem
        node={node} depth={depth}
        selectedFile={selectedFile}
        onSelectFile={onSelectFile} />
    );
  }
  const sel = selectedFile === node.path;
  const fw = sel ? 600 : 400;
  return (
    <ListItemButton
      onClick={() => onSelectFile(node.path)}
      selected={sel}
      sx={{ pl: 1.5 + depth * 2 }} dense>
      <ListItemIcon sx={{ minWidth: 28 }}>
        {getFileIcon(node.name)}
      </ListItemIcon>
      <ListItemText primary={
        <Typography
          variant="body2"
          fontFamily="monospace"
          fontSize="0.8rem" fontWeight={fw}>
          {node.name}
        </Typography>
      } />
    </ListItemButton>
  );
}
