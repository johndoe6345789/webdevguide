'use client';
import { useTranslations } from 'next-intl';
import CheckIcon from '@mui/icons-material/Check';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

interface Props {
  isCopied: boolean;
  onCopy: () => void;
}

export default function ViewerCopyButton(
  { isCopied, onCopy }: Props,
) {
  const t = useTranslations('generator');
  const tc = useTranslations('common');
  const label = isCopied
    ? tc('copied') : t('copyFile');
  const ico = isCopied
    ? <CheckIcon color="success" />
    : <ContentCopyIcon />;
  const clr = isCopied
    ? ('success' as const)
    : ('primary' as const);
  return (
    <Tooltip title={label}>
      <Button
        variant="outlined" size="small"
        startIcon={ico}
        onClick={onCopy} color={clr}
      >
        {label}
      </Button>
    </Tooltip>
  );
}
