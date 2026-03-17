'use client';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CodeBlock from '@/components/common/CodeBlock';
import type {
  PreviewProps,
} from './generatorTypes';
import PreviewTabBar from './PreviewTabBar';
import SummaryChips from './SummaryChips';

export default function GeneratedCodePreview(
  p: PreviewProps,
) {
  const lang = p.config.useTypeScript
    ? 'tsx' : 'jsx';
  return (
    <Card variant="outlined">
      <CardContent>
        <PreviewTabBar
          activeTab={p.activeTab}
          mainFilename={p.mainFilename}
          testFilename={p.testFilename}
          showTest={p.config.includeTests}
          copied={p.copied}
          onTabChange={p.onTabChange}
          onCopy={p.onCopy}
        />
        {p.activeTab === 0 && (
          <CodeBlock
            language={lang}
            filename={p.mainFilename}
            code={p.generatedCode}
          />
        )}
        {p.activeTab === 1
          && p.config.includeTests && (
          <CodeBlock
            language={lang}
            filename={p.testFilename}
            code={p.testCode}
          />
        )}
        <SummaryChips config={p.config} />
      </CardContent>
    </Card>
  );
}
