import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import type { Reference } from '@/types/content';

interface ReferenceListProps {
  references: Reference[];
}

export default function ReferenceList({ references }: ReferenceListProps) {
  if (references.length === 0) return null;

  const sorted = [...references].sort((a, b) => {
    const cmp = a.authors.localeCompare(b.authors);
    return cmp !== 0 ? cmp : a.year.localeCompare(b.year);
  });

  return (
    <Box sx={{ mt: 4 }}>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="h5" fontWeight={700} gutterBottom>
        References
      </Typography>
      <Box component="ol" sx={{ pl: 3, '& li': { mb: 1.5 } }}>
        {sorted.map((ref) => (
          <li key={ref.id} id={`ref-${ref.id}`}>
            <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
              {ref.authors} ({ref.year}). <em>{ref.title}</em>. {ref.source}.
              {ref.url && (
                <>
                  {' '}Available at:{' '}
                  <Link href={ref.url} target="_blank" rel="noopener noreferrer">
                    {ref.url}
                  </Link>
                </>
              )}
            </Typography>
          </li>
        ))}
      </Box>
    </Box>
  );
}
