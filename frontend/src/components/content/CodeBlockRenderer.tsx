import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CodeBlock from '@/components/common/CodeBlock';
import type { CodeBlock as CodeBlockType } from '@/types/content';

export default function CodeBlockRenderer(
  { code, language, filename, description }:
  CodeBlockType,
) {
  return (
    <Box>
      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{description}</Typography>
      )}
      <CodeBlock code={code} language={language} filename={filename} />
    </Box>
  );
}
