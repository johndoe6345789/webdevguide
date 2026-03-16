import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

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

interface GeneratorState {
  config: GeneratorConfig;
}

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
  },
});

export const { updateConfig, addProp, removeProp, toggleFeature, resetConfig } = generatorSlice.actions;
export default generatorSlice.reducer;
