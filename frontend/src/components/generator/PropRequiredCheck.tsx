'use client';
import { useTranslations } from 'next-intl';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';

interface Props {
  checked: boolean;
  onChange: (v: boolean) => void;
}

export default function PropRequiredCheck(
  { checked, onChange }: Props,
) {
  const t = useTranslations('generator');
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked} size="small"
          onChange={(e) => onChange(
            e.target.checked,
          )}
        />
      }
      label={
        <Typography variant="body2">
          {t('propRequired')}
        </Typography>
      }
    />
  );
}
