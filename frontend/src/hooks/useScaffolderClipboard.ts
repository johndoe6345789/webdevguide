'use client';

import { useCallback, useState } from 'react';
import type { GeneratedFile } from '@/lib/scaffolder';

export default function useScaffolderClipboard(
  generatedFiles: GeneratedFile[],
) {
  const [copied, setCopied] = useState<
    string | null
  >(null);

  const handleCopyFile = useCallback(
    async (path: string) => {
      const file = generatedFiles.find(
        (f) => f.path === path,
      );
      if (file) {
        await navigator.clipboard.writeText(
          file.content,
        );
        setCopied(path);
        setTimeout(
          () => setCopied(null), 2000,
        );
      }
    }, [generatedFiles],
  );

  const handleCopyAll = useCallback(async () => {
    const allContent = generatedFiles
      .map(
        (f) =>
          `// ===== ${f.path} =====\n${f.content}`,
      )
      .join('\n\n');
    await navigator.clipboard.writeText(allContent);
    setCopied('__all__');
    setTimeout(() => setCopied(null), 2000);
  }, [generatedFiles]);

  return { copied, handleCopyFile, handleCopyAll };
}
