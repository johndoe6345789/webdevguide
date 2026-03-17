'use client';
import Box from '@mui/material/Box';
import { DOMAIN_OPTIONS } from '@/lib/scaffolder';
import ConfigFormGrid from './ConfigFormGrid';
import ConfigFormHeader from './ConfigFormHeader';
import type {
  ConfigFormProps,
} from './formTypes';

export default function ProjectConfigForm(
  p: ConfigFormProps,
) {
  const info = DOMAIN_OPTIONS.find(
    (d) => d.id === p.scaffolder.domain,
  );
  if (!info) return null;
  return (
    <Box>
      <ConfigFormHeader
        domainLabel={info.label}
        onBack={p.onBack}
      />
      <ConfigFormGrid
        scaffolder={p.scaffolder}
        domainInfo={info}
        onUpdateConfig={p.onUpdateConfig}
        onToggleFeature={p.onToggleFeature}
        onGenerate={p.onGenerate}
      />
    </Box>
  );
}
