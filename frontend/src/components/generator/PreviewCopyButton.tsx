'use client';
import { useTranslations } from 'next-intl';
import CheckIcon from '@mui/icons-material/Check';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

interface Props {
  copied: boolean;
  onCopy: () => void;
}

export default function PreviewCopyButton(
  { copied, onCopy }: Props,
) {
  const t = useTranslations('generator');
  const tc = useTranslations('common');
  const ico = copied
    ? <CheckIcon color="success" />
    : <ContentCopyIcon />;
  const clr = copied
    ? ('success' as const)
    : ('primary' as const);
  const label = copied
    ? tc('copied')
    : t('copyAllShort');
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
