'use client';

import { useMemo, Children, isValidElement, cloneElement, type ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Chip from '@mui/material/Chip';
import MuiLink from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useGlossaryTerms } from '@/components/common/GlossaryProvider';
import type { Components } from 'react-markdown';
import type { TypographyProps } from '@mui/material/Typography';
import type { GlossaryTerm } from '@/types/guide';

interface MarkdownProps {
  children: string;
  variant?: TypographyProps['variant'];
  color?: TypographyProps['color'];
}

// ── Glossary tooltip card ─────────────────────────────────────────

function GlossaryTooltip({ entry, children }: { entry: GlossaryTerm; children: ReactNode }) {
  const { termMap } = useGlossaryTerms();

  // Build numbered glossary list: the hovered term + all its related terms
  const glossaryItems: { term: string; definition: string }[] = [
    { term: entry.term, definition: entry.definition },
  ];
  for (const rt of (entry.relatedTerms ?? [])) {
    const related = termMap.get(rt.toLowerCase());
    if (related) {
      glossaryItems.push({ term: related.term, definition: related.definition });
    }
  }

  // Collect all links from this term and its related terms
  const allLinks = [...(entry.links ?? [])];
  for (const rt of (entry.relatedTerms ?? [])) {
    const related = termMap.get(rt.toLowerCase());
    if (related?.links) {
      for (const link of related.links) {
        if (!allLinks.some(l => l.url === link.url)) allLinks.push(link);
      }
    }
  }

  const content = (
    <>
      <div className="glossary-tip-body">
        <span className="glossary-tip-header">
          <span className="glossary-tip-term">{entry.term}</span>
          <Chip label={entry.category} size="small" variant="outlined" className="glossary-tip-category" />
        </span>
        {entry.example && (
          <span className="glossary-tip-example">{entry.example}</span>
        )}
        <ol className="glossary-tip-list">
          {glossaryItems.map((item, i) => (
            <li key={i} className="glossary-tip-list-item">
              <strong>{item.term}</strong> — {item.definition}
            </li>
          ))}
        </ol>
      </div>
      {allLinks.length > 0 && (
        <div className="glossary-tip-footer">
          <span className="glossary-tip-bookmarks-label">Bookmarks</span>
          <div className="glossary-tip-bookmarks">
            {allLinks.map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="glossary-tip-bookmarks-item">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );

  return (
    <Tooltip
      title={content}
      arrow
      enterDelay={200}
      leaveDelay={300}
      placement="top"
      classes={{ tooltip: 'glossary-tooltip' }}
      slotProps={{ popper: { modifiers: [{ name: 'preventOverflow', options: { boundary: 'viewport' } }] } }}
    >
      <MuiLink
        href={`/glossary#${encodeURIComponent(entry.term)}`}
        underline="none"
        className="glossary-link"
      >
        {children}
      </MuiLink>
    </Tooltip>
  );
}

// ── Glossary term highlighting ────────────────────────────────────

/**
 * Build a regex that matches any glossary term as a whole word.
 * Sorted longest-first so "Virtual DOM" matches before "DOM".
 */
function buildTermRegex(terms: GlossaryTerm[]): RegExp | null {
  if (terms.length === 0) return null;
  const escaped = terms
    .map((t) => t.term)
    .sort((a, b) => b.length - a.length)
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  return new RegExp(`\\b(${escaped.join('|')})\\b`, 'gi');
}

/**
 * Walk a React node tree and wrap glossary term matches inside text
 * strings with Tooltip + Link.  Leaves non-text nodes untouched.
 */
function injectTooltips(
  node: ReactNode,
  regex: RegExp,
  termMap: Map<string, GlossaryTerm>,
  seen: Set<string>,
): ReactNode {
  if (typeof node === 'string') {
    const parts: ReactNode[] = [];
    let last = 0;
    // Reset regex state for each string
    regex.lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(node)) !== null) {
      const term = match[0];
      const key = term.toLowerCase();
      // Only tooltip the first occurrence per render
      if (seen.has(key)) continue;
      seen.add(key);

      const entry = termMap.get(key);
      if (!entry) continue;

      if (match.index > last) {
        parts.push(node.slice(last, match.index));
      }
      parts.push(
        <GlossaryTooltip key={`${key}-${match.index}`} entry={entry}>
          {term}
        </GlossaryTooltip>,
      );
      last = match.index + term.length;
    }
    if (parts.length === 0) return node;
    if (last < node.length) parts.push(node.slice(last));
    return <>{parts}</>;
  }

  if (Array.isArray(node)) {
    return node.map((child, i) => (
      <span key={i}>{injectTooltips(child, regex, termMap, seen)}</span>
    ));
  }

  if (isValidElement(node)) {
    // Don't inject into code spans or links (already interactive)
    const tag = typeof node.type === 'string' ? node.type : '';
    if (tag === 'code' || tag === 'a') return node;

    const props = node.props as { children?: ReactNode };
    if (props.children) {
      return cloneElement(node, {}, ...Children.map(props.children, (child) =>
        injectTooltips(child, regex, termMap, seen),
      ) ?? []);
    }
  }

  return node;
}

// ── Component overrides for react-markdown ────────────────────────

const baseComponents: Components = {
  p: ({ children }) => (
    <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1, '&:last-child': { mb: 0 } }}>
      {children}
    </Typography>
  ),
  a: ({ href, children }) => (
    <MuiLink href={href ?? '#'} target="_blank" rel="noopener noreferrer">
      {children}
    </MuiLink>
  ),
  strong: ({ children }) => <strong>{children}</strong>,
  em: ({ children }) => <em>{children}</em>,
  code: ({ children, className }) => {
    if (className) return <code className={className}>{children}</code>;
    return (
      <code
        style={{
          backgroundColor: 'rgba(127,127,127,0.12)',
          borderRadius: 4,
          padding: '2px 6px',
          fontSize: '0.875em',
          fontFamily: 'monospace',
        }}
      >
        {children}
      </code>
    );
  },
};

// ── Markdown component ────────────────────────────────────────────

export default function Markdown({ children, variant, color }: MarkdownProps) {
  const { terms, termMap } = useGlossaryTerms();
  const regex = useMemo(() => buildTermRegex(terms), [terms]);

  const wrap = (node: ReactNode): ReactNode => {
    if (!regex) return node;
    const seen = new Set<string>();
    return injectTooltips(node, regex, termMap, seen);
  };

  // Build components that inject glossary tooltips into rendered text
  const components: Components = {
    ...baseComponents,
    p: ({ children: c }) => (
      <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 1, '&:last-child': { mb: 0 } }}>
        {wrap(c)}
      </Typography>
    ),
  };

  const inlineComponents: Components = {
    ...components,
    p: ({ children: c }) => <>{wrap(c)}</>,
  };

  if (variant || color) {
    return (
      <Typography variant={variant ?? 'body1'} color={color} sx={{ lineHeight: 1.8 }}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={inlineComponents}
          unwrapDisallowed
        >
          {children}
        </ReactMarkdown>
      </Typography>
    );
  }

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {children}
    </ReactMarkdown>
  );
}
