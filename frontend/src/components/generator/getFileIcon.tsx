import CodeIcon from '@mui/icons-material/Code';
import DataObjectIcon from '@mui/icons-material/DataObject';
import DescriptionIcon from '@mui/icons-material/Description';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import SettingsIcon from '@mui/icons-material/Settings';

export default function getFileIcon(name: string) {
  if (name.endsWith('.tsx') || name.endsWith('.jsx')) return <CodeIcon fontSize="small" color="primary" />;
  if (name.endsWith('.ts') || name.endsWith('.js')) return <DataObjectIcon fontSize="small" color="warning" />;
  if (name.endsWith('.json')) return <DataObjectIcon fontSize="small" color="success" />;
  if (name.endsWith('.md')) return <DescriptionIcon fontSize="small" color="info" />;
  if (name === 'Dockerfile' || name.startsWith('docker')) return <SettingsIcon fontSize="small" color="secondary" />;
  if (name.startsWith('.')) return <SettingsIcon fontSize="small" color="action" />;
  return <InsertDriveFileIcon fontSize="small" color="action" />;
}
