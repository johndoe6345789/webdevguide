'use client';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import type {
  FormContentProps,
} from './formTypes';
import GeneratorFormContent from './GeneratorFormContent';

const stickySx = {
  position: 'sticky', top: 80,
};
const contentSx = {
  display: 'flex',
  flexDirection: 'column', gap: 3,
};

export default function GeneratorForm(
  p: FormContentProps,
) {
  return (
    <Card variant="outlined" sx={stickySx}>
      <CardContent sx={contentSx}>
        <GeneratorFormContent
          config={p.config}
          newProp={p.newProp}
          setNewProp={p.setNewProp}
          onTypeChange={p.onTypeChange}
          onNameChange={p.onNameChange}
          onAddProp={p.onAddProp}
          onRemoveProp={p.onRemoveProp}
          onToggleFeature={p.onToggleFeature}
          onReset={p.onReset}
        />
      </CardContent>
    </Card>
  );
}
