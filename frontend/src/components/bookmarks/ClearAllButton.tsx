'use client';

import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

interface ClearAllButtonProps {
  showConfirm: boolean;
  setShowConfirm: (v: boolean) => void;
  onClear: () => void;
}

export default function ClearAllButton({ showConfirm, setShowConfirm, onClear }: ClearAllButtonProps) {
  if (showConfirm) {
    return (
      <Alert severity="warning" action={
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button size="small" color="error" onClick={onClear}>Yes, Clear All</Button>
          <Button size="small" onClick={() => setShowConfirm(false)}>Cancel</Button>
        </Box>
      }>
        Are you sure you want to remove all bookmarks?
      </Alert>
    );
  }

  return (
    <Button startIcon={<DeleteSweepIcon />} color="error" size="small" onClick={() => setShowConfirm(true)}>
      Clear All Bookmarks
    </Button>
  );
}
