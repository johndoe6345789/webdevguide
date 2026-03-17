'use client';

import { useTranslations } from 'next-intl';
import CodeIcon from '@mui/icons-material/Code';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import useHeader from '@/hooks/useHeader';
import useSearch from '@/hooks/useSearch';
import { Link } from '@/i18n/navigation';
import DesktopNav from './DesktopNav';
import MobileDrawer from './MobileDrawer';
import SearchDialog from './SearchDialog';
import ThemeToggle from './ThemeToggle';

const logoSx = { display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none', color: 'inherit', flexGrow: { xs: 1, md: 0 }, mr: { md: 3 } }; const drawerSx = { display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 } }; const menuBtnSx = { mr: 2, display: { md: 'none' } };

export default function Header() {
  const h = useHeader(); const s = useSearch();
  const t = useTranslations('nav'); const tS = useTranslations('search');
  return (<>
    <AppBar position="sticky" color="default" elevation={0}>
      <Toolbar>
        <IconButton color="inherit" edge="start" aria-label="open menu" onClick={h.handleDrawerToggle} sx={menuBtnSx}><MenuIcon /></IconButton>
        <Box component={Link} href="/" sx={logoSx}>
          <CodeIcon color="primary" />
          <Typography variant="h6" component="span" fontWeight={700} noWrap>{t('brandName')}</Typography>
        </Box>
        <DesktopNav t={t} moreAnchor={h.moreAnchor}
          onMoreOpen={h.handleMoreOpen}
          onMoreClose={h.handleMoreClose} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Tooltip title={tS('tooltip')}><IconButton color="inherit" onClick={s.handleOpen} aria-label={tS('tooltip')}><SearchIcon /></IconButton></Tooltip>
          <ThemeToggle />
        </Box>
      </Toolbar>
    </AppBar>
    <SearchDialog search={s} />
    <Drawer variant="temporary" open={h.mobileOpen} onClose={h.handleDrawerToggle} ModalProps={{ keepMounted: true }} sx={drawerSx}><MobileDrawer onClose={h.handleDrawerToggle} /></Drawer>
  </>);
}
