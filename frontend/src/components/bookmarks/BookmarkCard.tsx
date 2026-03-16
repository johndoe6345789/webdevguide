'use client';

import DeleteIcon from '@mui/icons-material/Delete';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useBookmarkCard } from '@/hooks/useBookmarkCard';
import { Link } from '@/i18n/navigation';
import BookmarkNotes from './BookmarkNotes';

interface BookmarkCardProps {
  id: string;
  title: string;
  path: string;
  section: string;
  addedAt: string;
  notes: string;
}

export default function BookmarkCard({ id, title, path, section, addedAt, notes }: BookmarkCardProps) {
  const card = useBookmarkCard(id, notes);
  const formattedDate = new Date(addedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
          <Box>
            <Typography variant="h6" fontWeight={600} gutterBottom>{title}</Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
              <Chip label={section} size="small" color="primary" variant="outlined" />
              <Chip label={`Saved ${formattedDate}`} size="small" variant="outlined" />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <IconButton size="small" component={Link} href={path} aria-label="Open page"><OpenInNewIcon fontSize="small" /></IconButton>
            <IconButton size="small" onClick={card.handleRemove} color="error" aria-label="Remove"><DeleteIcon fontSize="small" /></IconButton>
          </Box>
        </Box>
        <Divider sx={{ my: 1.5 }} />
        <BookmarkNotes {...card} notes={notes} />
      </CardContent>
    </Card>
  );
}
