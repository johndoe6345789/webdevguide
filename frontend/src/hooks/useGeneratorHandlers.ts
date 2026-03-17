'use client';

import type { SyntheticEvent } from 'react';
import {
  updateConfig, addProp, removeProp,
  toggleFeature, resetConfig,
  type GeneratorConfig, type PropDefinition,
} from '@/store/slices/generatorSlice';
import type { AppDispatch } from '@/store/store';

export const EMPTY_PROP = {
  name: '', type: 'string',
  required: true, defaultValue: '',
};
type SetTab = (v: number) => void;
type SetProp = (v: typeof EMPTY_PROP) => void;

export function makeHandlers(
  d: AppDispatch, cfg: GeneratorConfig,
  setTab: SetTab, setProp: SetProp,
) {
  const handleTypeChange = (v: string) => {
    d(updateConfig({
      type: v as typeof cfg.type,
    }));
    setTab(0);
  };
  const handleNameChange = (v: string) =>
    d(updateConfig({
      componentName: v.replace(/[^a-zA-Z0-9]/g, ''),
    }));
  const handleAddProp = (p: typeof EMPTY_PROP) => {
    if (!p.name.trim()) return;
    d(addProp(p as PropDefinition));
    setProp(EMPTY_PROP);
  };
  const handleRemoveProp = (i: number) => d(removeProp(i));
  const handleToggleFeature = (f: string) =>
    d(toggleFeature(f));
  const handleReset = () => {
    d(resetConfig()); setTab(0);
    setProp(EMPTY_PROP);
  };
  const handleTabChange = (
    _: SyntheticEvent, v: number,
  ) => setTab(v);
  return {
    handleTypeChange, handleNameChange,
    handleAddProp, handleRemoveProp,
    handleToggleFeature, handleReset,
    handleTabChange,
  };
}
