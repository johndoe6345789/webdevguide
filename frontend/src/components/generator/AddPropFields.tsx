'use client';
import { useTranslations } from 'next-intl';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import PropTypeSelect from './PropTypeSelect';

interface Props {
  name: string;
  type: string;
  onNameChange: (v: string) => void;
  onTypeChange: (v: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export default function AddPropFields(
  p: Props,
) {
  const t = useTranslations('generator');
  return (
    <>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField
          label={t('propNameLabel')}
          size="small" fullWidth
          value={p.name}
          onChange={(e) => p.onNameChange(
            e.target.value,
          )}
          onKeyDown={p.onKeyDown}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <PropTypeSelect
          value={p.type}
          onChange={p.onTypeChange}
        />
      </Grid>
    </>
  );
}
