'use client';

import { useTranslations } from 'next-intl';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import type { PropDefinition } from '@/store/slices/generatorSlice';
import AddPropForm from './AddPropForm';
import PropListItem from './PropListItem';

interface NewProp {
  name: string; type: string;
  required: boolean; defaultValue: string;
}
interface Props {
  props: PropDefinition[];
  newProp: NewProp;
  setNewProp: (p: NewProp) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

export default function PropsEditor({
  props, newProp, setNewProp, onAdd, onRemove,
}: Props) {
  const t = useTranslations('generator');
  return (
    <>
      <Divider />
      <Box>
        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>{t('props')}</Typography>
        {props.length > 0 && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
            {props.map((prop, idx) => (
              <PropListItem key={`${prop.name}-${idx}`} prop={prop} onRemove={() => onRemove(idx)} />
            ))}
          </Box>
        )}
        <AddPropForm newProp={newProp} setNewProp={setNewProp} onAdd={onAdd} />
      </Box>
    </>
  );
}
