'use client';

import { useCallback } from 'react';
import useScaffolderClipboard from '@/hooks/useScaffolderClipboard';
import useScaffolderNav from '@/hooks/useScaffolderNav';
import type { GeneratedFile } from '@/lib/scaffolder';
import {
  selectScaffolderFile, setScaffolderStep,
} from '@/store/slices/generatorSlice';

export default function useScaffolderActions(
  generatedFiles: GeneratedFile[],
) {
  const nav = useScaffolderNav();
  const clip = useScaffolderClipboard(
    generatedFiles,
  );

  const handleGenerate = useCallback(() => {
    if (generatedFiles.length > 0) {
      nav.dispatch(setScaffolderStep('output'));
      nav.dispatch(
        selectScaffolderFile(
          generatedFiles[0].path,
        ),
      );
    }
  }, [nav, generatedFiles]);

  return {
    ...nav, ...clip, handleGenerate,
  };
}
