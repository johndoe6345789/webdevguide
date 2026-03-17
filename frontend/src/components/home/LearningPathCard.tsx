'use client';

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from '@/i18n/navigation';
import type { PathStep } from './learningPathData';

interface Props {
  step: PathStep;
  t: (key: string) => string;
}

export default function LearningPathCard({ step, t }: Props) {
  return (
    <Card
      sx={{
        flex: 1,
        borderTop: `4px solid ${step.color}`,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
      }}
    >
      <CardActionArea component={Link} href={step.href} sx={{ height: '100%' }}>
        <CardContent sx={{ p: 3 }}>
          <Typography
            variant="h3"
            component="span"
            fontWeight={800}
            sx={{ color: step.color, opacity: 0.25, lineHeight: 1 }}
          >
            {step.number}
          </Typography>
          <Typography variant="subtitle1" fontWeight={700} sx={{ mt: 1 }}>
            {t(step.titleKey)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t(step.descKey)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
