'use client';

import BookmarkIcon from '@mui/icons-material/Bookmark';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Link } from '@/i18n/navigation';

export default function BookmarkEmptyState() {
  return (
    <Paper sx={{ p: 6, textAlign: 'center', bgcolor: 'action.hover' }}>
      <BookmarkIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
      <Typography variant="h5" gutterBottom>No Bookmarks Yet</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 500, mx: 'auto' }}>
        Browse the guide and bookmark pages you want to come back to!
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Button component={Link} href="/getting-started" variant="contained">Getting Started</Button>
        <Button component={Link} href="/fundamentals" variant="outlined">Fundamentals</Button>
        <Button component={Link} href="/examples" variant="outlined">Examples</Button>
      </Box>
    </Paper>
  );
}
