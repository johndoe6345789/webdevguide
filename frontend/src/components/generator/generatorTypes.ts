import type { SyntheticEvent } from 'react';
import type {
  GeneratedFile,
} from '@/lib/scaffolder';
import type {
  GeneratorConfig,
  ScaffolderConfig,
} from '@/store/slices/generatorSlice';

export interface NewProp {
  name: string;
  type: string;
  required: boolean;
  defaultValue: string;
}

export interface AddPropFormProps {
  newProp: NewProp;
  onAdd: () => void;
  setNewProp: (p: NewProp) => void;
}

export interface PreviewProps {
  config: GeneratorConfig;
  generatedCode: string;
  testCode: string;
  mainFilename: string;
  testFilename: string;
  activeTab: number;
  copied: boolean;
  onTabChange: (
    _: SyntheticEvent, v: number,
  ) => void;
  onCopy: () => void;
}

export interface ViewerProps {
  selectedFile: GeneratedFile | null;
  copied: string | null;
  onCopyFile: (path: string) => void;
}

export interface SettingsCardProps {
  scaffolder: ScaffolderConfig;
  onUpdateConfig: (
    u: Record<string, string>,
  ) => void;
}
