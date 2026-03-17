import { generateApiBackend } from './domains/apiBackend';
import { generateBlog } from './domains/blog';
import { generateEcommerce } from './domains/ecommerce';
import { generateGaming } from './domains/gaming';
import { generateMedia } from './domains/media';
import { generatePersonalHomepage } from './domains/personalHomepage';
import { generateSaas } from './domains/saas';
import { generateSocial } from './domains/social';
import { buildFileTree } from './fileTree';
import { mergeAndSortFiles } from './mergeFiles';
import type { ProjectConfig, GeneratedFile } from './types';

const domainGenerators: Record<
  string, (config: ProjectConfig) => GeneratedFile[]
> = {
  'personal-homepage': generatePersonalHomepage,
  'blog': generateBlog,
  'ecommerce': generateEcommerce,
  'social-platform': generateSocial,
  'saas-dashboard': generateSaas,
  'media-streaming': generateMedia,
  'gaming-website': generateGaming,
  'api-backend': generateApiBackend,
};

export function generateProject(config: ProjectConfig): GeneratedFile[] {
  const domainGen = domainGenerators[config.domain];
  if (!domainGen) return [];
  return mergeAndSortFiles(config, domainGen(config));
}

export { buildFileTree };
export type { TreeNode } from './fileTree';
export type { ProjectConfig, GeneratedFile } from './types';
export { DOMAIN_OPTIONS, FRAMEWORK_OPTIONS, STYLING_OPTIONS, STATE_OPTIONS, AUTH_OPTIONS, DATABASE_OPTIONS } from './types';
export type { ProjectDomain, FrameworkOption, StylingOption, StateOption, AuthOption, DatabaseOption, DomainInfo } from './types';
