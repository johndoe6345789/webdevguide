'use client';

import { useMemo } from 'react';
import { generateProject, buildFileTree } from '@/lib/scaffolder';
import type { ProjectConfig } from '@/lib/scaffolder';
import { useAppSelector } from '@/store/hooks';

export default function useScaffolderConfig() {
  const scaffolder = useAppSelector((s) => s.generator.scaffolder);

  const projectConfig: ProjectConfig | null = useMemo(() => {
    if (!scaffolder.domain) return null;
    return {
      domain: scaffolder.domain,
      projectName: scaffolder.projectName || 'my-project',
      framework: scaffolder.framework,
      styling: scaffolder.styling,
      stateManagement: scaffolder.stateManagement,
      auth: scaffolder.auth,
      database: scaffolder.database,
      features: scaffolder.features,
    };
  }, [scaffolder]);

  const generatedFiles = useMemo(() => {
    if (!projectConfig) return [];
    return generateProject(projectConfig);
  }, [projectConfig]);

  const fileTree = useMemo(() => {
    if (generatedFiles.length === 0) return null;
    return buildFileTree(generatedFiles);
  }, [generatedFiles]);

  const selectedFileData = useMemo(() => {
    if (!scaffolder.selectedFile) {
      return generatedFiles.length > 0 ? generatedFiles[0] : null;
    }
    return generatedFiles.find(
      (f) => f.path === scaffolder.selectedFile,
    ) || null;
  }, [scaffolder.selectedFile, generatedFiles]);

  return {
    scaffolder, projectConfig,
    generatedFiles, fileTree, selectedFileData,
  };
}
