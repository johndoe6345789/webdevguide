'use client';

import { useTranslations } from 'next-intl';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

interface Props {
  fileCount: number;
  copied: string | null;
  onCopyAll: () => void;
  onBack: () => void;
  onReset: () => void;
}

export default function MultiFileOutputHeader({
  fileCount, copied, onCopyAll, onBack, onReset,
}: Props) {
  const t = useTranslations('generator');
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={onBack} size="small">
          {t('back', { ns: 'common' })}
        </Button>
        <Box>
          <Typography variant="h5" fontWeight={700}>{t('generatedProject')}</Typography>
          <Typography variant="body2" color="text.secondary">{t('filesGenerated', { count: fileCount })}</Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Tooltip title={t('copyAllTooltip')}>
          <Button variant="outlined" size="small"
            startIcon={copied === '__all__' ? <CheckIcon color="success" /> : <FolderZipIcon />}
            onClick={onCopyAll} color={copied === '__all__' ? 'success' : 'primary'}>
            {copied === '__all__' ? t('copiedAll') : t('copyAllFiles')}
          </Button>
        </Tooltip>
        <Button variant="outlined" size="small" color="error" startIcon={<RestartAltIcon />} onClick={onReset}>
          {t('startOver')}
        </Button>
      </Box>
    </Box>
  );
}
