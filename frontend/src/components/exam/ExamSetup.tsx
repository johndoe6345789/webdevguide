'use client';

import History from '@mui/icons-material/History';
import PlayArrow from '@mui/icons-material/PlayArrow';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import BookmarkButton from '@/components/common/BookmarkButton';
import ExamHistory from '@/components/exam/ExamHistory';
import ExamInfoCards from '@/components/exam/ExamInfoCards';
import ExamSetupStats from '@/components/exam/ExamSetupStats';
import { useExamSetup } from '@/hooks/useExamSetup';

interface ExamSetupProps { onStart: () => void }

export default function ExamSetup({ onStart }: ExamSetupProps) {
  const { history, bestScore, avgScore } = useExamSetup();
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box>
          <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>Web Development Exam</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600 }}>
            Test your web development knowledge with a timed, randomized exam. Each attempt draws 30 questions at random from the question bank. You need 70% to pass.
          </Typography>
        </Box>
        <BookmarkButton title="Web Development Exam" path="/exam" section="Exam" />
      </Box>
      <ExamInfoCards />
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Button variant="contained" size="large" startIcon={<PlayArrow />} onClick={onStart} sx={{ px: 6, py: 1.5, fontSize: '1.1rem' }}>Start Exam</Button>
      </Box>
      {history.length > 0 && (
        <>
          <Divider sx={{ mb: 4 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
            <History color="action" />
            <Typography variant="h5" fontWeight={600}>Exam History</Typography>
          </Box>
          <ExamSetupStats totalAttempts={history.length} bestScore={bestScore} avgScore={avgScore} />
          <ExamHistory history={history} bestScore={bestScore} />
        </>
      )}
    </>
  );
}
