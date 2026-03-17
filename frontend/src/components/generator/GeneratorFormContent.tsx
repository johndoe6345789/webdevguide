'use client';
import { useTranslations } from 'next-intl';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ComponentNameField from './ComponentNameField';
import ComponentTypeSelect from './ComponentTypeSelect';
import FormPropsSection from './FormPropsSection';
import type {
  FormContentProps,
} from './formTypes';
import GeneratorActions from './GeneratorActions';
import OptionsToggles from './OptionsToggles';

export default function GeneratorFormContent(
  p: FormContentProps,
) {
  const t = useTranslations('generator');
  return (
    <>
      <Typography variant="h6" fontWeight={700}>
        {t('configuration')}
      </Typography>
      <ComponentTypeSelect
        value={p.config.type}
        onChange={p.onTypeChange}
      />
      <ComponentNameField
        value={p.config.componentName}
        onChange={p.onNameChange}
      />
      <Divider />
      <OptionsToggles config={p.config} />
      <FormPropsSection
        config={p.config}
        newProp={p.newProp}
        setNewProp={p.setNewProp}
        onAddProp={p.onAddProp}
        onRemoveProp={p.onRemoveProp}
        onToggleFeature={p.onToggleFeature}
      />
      <GeneratorActions
        onReset={p.onReset}
      />
    </>
  );
}
