'use client';

import type { SyntheticEvent } from 'react';
import Container from '@mui/material/Container';
import BottomCta from '@/components/generator/BottomCta';
import GeneratorHeader from '@/components/generator/GeneratorHeader';
import GeneratorModeTabs from '@/components/generator/GeneratorModeTabs';
import ProjectScaffolder from '@/components/generator/ProjectScaffolder';
import QuickGenerateView from '@/components/generator/QuickGenerateView';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setActiveMode } from '@/store/slices/generatorSlice';

export default function CodeGeneratorPage() {
  const dispatch = useAppDispatch();
  const activeMode = useAppSelector((s) => s.generator.activeMode);
  const handleModeChange = (_: SyntheticEvent, v: 'quick' | 'scaffolder') => {
    dispatch(setActiveMode(v));
  };
  return (
    <Container maxWidth="xl" sx={{ py: { xs: 4, md: 8 } }}>
      <GeneratorHeader />
      <GeneratorModeTabs activeMode={activeMode} onChange={handleModeChange} />
      {activeMode === 'quick' && <QuickGenerateView />}
      {activeMode === 'scaffolder' && <ProjectScaffolder />}
      <BottomCta />
    </Container>
  );
}
