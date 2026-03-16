'use client';

import TextField from '@mui/material/TextField';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function ComponentNameField({ value, onChange }: Props) {
  return (
    <TextField
      label="Name"
      size="small"
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
      helperText="PascalCase name for your component, page, or hook"
    />
  );
}
