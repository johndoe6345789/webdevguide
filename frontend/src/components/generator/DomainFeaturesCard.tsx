'use client';

import { useTranslations } from 'next-intl';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';

interface Feature { key: string; label: string; }
interface Props {
  domainLabel: string;
  features: Feature[];
  selectedFeatures: string[];
  onToggleFeature: (feature: string) => void;
}

export default function DomainFeaturesCard({
  domainLabel, features, selectedFeatures,
  onToggleFeature,
}: Props) {
  const t = useTranslations('generator');
  return (
    <Card variant="outlined" sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} gutterBottom>{t('domainFeatures')}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {t('domainFeaturesForProject', { domain: domainLabel.toLowerCase() })}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {features.map((feat) => (
            <FormControlLabel key={feat.key}
              control={<Checkbox checked={selectedFeatures.includes(feat.key)} onChange={() => onToggleFeature(feat.key)} size="small" />}
              label={<Typography variant="body2">{feat.label}</Typography>}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
