'use client';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import BookmarkButton from '@/components/common/BookmarkButton';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import type { GuideSectionContent } from '@/types/content';
import KeyPointsList from './KeyPointsList';
import ReferenceList from './ReferenceList';
import SectionRenderer from './SectionRenderer';

interface GuidePageLayoutProps {
  section: GuideSectionContent | null;
  loading: boolean;
  error: string | null;
}

export default function GuidePageLayout(
  { section, loading, error }: GuidePageLayoutProps,
) {
  if (loading) return <LoadingSpinner message="Loading section..." />;
  if (error || !section) return <Container maxWidth="lg" sx={{ py: 4 }}><Typography color="error">{error ?? 'Section not found'}</Typography></Container>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography variant="h3" component="h1" fontWeight={700}>{section.title}</Typography>
            <Chip label={section.difficulty} size="small" color="primary" />
          </Box>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 700 }}>{section.description}</Typography>
        </Box>
        <BookmarkButton title={section.title} path={`/${section.slug}`} section="Guide" />
      </Box>

      <SectionRenderer blocks={section.blocks} />

      {section.keyPoints && section.keyPoints.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <KeyPointsList points={section.keyPoints} />
        </Box>
      )}

      {section.references && section.references.length > 0 && (
        <ReferenceList references={section.references} />
      )}
    </Container>
  );
}
