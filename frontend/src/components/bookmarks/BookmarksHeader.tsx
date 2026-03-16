'use client';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';

interface BookmarksHeaderProps {
  count: number;
}

export default function BookmarksHeader({ count }: BookmarksHeaderProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
      <Box>
        <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
          Your Bookmarks
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Pages you&apos;ve saved for quick access. Bookmark any page using the bookmark icon.
        </Typography>
      </Box>
      <Chip label={`${count} saved`} color="primary" />
    </Box>
  );
}
