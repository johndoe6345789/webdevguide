'use client';

import Container from '@mui/material/Container';
import ActiveExam from '@/components/exam/ActiveExam';
import type { useExamPage } from '@/hooks/useExamPage';

type E = ReturnType<typeof useExamPage>;
interface Props {
  e: E;
}

export default function ExamActiveView(
  { e }: Props,
) {
  if (!e.activeExam || !e.currentQuestion) {
    return null;
  }
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <ActiveExam
        questions={e.activeExam.questions}
        currentIndex={e.activeExam.currentIndex}
        answers={e.activeExam.answers}
        currentQuestion={e.currentQuestion}
        answeredCount={e.answeredCount}
        timeRemaining={e.timeRemaining}
        showConfirmSubmit={e.showConfirmSubmit}
        onAnswer={(id) =>
          e.answer(e.currentQuestion!.id, id)
        }
        onTimeUp={e.submit}
        onGoTo={e.goTo}
        onPrev={e.prev}
        onNext={e.next}
        onSubmit={() =>
          e.setShowConfirmSubmit(true)
        }
        onConfirmSubmit={e.submit}
        onCancelSubmit={() =>
          e.setShowConfirmSubmit(false)
        }
      />
    </Container>
  );
}
