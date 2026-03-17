'use client';
import { useTranslations } from 'next-intl';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import AddPropGrid from './AddPropGrid';
import type {
  AddPropFormProps, NewProp,
} from './generatorTypes';

export default function AddPropForm(
  { newProp, setNewProp, onAdd }: AddPropFormProps,
) {
  const t = useTranslations('generator');
  const set = (patch: Partial<NewProp>) =>
    setNewProp({ ...newProp, ...patch });
  const kd = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault(); onAdd();
    }
  };
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ mb: 1, display: 'block' }}
      >
        {t('addNewProp')}
      </Typography>
      <Grid
        container spacing={1}
        alignItems="center"
      >
        <AddPropGrid
          newProp={newProp}
          onAdd={onAdd}
          set={set}
          onKeyDown={kd}
        />
      </Grid>
    </Paper>
  );
}
