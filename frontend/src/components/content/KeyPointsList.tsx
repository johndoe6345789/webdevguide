import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface KeyPointsListProps {
  points: string[];
}

export default function KeyPointsList({ points }: KeyPointsListProps) {
  return (
    <Card variant="outlined" sx={{ bgcolor: 'action.hover' }}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} gutterBottom>Key Takeaways</Typography>
        {points.map((point, i) => (
          <Box key={i} sx={{ display: 'flex', gap: 1, alignItems: 'flex-start', mb: 1 }}>
            <CheckCircleOutlineIcon color="success" fontSize="small" sx={{ mt: 0.3 }} />
            <Typography variant="body2">{point}</Typography>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}
