'use client';

import useScaffolderActions from './useScaffolderActions';
import useScaffolderConfig from './useScaffolderConfig';

export default function useProjectScaffolder() {
  const config = useScaffolderConfig();
  const actions = useScaffolderActions(config.generatedFiles);

  return { ...config, ...actions };
}
