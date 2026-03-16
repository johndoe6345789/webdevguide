'use client';

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import { FEATURE_OPTIONS } from './constants';

interface Props {
  features: string[];
  onToggle: (feature: string) => void;
}

export default function FeatureCheckboxes({ features, onToggle }: Props) {
  return (
    <>
      <Divider />
      <Box>
        <Typography variant="subtitle2" fontWeight={600} sx={{ mb: 1 }}>Features</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {FEATURE_OPTIONS.map((feat) => (
            <FormControlLabel
              key={feat.key}
              control={
                <Checkbox checked={features.includes(feat.key)} onChange={() => onToggle(feat.key)} size="small" />
              }
              label={<Typography variant="body2">{feat.label}</Typography>}
            />
          ))}
        </Box>
      </Box>
    </>
  );
}
