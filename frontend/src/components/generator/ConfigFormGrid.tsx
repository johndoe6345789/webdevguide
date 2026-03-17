'use client';
import Grid from '@mui/material/Grid2';
import type {
  ScaffolderConfig,
} from '@/store/slices/generatorSlice';
import DomainFeaturesCard from './DomainFeaturesCard';
import type { DomainInfo } from './formTypes';
import ProjectSettingsCard from './ProjectSettingsCard';
import StackSummaryCard from './StackSummaryCard';

interface Props {
  scaffolder: ScaffolderConfig;
  domainInfo: DomainInfo;
  onUpdateConfig: (
    u: Record<string, string>,
  ) => void;
  onToggleFeature: (f: string) => void;
  onGenerate: () => void;
}

export default function ConfigFormGrid(
  p: Props,
) {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <ProjectSettingsCard
          scaffolder={p.scaffolder}
          onUpdateConfig={p.onUpdateConfig}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <DomainFeaturesCard
          domainLabel={p.domainInfo.label}
          features={p.domainInfo.features}
          selectedFeatures={
            p.scaffolder.features
          }
          onToggleFeature={
            p.onToggleFeature
          }
        />
        <StackSummaryCard
          scaffolder={p.scaffolder}
          onGenerate={p.onGenerate}
        />
      </Grid>
    </Grid>
  );
}
