import Box from '@mui/material/Box';
import CodeBlock from '@/components/common/CodeBlock';
import Markdown from '@/components/common/Markdown';
import type { CodeBlock as CodeBlockType } from '@/types/content';

export default function CodeBlockRenderer(
  { code, language, filename, description }:
  CodeBlockType,
) {
  return (
    <Box>
      {description && (
        <Markdown variant="body2" color="text.secondary">{description}</Markdown>
      )}
      <CodeBlock code={code} language={language} filename={filename} />
    </Box>
  );
}
