import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import type { AlertBlock } from '@/types/content';

export default function AlertBlockRenderer(
  { severity, title, body }: AlertBlock,
) {
  return (
    <Alert severity={severity}>
      {title && <AlertTitle>{title}</AlertTitle>}
      {body}
    </Alert>
  );
}
