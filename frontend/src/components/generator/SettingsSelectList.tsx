'use client';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

interface SelectDef {
  key: string;
  label: string;
  value: string;
  options: readonly { value: string; label: string }[];
}

interface Props {
  selects: SelectDef[];
  onChange: (key: string, val: string) => void;
}

export default function SettingsSelectList(
  { selects, onChange }: Props,
) {
  return (
    <>
      {selects.map((s) => (
        <FormControl
          key={s.key} fullWidth size="small"
        >
          <InputLabel>{s.label}</InputLabel>
          <Select
            value={s.value}
            label={s.label}
            onChange={(e) => onChange(
              s.key, e.target.value,
            )}
          >
            {s.options.map((o) => (
              <MenuItem
                key={o.value} value={o.value}
              >
                {o.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ))}
    </>
  );
}
