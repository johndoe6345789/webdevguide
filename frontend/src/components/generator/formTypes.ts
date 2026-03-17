import type { DomainInfo } from '@/lib/scaffolder/types';
import type {
  GeneratorConfig,
  ScaffolderConfig,
} from '@/store/slices/generatorSlice';
import type { NewProp } from './generatorTypes';

export type { DomainInfo };

export interface FormContentProps {
  config: GeneratorConfig;
  newProp: NewProp;
  setNewProp: (p: NewProp) => void;
  onTypeChange: (v: string) => void;
  onNameChange: (v: string) => void;
  onAddProp: () => void;
  onRemoveProp: (i: number) => void;
  onToggleFeature: (f: string) => void;
  onReset: () => void;
}

export interface ConfigFormProps {
  scaffolder: ScaffolderConfig;
  onUpdateConfig: (
    u: Record<string, string>,
  ) => void;
  onToggleFeature: (f: string) => void;
  onGenerate: () => void;
  onBack: () => void;
}
