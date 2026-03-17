import ApiIcon from '@mui/icons-material/Api';
import ArticleIcon from '@mui/icons-material/Article';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

export const DomainIconMap: Record<string, React.ReactNode> = {
  Person: <PersonIcon sx={{ fontSize: 40 }} />,
  Article: <ArticleIcon sx={{ fontSize: 40 }} />,
  ShoppingCart: <ShoppingCartIcon sx={{ fontSize: 40 }} />,
  People: <PeopleIcon sx={{ fontSize: 40 }} />,
  Dashboard: <DashboardIcon sx={{ fontSize: 40 }} />,
  PlayCircle: <PlayCircleIcon sx={{ fontSize: 40 }} />,
  SportsEsports: <SportsEsportsIcon sx={{ fontSize: 40 }} />,
  Api: <ApiIcon sx={{ fontSize: 40 }} />,
};
