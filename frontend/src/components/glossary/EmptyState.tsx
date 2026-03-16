import MenuBookIcon from '@mui/icons-material/MenuBook';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function EmptyState() {
  return (
    <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'action.hover' }}>
      <MenuBookIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
      <Typography variant="h6" gutterBottom>No Terms Found</Typography>
      <Typography variant="body2" color="text.secondary">
        Try a different search or select a different category.
      </Typography>
    </Paper>
  );
}
