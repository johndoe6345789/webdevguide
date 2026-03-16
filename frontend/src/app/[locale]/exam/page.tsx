'use client';

import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import ActiveExam from '@/components/exam/ActiveExam';
import ExamResults from '@/components/exam/ExamResults';
import ExamSetup from '@/components/exam/ExamSetup';
import { useExamPage } from '@/hooks/useExamPage';

export default function ExamPage() {
  const e = useExamPage();

  if (e.view === 'setup') {
    return <Container maxWidth="md" sx={{ py: 4 }}><ExamSetup onStart={e.launchExam} /></Container>;
  }
  if (e.view === 'results' && e.result) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <ExamResults result={e.result} reviewMode={e.reviewMode} activeExam={e.activeExam} currentQuestion={e.currentQuestion} onGoTo={e.goTo} onPrev={e.prev} onNext={e.next} onReview={e.review} onRetake={() => { e.retake(); e.launchExam(); }} onBackToStart={e.backToStart} />
      </Container>
    );
  }
  if (e.view === 'active' && e.activeExam && e.currentQuestion) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <ActiveExam questions={e.activeExam.questions} currentIndex={e.activeExam.currentIndex} answers={e.activeExam.answers} currentQuestion={e.currentQuestion} answeredCount={e.answeredCount} timeRemaining={e.timeRemaining} showConfirmSubmit={e.showConfirmSubmit} onAnswer={(id) => e.answer(e.currentQuestion!.id, id)} onTimeUp={e.submit} onGoTo={e.goTo} onPrev={e.prev} onNext={e.next} onSubmit={() => e.setShowConfirmSubmit(true)} onConfirmSubmit={e.submit} onCancelSubmit={() => e.setShowConfirmSubmit(false)} />
      </Container>
    );
  }
  return <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}><CircularProgress /></Container>;
}
