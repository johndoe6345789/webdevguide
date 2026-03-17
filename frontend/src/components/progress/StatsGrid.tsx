import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import QuizIcon from '@mui/icons-material/Quiz';
import SchoolIcon from '@mui/icons-material/School';
import TimerIcon from '@mui/icons-material/Timer';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import Grid from '@mui/material/Grid2';
import StatCard from './StatCard';

interface StatsGridProps {
  sectionsCompleted: number;
  totalSections: number;
  chaptersVisited: number;
  examsTaken: number;
  bestExam: number;
  avgExam: number;
  timeMinutes: number;
}

export default function StatsGrid(
  { sectionsCompleted, totalSections,
    chaptersVisited, examsTaken,
    bestExam, avgExam, timeMinutes }: StatsGridProps,
) {
  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid size={{ xs: 6, sm: 4, md: 2 }}><StatCard icon={<CheckCircleIcon sx={{ fontSize: 36 }} />} label="Sections Done" value={`${sectionsCompleted}/${totalSections}`} /></Grid>
      <Grid size={{ xs: 6, sm: 4, md: 2 }}><StatCard icon={<SchoolIcon sx={{ fontSize: 36 }} />} label="Chapters Visited" value={chaptersVisited} /></Grid>
      <Grid size={{ xs: 6, sm: 4, md: 2 }}><StatCard icon={<QuizIcon sx={{ fontSize: 36 }} />} label="Exams Taken" value={examsTaken} /></Grid>
      <Grid size={{ xs: 6, sm: 4, md: 2 }}><StatCard icon={<EmojiEventsIcon sx={{ fontSize: 36 }} />} label="Best Exam" value={bestExam ? `${bestExam}%` : '-'} color={bestExam >= 70 ? 'success.main' : 'primary.main'} /></Grid>
      <Grid size={{ xs: 6, sm: 4, md: 2 }}><StatCard icon={<TrendingUpIcon sx={{ fontSize: 36 }} />} label="Avg Exam" value={avgExam ? `${avgExam}%` : '-'} /></Grid>
      <Grid size={{ xs: 6, sm: 4, md: 2 }}><StatCard icon={<TimerIcon sx={{ fontSize: 36 }} />} label="Time Spent" value={timeMinutes > 0 ? `${timeMinutes}m` : '-'} /></Grid>
    </Grid>
  );
}
