'use client';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import type { GeneratorConfig } from '@/store/slices/generatorSlice';
import ComponentNameField from './ComponentNameField';
import ComponentTypeSelect from './ComponentTypeSelect';
import FeatureCheckboxes from './FeatureCheckboxes';
import GeneratorActions from './GeneratorActions';
import OptionsToggles from './OptionsToggles';
import PropsEditor from './PropsEditor';

interface NewProp { name: string; type: string; required: boolean; defaultValue: string; }
interface Props {
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

export default function GeneratorForm(p: Props) {
  const showProps = p.config.type === 'component' || p.config.type === 'form';
  return (
    <Card variant="outlined" sx={{ position: 'sticky', top: 80 }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Typography variant="h6" fontWeight={700}>Configuration</Typography>
        <ComponentTypeSelect value={p.config.type} onChange={p.onTypeChange} />
        <ComponentNameField value={p.config.componentName} onChange={p.onNameChange} />
        <Divider />
        <OptionsToggles config={p.config} />
        {showProps && <PropsEditor props={p.config.props} newProp={p.newProp} setNewProp={p.setNewProp} onAdd={p.onAddProp} onRemove={p.onRemoveProp} />}
        {p.config.type === 'component' && <FeatureCheckboxes features={p.config.features} onToggle={p.onToggleFeature} />}
        <GeneratorActions onReset={p.onReset} />
      </CardContent>
    </Card>
  );
}
