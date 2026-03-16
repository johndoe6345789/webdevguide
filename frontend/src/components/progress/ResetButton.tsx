'use client';

import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

interface ResetButtonProps {
  showReset: boolean;
  setShowReset: (v: boolean) => void;
  onReset: () => void;
}

export default function ResetButton({ showReset, setShowReset, onReset }: ResetButtonProps) {
  if (showReset) {
    return (
      <Alert severity="warning" sx={{ width: '100%' }} action={
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button size="small" color="error" onClick={onReset}>Yes, Reset Everything</Button>
          <Button size="small" onClick={() => setShowReset(false)}>Cancel</Button>
        </Box>
      }>
        This will clear all progress, exam history, and bookmarks. This cannot be undone.
      </Alert>
    );
  }

  return (
    <Button startIcon={<RestartAltIcon />} color="error" variant="outlined" onClick={() => setShowReset(true)}>
      Reset All Progress
    </Button>
  );
}
