'use client';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

interface Props {
  name: string;
  open: boolean;
  hasChildren: boolean;
  depth: number;
  onToggle: () => void;
}

const mono = {
  fontFamily: 'monospace',
  fontSize: '0.8rem',
};

export default function DirItemButton(p: Props) {
  const ico = p.open
    ? <FolderOpenIcon
        fontSize="small" color="primary"
      />
    : <FolderIcon
        fontSize="small" color="primary"
      />;
  const arrow = p.hasChildren && (p.open
    ? <ExpandLess fontSize="small" />
    : <ExpandMore fontSize="small" />);
  return (
    <ListItemButton
      onClick={p.onToggle}
      sx={{ pl: 1.5 + p.depth * 2 }} dense
    >
      <ListItemIcon sx={{ minWidth: 28 }}>
        {ico}
      </ListItemIcon>
      <ListItemText primary={
        <Typography variant="body2" sx={mono}>
          {p.name}
        </Typography>
      } />
      {arrow}
    </ListItemButton>
  );
}
