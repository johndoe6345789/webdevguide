import {
  generateComponent, generatePage,
  generateApiRoute, generateHook,
  generateLayout, generateForm,
} from '@/lib/codeTemplates';

export const generators: Record<
  string, (c: never) => string
> = {
  component: generateComponent,
  page: generatePage,
  'api-route': generateApiRoute,
  hook: generateHook,
  layout: generateLayout,
  form: generateForm,
};

export function getFilename(
  name: string, ts: boolean, type: string,
) {
  if (type === 'api-route') {
    return ts ? 'route.ts' : 'route.js';
  }
  if (type === 'hook') {
    const h = name.startsWith('use')
      ? name : `use${name}`;
    return `${h}.${ts ? 'ts' : 'js'}`;
  }
  return `${name}.${ts ? 'tsx' : 'jsx'}`;
}
