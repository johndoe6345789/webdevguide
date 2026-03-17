import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { guideApi } from '@/lib/apiClient';
import type { NavItem } from '@/lib/apiClient';
import type { GuideSectionContent } from '@/types/content';
import type { GuideSection } from '@/types/guide';

interface GuideState {
  sections: GuideSection[];
  navigation: NavItem[];
  currentSection: GuideSectionContent | null;
  loading: boolean;
  error: string | null;
}

const initialState: GuideState = {
  sections: [],
  navigation: [],
  currentSection: null,
  loading: false,
  error: null,
};

export const fetchSections = createAsyncThunk('guide/fetchSections', async () => {
  const { data } = await guideApi.getSections();
  return data;
});

export const fetchNavigation = createAsyncThunk('guide/fetchNavigation', async () => {
  const { data } = await guideApi.getNavigation();
  return data;
});

export const fetchSectionBySlug = createAsyncThunk(
  'guide/fetchSectionBySlug',
  async (slug: string) => {
    const { data } = await guideApi.getSectionBySlug(slug);
    return data;
  }
);

const guideSlice = createSlice({
  name: 'guide',
  initialState,
  reducers: {
    clearCurrentSection(state) {
      state.currentSection = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSections.pending, (s) => {
        s.loading = true; s.error = null;
      })
      .addCase(fetchSections.fulfilled,
        (s, action) => {
          s.loading = false;
          s.sections = action.payload;
        })
      .addCase(fetchSections.rejected,
        (s, action) => {
          s.loading = false;
          s.error = action.error.message
            ?? 'Failed to load sections';
        })
      .addCase(fetchNavigation.fulfilled,
        (s, action) => {
          s.navigation = action.payload;
        })
      .addCase(fetchSectionBySlug.pending, (s) => {
        s.loading = true; s.error = null;
      })
      .addCase(fetchSectionBySlug.fulfilled,
        (s, action) => {
          s.loading = false;
          s.currentSection = action.payload;
        })
      .addCase(fetchSectionBySlug.rejected,
        (s, action) => {
          s.loading = false;
          s.error = action.error.message
            ?? 'Section not found';
        });
  },
});

export const { clearCurrentSection } = guideSlice.actions;
export default guideSlice.reducer;
