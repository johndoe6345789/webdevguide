'use client';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import BookmarkButton from '@/components/common/BookmarkButton';

export default function GlossaryHeader() {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
        <Box>
          <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
            Web Development Glossary
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 700 }}>
            Every technical term explained in plain English. No jargon, no assumptions. Use the search
            to find what you need, or browse by category.
          </Typography>
        </Box>
        <BookmarkButton title="Glossary" path="/glossary" section="Reference" />
      </Box>
      <Alert severity="info" sx={{ mb: 3 }}>
        Hover or tap on{' '}
        <Box component="span" sx={{ borderBottom: '1px dashed', borderColor: 'primary.main', color: 'primary.main' }}>
          dotted-underlined terms
        </Box>{' '}
        throughout the guide for instant definitions. This glossary has the full list.
      </Alert>
    </>
  );
}
