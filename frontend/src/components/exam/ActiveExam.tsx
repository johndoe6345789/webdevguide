'use client';

import Box from '@mui/material/Box';
import ConfirmSubmitAlert from '@/components/exam/ConfirmSubmitAlert';
import ExamNavigation from '@/components/exam/ExamNavigation';
import ExamProgress from '@/components/exam/ExamProgress';
import ExamTimer from '@/components/exam/ExamTimer';
import QuestionCard from '@/components/exam/QuestionCard';
import type { ExamQuestion } from '@/store/slices/examSlice';

interface ActiveExamProps {
  questions: ExamQuestion[];
  currentIndex: number;
  answers: Record<string, string>;
  currentQuestion: ExamQuestion;
  answeredCount: number;
  timeRemaining: number;
  showConfirmSubmit: boolean;
  onAnswer: (optionId: string) => void;
  onTimeUp: () => void;
  onGoTo: (i: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
  onConfirmSubmit: () => void;
  onCancelSubmit: () => void;
}

export default function ActiveExam(p: ActiveExamProps) {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2, mb: 1 }}>
        <Box sx={{ flex: 1 }}>
          <ExamProgress current={p.currentIndex + 1} total={p.questions.length} answered={p.answeredCount} />
        </Box>
        <ExamTimer timeRemaining={p.timeRemaining} onTimeUp={p.onTimeUp} />
      </Box>
      <QuestionCard question={p.currentQuestion} questionNumber={p.currentIndex + 1} selectedOptionId={p.answers[p.currentQuestion.id]} onSelectOption={p.onAnswer} />
      <ExamNavigation questions={p.questions} currentIndex={p.currentIndex} answers={p.answers} onGoTo={p.onGoTo} onPrev={p.onPrev} onNext={p.onNext} onSubmit={p.onSubmit} />
      {p.showConfirmSubmit && (
        <ConfirmSubmitAlert answeredCount={p.answeredCount} totalCount={p.questions.length} onCancel={p.onCancelSubmit} onConfirm={p.onConfirmSubmit} />
      )}
    </>
  );
}
