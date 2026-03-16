import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { glossaryApi } from '@/lib/apiClient';
import type { GlossaryTerm } from '@/types/guide';

interface GlossaryState {
  terms: GlossaryTerm[];
  categories: string[];
  searchResults: GlossaryTerm[];
  loading: boolean;
  error: string | null;
}

const initialState: GlossaryState = {
  terms: [],
  categories: [],
  searchResults: [],
  loading: false,
  error: null,
};

export const fetchGlossaryTerms = createAsyncThunk(
  'glossary/fetchTerms',
  async (category?: string) => {
    const { data } = await glossaryApi.getTerms(category);
    return data;
  }
);

export const fetchGlossaryCategories = createAsyncThunk(
  'glossary/fetchCategories',
  async () => {
    const { data } = await glossaryApi.getCategories();
    return data.map((c) => c.category);
  }
);

export const searchGlossary = createAsyncThunk(
  'glossary/search',
  async (query: string) => {
    const { data } = await glossaryApi.search(query);
    return data;
  }
);

const glossarySlice = createSlice({
  name: 'glossary',
  initialState,
  reducers: {
    clearSearch(state) {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGlossaryTerms.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchGlossaryTerms.fulfilled, (state, action) => { state.loading = false; state.terms = action.payload; })
      .addCase(fetchGlossaryTerms.rejected, (state, action) => { state.loading = false; state.error = action.error.message ?? 'Failed to load terms'; })
      .addCase(fetchGlossaryCategories.fulfilled, (state, action) => { state.categories = action.payload; })
      .addCase(searchGlossary.fulfilled, (state, action) => { state.searchResults = action.payload; });
  },
});

export const { clearSearch } = glossarySlice.actions;
export default glossarySlice.reducer;
