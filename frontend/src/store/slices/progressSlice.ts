import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ProgressState {
  completedSections: string[];
  readingProgress: Record<string, number>;
  chaptersVisited: string[];
  totalTimeSpent: number;
}

const initialState: ProgressState = {
  completedSections: [],
  readingProgress: {},
  chaptersVisited: [],
  totalTimeSpent: 0,
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    markSectionComplete(state, action: PayloadAction<string>) {
      if (!state.completedSections.includes(action.payload)) {
        state.completedSections.push(action.payload);
      }
    },
    updateReadingProgress(state, action: PayloadAction<{ sectionId: string; progress: number }>) {
      state.readingProgress[action.payload.sectionId] = Math.max(
        state.readingProgress[action.payload.sectionId] || 0,
        action.payload.progress
      );
    },
    visitChapter(state, action: PayloadAction<string>) {
      if (!state.chaptersVisited.includes(action.payload)) {
        state.chaptersVisited.push(action.payload);
      }
    },
    addTimeSpent(state, action: PayloadAction<number>) {
      state.totalTimeSpent += action.payload;
    },
    resetProgress() {
      return initialState;
    },
  },
});

export const {
  markSectionComplete,
  updateReadingProgress,
  visitChapter,
  addTimeSpent,
  resetProgress,
} = progressSlice.actions;
export default progressSlice.reducer;
