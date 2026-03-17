'use client';

import Box from '@mui/material/Box';
import ConfirmSubmitAlert from '@/components/exam/ConfirmSubmitAlert';
import ExamNavigation from '@/components/exam/ExamNavigation';
import ExamProgress from '@/components/exam/ExamProgress';
import ExamTimer from '@/components/exam/ExamTimer';
import QuestionCard from '@/components/exam/QuestionCard';
import type { ExamQuestion } from '@/store/slices/examSlice';

type F = () => void;
interface Props {
  questions: ExamQuestion[];
  currentIndex: number;
  answers: Record<string, string>;
  currentQuestion: ExamQuestion;
  answeredCount: number;
  timeRemaining: number;
  showConfirmSubmit: boolean;
  onAnswer: (id: string) => void;
  onTimeUp: F; onGoTo: (i: number) => void;
  onPrev: F; onNext: F; onSubmit: F;
  onConfirmSubmit: F; onCancelSubmit: F;
}
export default function ActiveExam(p: Props) {
  const { currentIndex: ci, currentQuestion: q,
    questions: qs, answers: a } = p;
  const sx = { display: 'flex', gap: 2, mb: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start' };
  return (<>
    <Box sx={sx}>
      <Box sx={{ flex: 1 }}>
        <ExamProgress current={ci + 1}
          total={qs.length}
          answered={p.answeredCount} />
      </Box>
      <ExamTimer timeRemaining={p.timeRemaining}
        onTimeUp={p.onTimeUp} />
    </Box>
    <QuestionCard question={q} questionNumber={ci + 1}
      selectedOptionId={a[q.id]}
      onSelectOption={p.onAnswer} />
    <ExamNavigation questions={qs} currentIndex={ci}
      answers={a} onGoTo={p.onGoTo} onPrev={p.onPrev}
      onNext={p.onNext} onSubmit={p.onSubmit} />
    {p.showConfirmSubmit && <ConfirmSubmitAlert
      answeredCount={p.answeredCount}
      totalCount={qs.length} onCancel={p.onCancelSubmit}
      onConfirm={p.onConfirmSubmit} />}
  </>);
}
