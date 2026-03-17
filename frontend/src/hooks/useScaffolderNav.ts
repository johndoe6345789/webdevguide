'use client';

import { useCallback } from 'react';
import type {
  AuthOption, DatabaseOption,
  FrameworkOption, ProjectDomain,
  StateOption, StylingOption,
} from '@/lib/scaffolder';
import { useAppDispatch } from '@/store/hooks';
import {
  resetScaffolder, selectScaffolderFile,
  setScaffolderDomain, setScaffolderStep,
  toggleScaffolderFeature, updateScaffolder,
} from '@/store/slices/generatorSlice';

type CfgUp = Partial<{
  projectName: string;
  framework: FrameworkOption;
  styling: StylingOption;
  stateManagement: StateOption;
  auth: AuthOption; database: DatabaseOption;
}>;
type Step = 'domain' | 'configure' | 'output';

export default function useScaffolderNav() {
  const dp = useAppDispatch();
  const handleSelectDomain = useCallback(
    (d: ProjectDomain) =>
      dp(setScaffolderDomain(d)), [dp],
  );
  const handleUpdateConfig = useCallback(
    (u: CfgUp) => dp(updateScaffolder(u)), [dp],
  );
  const handleToggleFeature = useCallback(
    (f: string) =>
      dp(toggleScaffolderFeature(f)), [dp],
  );
  const handleSetStep = useCallback(
    (s: Step) => dp(setScaffolderStep(s)), [dp],
  );
  const handleSelectFile = useCallback(
    (p: string | null) =>
      dp(selectScaffolderFile(p)), [dp],
  );
  const handleReset = useCallback(
    () => dp(resetScaffolder()), [dp],
  );
  return {
    dispatch: dp, handleSelectDomain,
    handleUpdateConfig, handleToggleFeature,
    handleSetStep, handleSelectFile, handleReset,
  };
}
