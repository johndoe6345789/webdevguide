import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  ProjectDomain, FrameworkOption, StylingOption,
  StateOption, AuthOption, DatabaseOption,
} from '@/lib/scaffolder/types';

export interface PropDefinition {
  name: string;
  type: string;
  required: boolean;
  defaultValue: string;
}

export interface GeneratorConfig {
  type: 'component' | 'page' | 'api-route' | 'layout' | 'form' | 'hook';
  componentName: string;
  useTypeScript: boolean;
  useMui: boolean;
  useRedux: boolean;
  includeTests: boolean;
  props: PropDefinition[];
  features: string[];
}

export interface ScaffolderConfig {
  step: 'domain' | 'configure' | 'output';
  domain: ProjectDomain | null;
  projectName: string;
  framework: FrameworkOption;
  styling: StylingOption;
  stateManagement: StateOption;
  auth: AuthOption;
  database: DatabaseOption;
  features: string[];
  selectedFile: string | null;
}

interface GeneratorState {
  config: GeneratorConfig;
  scaffolder: ScaffolderConfig;
  activeMode: 'quick' | 'scaffolder';
}

const initialScaffolder: ScaffolderConfig = {
  step: 'domain',
  domain: null,
  projectName: 'my-project',
  framework: 'nextjs',
  styling: 'mui',
  stateManagement: 'redux-toolkit',
  auth: 'none',
  database: 'postgresql',
  features: [],
  selectedFile: null,
};

const initialState: GeneratorState = {
  config: {
    type: 'component',
    componentName: 'MyComponent',
    useTypeScript: true,
    useMui: true,
    useRedux: false,
    includeTests: false,
    props: [],
    features: [],
  },
  scaffolder: initialScaffolder,
  activeMode: 'quick',
};

const generatorSlice = createSlice({
  name: 'generator',
  initialState,
  reducers: {
    updateConfig(state, action: PayloadAction<Partial<GeneratorConfig>>) {
      state.config = { ...state.config, ...action.payload };
    },
    addProp(state, action: PayloadAction<PropDefinition>) {
      state.config.props.push(action.payload);
    },
    removeProp(state, action: PayloadAction<number>) {
      state.config.props.splice(action.payload, 1);
    },
    toggleFeature(state, action: PayloadAction<string>) {
      const idx = state.config.features.indexOf(action.payload);
      if (idx >= 0) {
        state.config.features.splice(idx, 1);
      } else {
        state.config.features.push(action.payload);
      }
    },
    resetConfig() {
      return initialState;
    },
    setActiveMode(state, action: PayloadAction<'quick' | 'scaffolder'>) {
      state.activeMode = action.payload;
    },
    updateScaffolder(state, action: PayloadAction<Partial<ScaffolderConfig>>) {
      state.scaffolder = { ...state.scaffolder, ...action.payload };
    },
    setScaffolderDomain(state, action: PayloadAction<ProjectDomain>) {
      state.scaffolder.domain = action.payload;
      state.scaffolder.step = 'configure';
      state.scaffolder.features = [];
    },
    toggleScaffolderFeature(state, action: PayloadAction<string>) {
      const idx = state.scaffolder.features.indexOf(action.payload);
      if (idx >= 0) {
        state.scaffolder.features.splice(idx, 1);
      } else {
        state.scaffolder.features.push(action.payload);
      }
    },
    setScaffolderStep(state, action: PayloadAction<ScaffolderConfig['step']>) {
      state.scaffolder.step = action.payload;
    },
    selectScaffolderFile(state, action: PayloadAction<string | null>) {
      state.scaffolder.selectedFile = action.payload;
    },
    resetScaffolder(state) {
      state.scaffolder = initialScaffolder;
    },
  },
});

export const {
  updateConfig, addProp, removeProp, toggleFeature, resetConfig,
  setActiveMode, updateScaffolder, setScaffolderDomain,
  toggleScaffolderFeature, setScaffolderStep, selectScaffolderFile,
  resetScaffolder,
} = generatorSlice.actions;
export default generatorSlice.reducer;
