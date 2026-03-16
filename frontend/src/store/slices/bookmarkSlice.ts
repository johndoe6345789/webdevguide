import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Bookmark {
  id: string;
  title: string;
  path: string;
  section: string;
  addedAt: string;
  notes: string;
}

interface BookmarkState {
  items: Bookmark[];
}

const initialState: BookmarkState = {
  items: [],
};

const bookmarkSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    addBookmark(state, action: PayloadAction<Omit<Bookmark, 'id' | 'addedAt'>>) {
      const exists = state.items.some((b) => b.path === action.payload.path);
      if (!exists) {
        state.items.push({
          ...action.payload,
          id: `bm-${Date.now()}`,
          addedAt: new Date().toISOString(),
        });
      }
    },
    removeBookmark(state, action: PayloadAction<string>) {
      state.items = state.items.filter((b) => b.id !== action.payload);
    },
    updateBookmarkNotes(state, action: PayloadAction<{ id: string; notes: string }>) {
      const bookmark = state.items.find((b) => b.id === action.payload.id);
      if (bookmark) {
        bookmark.notes = action.payload.notes;
      }
    },
    clearBookmarks(state) {
      state.items = [];
    },
  },
});

export const { addBookmark, removeBookmark, updateBookmarkNotes, clearBookmarks } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
