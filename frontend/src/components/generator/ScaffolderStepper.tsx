'use client';

import { useTranslations } from 'next-intl';
import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';

interface Props {
  activeStepIndex: number;
}

export default function ScaffolderStepper({ activeStepIndex }: Props) {
  const t = useTranslations('generator');
  const steps = [t('chooseDomain'), t('configureProject'), t('generatedOutput')];
  return (
    <Box sx={{ mb: 4 }}>
      <Stepper activeStep={activeStepIndex} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
