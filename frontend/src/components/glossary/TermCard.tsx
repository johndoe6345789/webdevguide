'use client';

import { useTranslations } from 'next-intl';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import type { GlossaryTerm } from '@/types/guide';

export default function TermCard(
  { term, definition, category, relatedTerms, example }:
  GlossaryTerm,
) {
  const t = useTranslations('glossary');
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="h6" fontWeight={700}>{term}</Typography>
          <Chip label={category} size="small" variant="outlined" color="primary" />
        </Box>
        <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>{definition}</Typography>
        {example && (
          <Paper variant="outlined" sx={{ p: 1.5, mb: 2, bgcolor: 'action.hover' }}>
            <Typography variant="caption" fontWeight={600} color="text.secondary">{t('exampleLabel')}</Typography>
            <Typography variant="body2" sx={{ mt: 0.5, fontFamily: 'monospace' }}>{example}</Typography>
          </Paper>
        )}
        {relatedTerms.length > 0 && (
          <Box>
            <Typography variant="caption" color="text.secondary" fontWeight={600}>{t('relatedLabel')}{' '}</Typography>
            {relatedTerms.map((rt) => (
              <Chip key={rt} label={rt} size="small" sx={{ mr: 0.5, mb: 0.5 }} variant="outlined" />
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
