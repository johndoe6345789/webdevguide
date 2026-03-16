'use client';

import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import BuildIcon from '@mui/icons-material/Build';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import QuizIcon from '@mui/icons-material/Quiz';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import WebIcon from '@mui/icons-material/Web';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import FeatureCard from './FeatureCard';

const FEATURES = [
  { icon: MenuBookIcon, titleKey: 'featureLearnTitle', descKey: 'featureLearnDescription' },
  { icon: BuildIcon, titleKey: 'featureCodeTitle', descKey: 'featureCodeDescription' },
  { icon: SmartToyIcon, titleKey: 'featureAITitle', descKey: 'featureAIDescription' },
  { icon: QuizIcon, titleKey: 'featureExamTitle', descKey: 'featureExamDescription' },
  { icon: WebIcon, titleKey: 'featureExamplesTitle', descKey: 'featureExamplesDescription' },
  { icon: AutoStoriesIcon, titleKey: 'featureGlossaryTitle', descKey: 'featureGlossaryDescription' },
] as const;

interface Props {
  t: (key: string) => string;
}

export default function FeaturesGrid({ t }: Props) {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      <Typography variant="h4" component="h2" textAlign="center" fontWeight={600} gutterBottom sx={{ mb: 6 }}>
        {t('featuresHeading')}
      </Typography>
      <Grid container spacing={4}>
        {FEATURES.map(({ icon, titleKey, descKey }) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={titleKey}>
            <FeatureCard icon={icon} title={t(titleKey)} description={t(descKey)} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
