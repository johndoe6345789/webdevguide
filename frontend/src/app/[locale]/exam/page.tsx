'use client';

import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import ExamActiveView from '@/components/exam/ExamActiveView';
import ExamResultsView from '@/components/exam/ExamResultsView';
import ExamSetup from '@/components/exam/ExamSetup';
import { useExamPage } from '@/hooks/useExamPage';

export default function ExamPage() {
  const e = useExamPage();

  if (e.view === 'setup') {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <ExamSetup onStart={e.launchExam} />
      </Container>
    );
  }
  if (e.view === 'results') {
    return (
      <ExamResultsView e={e}
        onRetake={() => {
          e.retake(); e.launchExam();
        }} />
    );
  }
  if (e.view === 'active') {
    return <ExamActiveView e={e} />;
  }
  return (
    <Container maxWidth="md"
      sx={{ py: 8, textAlign: 'center' }}>
      <CircularProgress />
    </Container>
  );
}
