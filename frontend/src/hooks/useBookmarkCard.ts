'use client';

import { useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { removeBookmark, updateBookmarkNotes } from '@/store/slices/bookmarkSlice';

export function useBookmarkCard(id: string, initialNotes: string) {
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState(false);
  const [noteText, setNoteText] = useState(initialNotes);

  const handleSave = () => { dispatch(updateBookmarkNotes({ id, notes: noteText })); setEditing(false); };
  const handleCancel = () => { setEditing(false); setNoteText(initialNotes); };
  const handleRemove = () => dispatch(removeBookmark(id));
  const startEditing = () => setEditing(true);

  return { editing, noteText, setNoteText, handleSave, handleCancel, handleRemove, startEditing };
}
