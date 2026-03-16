import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import type { ExamAttempt } from '@/store/slices/examSlice';

interface RecentExamsProps {
  history: ExamAttempt[];
}

export default function RecentExams({ history }: RecentExamsProps) {
  if (history.length === 0) return null;

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} gutterBottom>Recent Exam Results</Typography>
        {history.slice(0, 5).map((attempt, idx) => (
          <Box key={attempt.id} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1, borderBottom: idx < 4 ? 1 : 0, borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip label={`#${history.length - idx}`} size="small" variant="outlined" />
              <Typography variant="body2">{new Date(attempt.completedAt).toLocaleDateString()}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" fontWeight={600}>{attempt.score}/{attempt.total}</Typography>
              <Chip label={attempt.passed ? 'PASS' : 'FAIL'} size="small" color={attempt.passed ? 'success' : 'error'} />
            </Box>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}
