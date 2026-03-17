'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import CompletionBar from '@/components/progress/CompletionBar';
import ProgressHeader from '@/components/progress/ProgressHeader';
import RecentExams from '@/components/progress/RecentExams';
import ResetButton from '@/components/progress/ResetButton';
import SectionChecklist from '@/components/progress/SectionChecklist';
import StatsGrid from '@/components/progress/StatsGrid';
import { useProgressPage } from '@/hooks/useProgressPage';

export default function ProgressPage() {
  const p = useProgressPage();
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <ProgressHeader />
      <StatsGrid
        sectionsCompleted={
          p.completedSections.length
        }
        totalSections={p.allSections.length}
        chaptersVisited={
          p.chaptersVisited.length
        }
        examsTaken={p.examHistory.length}
        bestExam={p.bestExamScore}
        avgExam={p.avgExamScore}
        timeMinutes={p.timeMinutes}
      />
      <CompletionBar
        percent={p.completionPercent} />
      <SectionChecklist
        sections={p.allSections}
        completedIds={p.completedSections}
      />
      <RecentExams history={p.examHistory} />
      <Divider sx={{ my: 3 }} />
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
      }}>
        <ResetButton
          showReset={p.showReset}
          setShowReset={p.setShowReset}
          onReset={p.handleReset}
        />
      </Box>
    </Container>
  );
}
