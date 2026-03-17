'use client';

import { useTranslations } from 'next-intl';
import Grid from '@mui/material/Grid2';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Link } from '@/i18n/navigation';
import { FOOTER_GROUPS } from './footerData';

export default function FooterLinks() {
  const tNav = useTranslations('nav');
  const tCommon = useTranslations('common');

  return (
    <>
      {FOOTER_GROUPS.map(({ titleKey, links }) => (
        <Grid key={titleKey} size={{ xs: 12, sm: 3 }}>
          <Typography variant="subtitle2" fontWeight={700} gutterBottom>{tCommon(titleKey)}</Typography>
          {links.map(({ labelKey, href }) => (
            <MuiLink key={href} component={Link} href={href} color="text.secondary" underline="hover" variant="body2" display="block" sx={{ mb: 0.5 }}>
              {tNav(labelKey)}
            </MuiLink>
          ))}
        </Grid>
      ))}
    </>
  );
}
