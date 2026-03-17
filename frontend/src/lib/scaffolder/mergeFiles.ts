import {
  generateAppTest, generateDockerCompose, generateDockerfile,
  generateEnvExample, generateGitignore, generatePackageJson,
  generateReadme, generateTestSetup, generateTsConfig,
} from './shared';
import type { GeneratedFile, ProjectConfig } from './types';

const CONFIG_FILES = new Set([
  'package.json', 'tsconfig.json', '.gitignore', '.env.example',
  'README.md', 'Dockerfile', 'docker-compose.yml',
]);

export function mergeAndSortFiles(
  config: ProjectConfig,
  domainFiles: GeneratedFile[],
): GeneratedFile[] {
  const isApiBackend = config.domain === 'api-backend';
  const hasPackageJson = domainFiles.some((f) => f.path === 'package.json');

  const sharedFiles: GeneratedFile[] = [
    ...(!hasPackageJson ? [generatePackageJson(config)] : []),
    generateDockerfile(config),
    generateDockerCompose(config),
    generateEnvExample(config),
    ...(!isApiBackend ? [generateTsConfig(config)] : []),
    generateGitignore(),
    generateReadme(config),
    generateTestSetup(),
    generateAppTest(config),
  ];

  const fileMap = new Map<string, GeneratedFile>();
  for (const f of sharedFiles) fileMap.set(f.path, f);
  for (const f of domainFiles) fileMap.set(f.path, f);

  return [...fileMap.values()].sort((a, b) => {
    const aIsConfig = CONFIG_FILES.has(a.path);
    const bIsConfig = CONFIG_FILES.has(b.path);
    if (aIsConfig && !bIsConfig) return -1;
    if (!aIsConfig && bIsConfig) return 1;
    return a.path.localeCompare(b.path);
  });
}
