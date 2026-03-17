'use client';

import { useState } from 'react';
import {
  EMPTY_PROP, makeHandlers,
} from '@/hooks/useGeneratorHandlers';
import { useGeneratorOutput } from '@/hooks/useGeneratorOutput';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export default function useCodeGenerator() {
  const dispatch = useAppDispatch();
  const config = useAppSelector(
    (s) => s.generator.config,
  );
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [newProp, setNewProp] = useState(EMPTY_PROP);
  const out = useGeneratorOutput(config);
  const h = makeHandlers(
    dispatch, config, setActiveTab, setNewProp,
  );

  const handleAddProp = () =>
    h.handleAddProp(newProp);
  const handleCopyAll = async () => {
    const text = activeTab === 1
      && config.includeTests
      ? out.testCode : out.generatedCode;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return {
    config, copied, activeTab, newProp,
    setNewProp, ...out,
    handleTypeChange: h.handleTypeChange,
    handleNameChange: h.handleNameChange,
    handleAddProp,
    handleRemoveProp: h.handleRemoveProp,
    handleToggleFeature: h.handleToggleFeature,
    handleReset: h.handleReset,
    handleCopyAll,
    handleTabChange: h.handleTabChange,
    dispatch,
  };
}
