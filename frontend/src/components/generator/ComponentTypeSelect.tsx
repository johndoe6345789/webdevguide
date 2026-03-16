'use client';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { TYPE_OPTIONS } from './constants';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function ComponentTypeSelect({ value, onChange }: Props) {
  return (
    <FormControl fullWidth size="small">
      <InputLabel id="type-select-label">Type</InputLabel>
      <Select
        labelId="type-select-label"
        value={value}
        label="Type"
        onChange={(e) => onChange(e.target.value)}
      >
        {TYPE_OPTIONS.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
