'use client';
import type {
  GeneratorConfig,
} from '@/store/slices/generatorSlice';
import FeatureCheckboxes from './FeatureCheckboxes';
import PropsEditor from './PropsEditor';

interface NewProp {
  name: string; type: string;
  required: boolean; defaultValue: string;
}
interface Props {
  config: GeneratorConfig;
  newProp: NewProp;
  setNewProp: (p: NewProp) => void;
  onAddProp: () => void;
  onRemoveProp: (i: number) => void;
  onToggleFeature: (f: string) => void;
}

export default function FormPropsSection(
  p: Props,
) {
  const showP = p.config.type === 'component'
    || p.config.type === 'form';
  return (
    <>
      {showP && (
        <PropsEditor
          props={p.config.props}
          newProp={p.newProp}
          setNewProp={p.setNewProp}
          onAdd={p.onAddProp}
          onRemove={p.onRemoveProp}
        />
      )}
      {p.config.type === 'component' && (
        <FeatureCheckboxes
          features={p.config.features}
          onToggle={p.onToggleFeature}
        />
      )}
    </>
  );
}
