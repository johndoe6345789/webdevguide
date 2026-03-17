'use client';

import Grid from '@mui/material/Grid2';
import GeneratedCodePreview from '@/components/generator/GeneratedCodePreview';
import GeneratorForm from '@/components/generator/GeneratorForm';
import useCodeGenerator from '@/hooks/useCodeGenerator';

export default function QuickGenerateView() {
  const g = useCodeGenerator();
  return (
    <Grid container spacing={4}>
      <Grid size={{ xs: 12, md: 5 }}>
        <GeneratorForm
          config={g.config} newProp={g.newProp} setNewProp={g.setNewProp}
          onTypeChange={g.handleTypeChange} onNameChange={g.handleNameChange}
          onAddProp={g.handleAddProp} onRemoveProp={g.handleRemoveProp}
          onToggleFeature={g.handleToggleFeature} onReset={g.handleReset}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 7 }}>
        <GeneratedCodePreview
          config={g.config}
          generatedCode={g.generatedCode}
          testCode={g.testCode}
          mainFilename={g.mainFilename}
          testFilename={g.testFilename}
          activeTab={g.activeTab}
          copied={g.copied}
          onTabChange={g.handleTabChange}
          onCopy={g.handleCopyAll}
        />
      </Grid>
    </Grid>
  );
}
