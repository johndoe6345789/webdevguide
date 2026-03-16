import Grid from '@mui/material/Grid2';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Link } from '@/i18n/navigation';

interface LinkGroup {
  title: string;
  links: { label: string; href: string }[];
}

const GROUPS: LinkGroup[] = [
  { title: 'Learn', links: [
    { label: 'Getting Started', href: '/getting-started' },
    { label: 'Fundamentals', href: '/fundamentals' },
    { label: 'Examples', href: '/examples' },
    { label: 'Features', href: '/features' },
  ]},
  { title: 'Tools', links: [
    { label: 'Code Generator', href: '/code-generator' },
    { label: 'Exam', href: '/exam' },
    { label: 'Glossary', href: '/glossary' },
    { label: 'Progress', href: '/progress' },
  ]},
  { title: 'More Topics', links: [
    { label: 'AI Development', href: '/ai-development' },
    { label: 'Lua Engine', href: '/lua-engine' },
    { label: 'Backend Guide', href: '/backend-guide' },
    { label: 'Docker Guide', href: '/docker-guide' },
  ]},
];

export default function FooterLinks() {
  return (
    <>
      {GROUPS.map(({ title, links }) => (
        <Grid key={title} size={{ xs: 12, sm: 3 }}>
          <Typography variant="subtitle2" fontWeight={700} gutterBottom>{title}</Typography>
          {links.map(({ label, href }) => (
            <MuiLink key={href} component={Link} href={href} color="text.secondary" underline="hover" variant="body2" display="block" sx={{ mb: 0.5 }}>{label}</MuiLink>
          ))}
        </Grid>
      ))}
    </>
  );
}
