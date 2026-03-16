'use client';

import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import type { PropDefinition } from '@/store/slices/generatorSlice';

interface Props {
  prop: PropDefinition;
  onRemove: () => void;
}

export default function PropListItem({ prop, onRemove }: Props) {
  return (
    <Paper variant="outlined" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 1.5, py: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
        <Typography variant="body2" fontFamily="monospace" fontWeight={600}>{prop.name}</Typography>
        <Chip label={prop.type} size="small" variant="outlined" />
        {prop.required && <Chip label="required" size="small" color="warning" />}
        {prop.defaultValue && <Chip label={`= ${prop.defaultValue}`} size="small" variant="outlined" color="info" />}
      </Box>
      <Tooltip title="Remove prop">
        <IconButton size="small" color="error" onClick={onRemove}><DeleteIcon fontSize="small" /></IconButton>
      </Tooltip>
    </Paper>
  );
}
