'use client';
import { useTranslations } from 'next-intl';
import TextField from '@mui/material/TextField';

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function ProjectNameField(
  { value, onChange }: Props,
) {
  const t = useTranslations('generator');
  return (
    <TextField
      label={t('projectName')}
      value={value}
      onChange={(e) => onChange(
        e.target.value.replace(
          /[^a-z0-9-]/g, '',
        ),
      )}
      fullWidth
      size="small"
      helperText={t('projectNameHelper')}
    />
  );
}
