import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Markdown from '@/components/common/Markdown';
import type { TextBlock } from '@/types/content';

export default function TextBlockRenderer(
  { heading, headingLevel, body }: TextBlock,
) {
  const variant = headingLevel === 2 ? 'h4' : headingLevel === 3 ? 'h5' : 'h6';

  return (
    <Box>
      {heading && (
        <Typography variant={variant} component={`h${headingLevel ?? 2}`} fontWeight={700} gutterBottom>
          {heading}
        </Typography>
      )}
      <Markdown>{body}</Markdown>
    </Box>
  );
}
