'use client';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CodeBlock from '@/components/common/CodeBlock';
import type {
  ViewerProps,
} from './generatorTypes';
import ViewerEmptyState from './ViewerEmptyState';
import ViewerFileHeader from './ViewerFileHeader';

export default function MultiFileOutputViewer({
  selectedFile, copied, onCopyFile,
}: ViewerProps) {
  if (!selectedFile) {
    return <ViewerEmptyState />;
  }
  return (
    <Card variant="outlined">
      <CardContent>
        <ViewerFileHeader
          path={selectedFile.path}
          language={selectedFile.language}
          isCopied={
            copied === selectedFile.path
          }
          onCopy={() => onCopyFile(
            selectedFile.path,
          )}
        />
        <CodeBlock
          code={selectedFile.content}
          language={selectedFile.language}
          filename={selectedFile.path}
        />
      </CardContent>
    </Card>
  );
}
