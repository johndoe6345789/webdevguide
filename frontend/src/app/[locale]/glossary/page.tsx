'use client';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import EmptyState from '@/components/glossary/EmptyState';
import GlossaryHeader from '@/components/glossary/GlossaryHeader';
import GlossarySearch from '@/components/glossary/GlossarySearch';
import TermCard from '@/components/glossary/TermCard';
import { useGlossaryPage } from '@/hooks/useGlossaryPage';

export default function GlossaryPage() {
  const {
    searchText, setSearch, activeCategory, setActiveCategory,
    categories, filtered, totalCount, loading,
  } = useGlossaryPage();

  if (loading) return <LoadingSpinner message="Loading glossary..." />;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <GlossaryHeader />
      <GlossarySearch
        search={searchText} onSearchChange={setSearch}
        categories={categories} activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <Divider sx={{ mb: 3 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          {filtered.length} term{filtered.length !== 1 ? 's' : ''} found
        </Typography>
        <Chip label={`${totalCount} total terms`} size="small" variant="outlined" />
      </Box>
      {filtered.length === 0 ? <EmptyState /> : (
        <Grid container spacing={3}>
          {filtered.map((term) => (
            <Grid key={term.term} size={{ xs: 12, sm: 6, md: 4 }}>
              <TermCard {...term} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
