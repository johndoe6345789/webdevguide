'use client';

import { useTranslations } from 'next-intl';
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

type ToggleKey = 'useTypeScript' | 'useMui' | 'useRedux' | 'includeTests';
const TOGGLE_KEYS: ToggleKey[] = ['useTypeScript', 'useMui', 'useRedux', 'includeTests'];

export default function OptionsToggles({ config }: Props) {
  const t = useTranslations('generator');
  const dispatch = useAppDispatch();
  const labels: Record<ToggleKey, string> = {
    useTypeScript: t('useTypeScript'),
    useMui: t('useMui'),
    useRedux: t('useRedux'),
    includeTests: t('includeTests'),
  };
  return (
    <Box>
      <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>{t('options')}</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        {TOGGLE_KEYS.map((key) => (
          <FormControlLabel
            key={key}
            control={
              <Switch checked={config[key]} onChange={(e) => dispatch(updateConfig({ [key]: e.target.checked }))} size="small" />
            }
            label={labels[key]}
          />
        ))}
      </Box>
    </Box>
  );
}
