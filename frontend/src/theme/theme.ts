import { createTheme, type Theme } from '@mui/material/styles';
import { getComponents } from './components';
import { getPalette } from './palette';
import { typography } from './typography';

export function getTheme(mode: 'light' | 'dark'): Theme {
  return createTheme({
    palette: getPalette(mode),
    typography,
    shape: { borderRadius: 12 },
    components: getComponents(mode),
  });
}
