'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import BookmarkButton from '@/components/common/BookmarkButton';
import CompletionBar from '@/components/progress/CompletionBar';
import RecentExams from '@/components/progress/RecentExams';
import ResetButton from '@/components/progress/ResetButton';
import SectionChecklist from '@/components/progress/SectionChecklist';
import StatsGrid from '@/components/progress/StatsGrid';
import { useProgressPage } from '@/hooks/useProgressPage';

export default function ProgressPage() {
  const p = useProgressPage();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
        <Box>
          <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>Your Learning Progress</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>Track how far you&apos;ve come in your React web development journey.</Typography>
        </Box>
        <BookmarkButton title="Progress" path="/progress" section="Tools" />
      </Box>

      <StatsGrid sectionsCompleted={p.completedSections.length} totalSections={p.allSections.length} chaptersVisited={p.chaptersVisited.length} examsTaken={p.examHistory.length} bestExam={p.bestExamScore} avgExam={p.avgExamScore} timeMinutes={p.timeMinutes} />
      <CompletionBar percent={p.completionPercent} />
      <SectionChecklist sections={p.allSections} completedIds={p.completedSections} />
      <RecentExams history={p.examHistory} />

      <Divider sx={{ my: 3 }} />
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <ResetButton showReset={p.showReset} setShowReset={p.setShowReset} onReset={p.handleReset} />
      </Box>
    </Container>
  );
}
