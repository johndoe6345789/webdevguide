'use client';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

interface ConfirmSubmitAlertProps {
  answeredCount: number;
  totalCount: number;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmSubmitAlert({ answeredCount, totalCount, onCancel, onConfirm }: ConfirmSubmitAlertProps) {
  const allAnswered = answeredCount >= totalCount;
  return (
    <Alert
      severity="warning"
      sx={{ mt: 3 }}
      action={
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button color="inherit" size="small" onClick={onCancel}>Cancel</Button>
          <Button color="error" size="small" variant="contained" onClick={onConfirm}>Confirm Submit</Button>
        </Box>
      }
    >
      {allAnswered
        ? 'Are you sure you want to submit your exam? This action cannot be undone.'
        : `You have answered ${answeredCount} of ${totalCount} questions. Unanswered questions will be marked incorrect.`}
    </Alert>
  );
}
