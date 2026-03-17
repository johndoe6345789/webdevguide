'use client';
import { useTranslations } from 'next-intl';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import TextField from '@mui/material/TextField';
import PropRequiredCheck from './PropRequiredCheck';

interface Props {
  required: boolean;
  defaultValue: string;
  disableAdd: boolean;
  onRequiredChange: (v: boolean) => void;
  onDefaultChange: (v: string) => void;
  onAdd: () => void;
}

export default function AddPropOptions(
  p: Props,
) {
  const t = useTranslations('generator');
  return (
    <>
      <Grid size={{ xs: 6 }}>
        <PropRequiredCheck
          checked={p.required}
          onChange={p.onRequiredChange}
        />
      </Grid>
      <Grid size={{ xs: 6 }}>
        <TextField
          label={t('defaultValueLabel')}
          size="small" fullWidth
          value={p.defaultValue}
          onChange={(e) => p.onDefaultChange(
            e.target.value,
          )}
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Button
          variant="outlined" size="small"
          startIcon={<AddIcon />}
          onClick={p.onAdd}
          disabled={p.disableAdd} fullWidth
        >
          {t('addProp')}
        </Button>
      </Grid>
    </>
  );
}
