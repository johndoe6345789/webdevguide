'use client';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import BottomCta from '@/components/generator/BottomCta';
import GeneratedCodePreview from '@/components/generator/GeneratedCodePreview';
import GeneratorForm from '@/components/generator/GeneratorForm';
import GeneratorHeader from '@/components/generator/GeneratorHeader';
import useCodeGenerator from '@/hooks/useCodeGenerator';

export default function CodeGeneratorPage() {
  const g = useCodeGenerator();

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 4, md: 8 } }}>
      <GeneratorHeader />
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
            config={g.config} generatedCode={g.generatedCode} testCode={g.testCode}
            mainFilename={g.mainFilename} testFilename={g.testFilename}
            activeTab={g.activeTab} copied={g.copied}
            onTabChange={g.handleTabChange} onCopy={g.handleCopyAll}
          />
        </Grid>
      </Grid>
      <BottomCta />
    </Container>
  );
}
