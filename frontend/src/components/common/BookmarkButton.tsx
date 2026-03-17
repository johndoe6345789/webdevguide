'use client';

import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addBookmark, removeBookmark } from '@/store/slices/bookmarkSlice';

interface BookmarkButtonProps {
  title: string;
  path: string;
  section: string;
}

export default function BookmarkButton(
  { title, path, section }: BookmarkButtonProps,
) {
  const dispatch = useAppDispatch();
  const bookmarks = useAppSelector((state) => state.bookmarks.items);
  const existing = bookmarks.find((b) => b.path === path);

  const handleToggle = () => {
    if (existing) {
      dispatch(removeBookmark(existing.id));
    } else {
      dispatch(addBookmark({ title, path, section, notes: '' }));
    }
  };

  return (
    <Tooltip title={existing ? 'Remove bookmark' : 'Bookmark this page'}>
      <IconButton onClick={handleToggle} color={existing ? 'primary' : 'default'}>
        {existing ? <BookmarkIcon /> : <BookmarkBorderIcon />}
      </IconButton>
    </Tooltip>
  );
}
