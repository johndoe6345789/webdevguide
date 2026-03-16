'use client';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import type { GeneratorConfig } from '@/store/slices/generatorSlice';
import { TYPE_OPTIONS } from './constants';

interface Props {
  config: GeneratorConfig;
}

export default function SummaryChips({ config }: Props) {
  return (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
      <Chip label={TYPE_OPTIONS.find((o) => o.value === config.type)?.label} size="small" color="primary" />
      {config.useTypeScript && <Chip label="TypeScript" size="small" variant="outlined" />}
      {config.useMui && <Chip label="Material UI" size="small" variant="outlined" />}
      {config.useRedux && <Chip label="Redux" size="small" variant="outlined" />}
      {config.props.length > 0 && (
        <Chip label={`${config.props.length} prop${config.props.length > 1 ? 's' : ''}`} size="small" variant="outlined" />
      )}
      {config.features.length > 0 && (
        <Chip label={`${config.features.length} feature${config.features.length > 1 ? 's' : ''}`} size="small" variant="outlined" />
      )}
    </Box>
  );
}
