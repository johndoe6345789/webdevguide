'use client';

import { useState, useMemo, type SyntheticEvent } from 'react';
import {
  generateComponent, generatePage, generateApiRoute,
  generateHook, generateLayout, generateForm, generateTestFile,
} from '@/lib/codeTemplates';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  updateConfig, addProp, removeProp,
  toggleFeature, resetConfig, type PropDefinition,
} from '@/store/slices/generatorSlice';
const generators: Record<string, (c: never) => string> = {
  component: generateComponent, page: generatePage,
  'api-route': generateApiRoute, hook: generateHook,
  layout: generateLayout, form: generateForm,
};

function getFilename(name: string, ts: boolean, type: string) {
  if (type === 'api-route') return ts ? 'route.ts' : 'route.js';
  if (type === 'hook') {
    const h = name.startsWith('use') ? name : `use${name}`;
    return `${h}.${ts ? 'ts' : 'js'}`;
  }
  return `${name}.${ts ? 'tsx' : 'jsx'}`;
}

export default function useCodeGenerator() {
  const dispatch = useAppDispatch();
  const config = useAppSelector((s) => s.generator.config);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [newProp, setNewProp] = useState({ name: '', type: 'string', required: true, defaultValue: '' });

  const generatedCode = useMemo(() => (generators[config.type] ?? generateComponent)(config as never), [config]);
  const testCode = useMemo(() => (config.includeTests ? generateTestFile(config) : ''), [config]);
  const mainFilename = getFilename(config.componentName, config.useTypeScript, config.type);
  const testFilename = `${config.componentName}.test.${config.useTypeScript ? 'tsx' : 'jsx'}`;

  const handleTypeChange = (v: string) => { dispatch(updateConfig({ type: v as typeof config.type })); setActiveTab(0); };
  const handleNameChange = (v: string) => dispatch(updateConfig({ componentName: v.replace(/[^a-zA-Z0-9]/g, '') }));
  const handleAddProp = () => { if (!newProp.name.trim()) return; dispatch(addProp(newProp as PropDefinition)); setNewProp({ name: '', type: 'string', required: true, defaultValue: '' }); };
  const handleRemoveProp = (i: number) => dispatch(removeProp(i));
  const handleToggleFeature = (f: string) => dispatch(toggleFeature(f));
  const handleReset = () => { dispatch(resetConfig()); setActiveTab(0); setNewProp({ name: '', type: 'string', required: true, defaultValue: '' }); };
  const handleCopyAll = async () => { await navigator.clipboard.writeText(activeTab === 1 && config.includeTests ? testCode : generatedCode); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const handleTabChange = (_: SyntheticEvent, v: number) => setActiveTab(v);

  return { config, copied, activeTab, newProp, setNewProp, generatedCode, testCode, mainFilename, testFilename, handleTypeChange, handleNameChange, handleAddProp, handleRemoveProp, handleToggleFeature, handleReset, handleCopyAll, handleTabChange, dispatch };
}
