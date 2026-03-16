'use client';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid2';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { PROP_TYPE_OPTIONS } from './constants';
interface NewProp { name: string; type: string; required: boolean; defaultValue: string; }
interface Props { newProp: NewProp; setNewProp: (p: NewProp) => void; onAdd: () => void; }

export default function AddPropForm({ newProp, setNewProp, onAdd }: Props) {
  const set = (patch: Partial<NewProp>) => setNewProp({ ...newProp, ...patch });
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>Add a new prop</Typography>
      <Grid container spacing={1} alignItems="center">
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField label="Prop name" size="small" fullWidth value={newProp.name}
            onChange={(e) => set({ name: e.target.value })}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); onAdd(); } }} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="prop-type-label">Type</InputLabel>
            <Select labelId="prop-type-label" value={newProp.type} label="Type" onChange={(e) => set({ type: e.target.value })}>
              {PROP_TYPE_OPTIONS.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <FormControlLabel control={<Checkbox checked={newProp.required} onChange={(e) => set({ required: e.target.checked })} size="small" />}
            label={<Typography variant="body2">Required</Typography>} />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <TextField label="Default value" size="small" fullWidth value={newProp.defaultValue} onChange={(e) => set({ defaultValue: e.target.value })} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Button variant="outlined" size="small" startIcon={<AddIcon />} onClick={onAdd} disabled={!newProp.name.trim()} fullWidth>Add Prop</Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
