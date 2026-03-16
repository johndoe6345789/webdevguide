'use client';

import { useTranslations } from 'next-intl';
import CodeIcon from '@mui/icons-material/Code';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useHeader from '@/hooks/useHeader';
import { Link } from '@/i18n/navigation';
import DesktopNav from './DesktopNav';
import MobileDrawer from './MobileDrawer';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const h = useHeader();
  const t = useTranslations('nav');

  return (
    <>
      <AppBar position="sticky" color="default" elevation={0}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open menu" edge="start" onClick={h.handleDrawerToggle} sx={{ mr: 2, display: { md: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Box component={Link} href="/" sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none', color: 'inherit', flexGrow: { xs: 1, md: 0 }, mr: { md: 3 } }}>
            <CodeIcon color="primary" />
            <Typography variant="h6" component="span" fontWeight={700} noWrap>{'WebDev Guide'}</Typography>
          </Box>
          <DesktopNav t={t} moreAnchor={h.moreAnchor} onMoreOpen={h.handleMoreOpen} onMoreClose={h.handleMoreClose} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ThemeToggle />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="temporary" open={h.mobileOpen} onClose={h.handleDrawerToggle} ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 } }}>
        <MobileDrawer onClose={h.handleDrawerToggle} />
      </Drawer>
    </>
  );
}
