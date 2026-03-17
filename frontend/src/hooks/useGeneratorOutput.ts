'use client';

import { useMemo } from 'react';
import { generators, getFilename } from '@/hooks/generatorMap';
import { generateComponent, generateTestFile } from '@/lib/codeTemplates';
import type { GeneratorConfig } from '@/store/slices/generatorSlice';

export function useGeneratorOutput(
  config: GeneratorConfig,
) {
  const generatedCode = useMemo(
    () => (generators[config.type]
      ?? generateComponent)(config as never),
    [config],
  );
  const testCode = useMemo(
    () => (config.includeTests
      ? generateTestFile(config) : ''),
    [config],
  );
  const mainFilename = getFilename(
    config.componentName,
    config.useTypeScript, config.type,
  );
  const ext = config.useTypeScript ? 'tsx' : 'jsx';
  const testFilename =
    `${config.componentName}.test.${ext}`;

  return {
    generatedCode, testCode,
    mainFilename, testFilename,
  };
}
