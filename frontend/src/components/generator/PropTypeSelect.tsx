'use client';
import { useTranslations } from 'next-intl';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { PROP_TYPE_OPTIONS } from './constants';

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function PropTypeSelect(
  { value, onChange }: Props,
) {
  const t = useTranslations('generator');
  return (
    <FormControl fullWidth size="small">
      <InputLabel id="pt-lbl">
        {t('propType')}
      </InputLabel>
      <Select
        labelId="pt-lbl"
        value={value}
        label={t('propType')}
        onChange={(e) => onChange(
          e.target.value,
        )}
      >
        {PROP_TYPE_OPTIONS.map((tp) => (
          <MenuItem key={tp} value={tp}>
            {tp}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
