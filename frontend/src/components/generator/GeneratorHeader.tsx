'use client';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import BookmarkButton from '@/components/common/BookmarkButton';

export default function GeneratorHeader() {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
        <Box>
          <Typography variant="h3" component="h1" fontWeight={800} gutterBottom>
            Code Generator
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            Configure your component, page, or hook and see the generated React code update in
            real time. Copy and paste into your project to get started fast.
          </Typography>
        </Box>
        <BookmarkButton title="Code Generator" path="/code-generator" section="Tools" />
      </Box>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 4 }}>
        <Chip label="Interactive Tool" color="primary" size="small" />
        <Chip label="Real-time Preview" size="small" variant="outlined" />
        <Chip label="Copy & Paste" size="small" variant="outlined" />
      </Box>
      <Divider sx={{ mb: 4 }} />
      <Alert severity="info" sx={{ mb: 4 }}>
        <strong>How it works:</strong> Choose a type, set a name, toggle options, and add props.
        The code on the right updates instantly. Click &quot;Copy All&quot; to copy the generated
        code to your clipboard.
      </Alert>
    </>
  );
}
