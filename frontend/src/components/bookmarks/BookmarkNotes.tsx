'use client';

import { useTranslations } from 'next-intl';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

interface BookmarkNotesProps {
  notes: string;
  editing: boolean;
  noteText: string;
  setNoteText: (v: string) => void;
  handleSave: () => void;
  handleCancel: () => void;
  startEditing: () => void;
}

export default function BookmarkNotes(
  { notes, editing, noteText, setNoteText,
    handleSave, handleCancel, startEditing }:
  BookmarkNotesProps,
) {
  const t = useTranslations('bookmarks');
  if (editing) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <TextField multiline rows={3} value={noteText} onChange={(e) => setNoteText(e.target.value)} placeholder={t('addNotesPlaceholder')} size="small" fullWidth />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button size="small" variant="contained" startIcon={<SaveIcon />} onClick={handleSave}>{t('save')}</Button>
          <Button size="small" onClick={handleCancel}>{t('cancel')}</Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      {notes ? (
        <Box>
          <Typography variant="caption" color="text.secondary" fontWeight={600}>{t('yourNotes')}</Typography>
          <Typography variant="body2" sx={{ mt: 0.5, whiteSpace: 'pre-wrap' }}>{notes}</Typography>
        </Box>
      ) : (
        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>{t('noNotesYet')}</Typography>
      )}
      <Button size="small" startIcon={<EditIcon />} onClick={startEditing} sx={{ mt: 1 }}>{notes ? t('editNotes') : t('addNotes')}</Button>
    </Box>
  );
}
