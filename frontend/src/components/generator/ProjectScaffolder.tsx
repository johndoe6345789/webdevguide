'use client';

import Box from '@mui/material/Box';
import useProjectScaffolder from '@/hooks/useProjectScaffolder';
import DomainSelector from './DomainSelector';
import MultiFileOutput from './MultiFileOutput';
import ProjectConfigForm from './ProjectConfigForm';
import ScaffolderStepper from './ScaffolderStepper';

const STEP_INDEX: Record<string, number> = {
  domain: 0, configure: 1, output: 2,
};

export default function ProjectScaffolder() {
  const s = useProjectScaffolder();
  return (
    <Box>
      <ScaffolderStepper activeStepIndex={STEP_INDEX[s.scaffolder.step]} />
      {s.scaffolder.step === 'domain' && <DomainSelector onSelect={s.handleSelectDomain} />}
      {s.scaffolder.step === 'configure' && (
        <ProjectConfigForm
          scaffolder={s.scaffolder}
          onUpdateConfig={s.handleUpdateConfig}
          onToggleFeature={s.handleToggleFeature}
          onGenerate={s.handleGenerate}
          onBack={() => s.handleSetStep('domain')}
        />
      )}
      {s.scaffolder.step === 'output' && (
        <MultiFileOutput
          files={s.generatedFiles}
          fileTree={s.fileTree}
          selectedFile={s.selectedFileData}
          selectedPath={s.scaffolder.selectedFile}
          copied={s.copied}
          onSelectFile={s.handleSelectFile}
          onCopyFile={s.handleCopyFile}
          onCopyAll={s.handleCopyAll}
          onBack={() => s.handleSetStep('configure')}
          onReset={s.handleReset}
        />
      )}
    </Box>
  );
}
