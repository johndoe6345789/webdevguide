'use client';

import Container from '@mui/material/Container';
import ExamResults from '@/components/exam/ExamResults';
import type { useExamPage } from '@/hooks/useExamPage';

type E = ReturnType<typeof useExamPage>;
interface Props {
  e: E;
  onRetake: () => void;
}

export default function ExamResultsView(
  { e, onRetake }: Props,
) {
  if (!e.result) return null;
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <ExamResults
        result={e.result}
        reviewMode={e.reviewMode}
        activeExam={e.activeExam}
        currentQuestion={e.currentQuestion}
        onGoTo={e.goTo}
        onPrev={e.prev}
        onNext={e.next}
        onReview={e.review}
        onRetake={onRetake}
        onBackToStart={e.backToStart}
      />
    </Container>
  );
}
