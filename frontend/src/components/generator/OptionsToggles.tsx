'use client';

import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { useAppDispatch } from '@/store/hooks';
import { updateConfig } from '@/store/slices/generatorSlice';
import type { GeneratorConfig } from '@/store/slices/generatorSlice';

interface Props {
  config: GeneratorConfig;
}

const TOGGLES: { key: keyof Pick<GeneratorConfig, 'useTypeScript' | 'useMui' | 'useRedux' | 'includeTests'>; label: string }[] = [
  { key: 'useTypeScript', label: 'Use TypeScript' },
  { key: 'useMui', label: 'Use Material UI' },
  { key: 'useRedux', label: 'Use Redux State' },
  { key: 'includeTests', label: 'Include Test File' },
];

export default function OptionsToggles({ config }: Props) {
  const dispatch = useAppDispatch();
  return (
    <Box>
      <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>Options</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        {TOGGLES.map(({ key, label }) => (
          <FormControlLabel
            key={key}
            control={
              <Switch checked={config[key]} onChange={(e) => dispatch(updateConfig({ [key]: e.target.checked }))} size="small" />
            }
            label={label}
          />
        ))}
      </Box>
    </Box>
  );
}
