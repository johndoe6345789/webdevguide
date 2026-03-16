'use client';

import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { removeBookmark, updateBookmarkNotes, clearBookmarks } from '@/store/slices/bookmarkSlice';

export function useBookmarksPage() {
  const dispatch = useAppDispatch();
  const bookmarks = useAppSelector((state) => state.bookmarks.items);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleRemove = (id: string) => dispatch(removeBookmark(id));
  const handleUpdateNotes = (id: string, notes: string) => dispatch(updateBookmarkNotes({ id, notes }));
  const handleClearAll = () => { dispatch(clearBookmarks()); setShowConfirm(false); };

  return { bookmarks, showConfirm, setShowConfirm, handleRemove, handleUpdateNotes, handleClearAll };
}
