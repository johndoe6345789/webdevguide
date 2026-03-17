import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { examApi } from '@/lib/apiClient';

export interface ExamQuestion {
  id: string;
  text: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  explanation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface ExamAttempt {
  id: string;
  startedAt: string;
  completedAt: string;
  score: number;
  total: number;
  percentage: number;
  passed: boolean;
  answers: Record<string, string>;
  categoryBreakdown: Record<string, { correct: number; total: number }>;
}

interface ActiveExam {
  questions: ExamQuestion[];
  currentIndex: number;
  answers: Record<string, string>;
  startedAt: string;
  timeLimit: number;
}

interface ExamState {
  questionBank: ExamQuestion[];
  activeExam: ActiveExam | null;
  result: ExamAttempt | null;
  history: ExamAttempt[];
  reviewMode: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: ExamState = {
  questionBank: [],
  activeExam: null,
  result: null,
  history: [],
  reviewMode: false,
  loading: false,
  error: null,
};

export const fetchExamQuestions = createAsyncThunk(
  'exam/fetchQuestions',
  async (count: number = 30) => {
    const { data } = await examApi.getRandomQuestions(count);
    return data;
  }
);

const examSlice = createSlice({
  name: 'exam',
  initialState,
  reducers: {
    startExam(
      state,
      action: PayloadAction<{
        questions: ExamQuestion[];
        timeLimit: number;
      }>,
    ) {
      state.activeExam = {
        questions: action.payload.questions,
        currentIndex: 0,
        answers: {},
        startedAt: new Date().toISOString(),
        timeLimit: action.payload.timeLimit,
      };
      state.result = null;
      state.reviewMode = false;
    },
    setAnswer(
      state,
      action: PayloadAction<{
        questionId: string; optionId: string;
      }>,
    ) {
      if (state.activeExam) {
        state.activeExam.answers[
          action.payload.questionId
        ] = action.payload.optionId;
      }
    },
    nextQuestion(state) {
      if (
        state.activeExam
        && state.activeExam.currentIndex
          < state.activeExam.questions.length - 1
      ) {
        state.activeExam.currentIndex += 1;
      }
    },
    previousQuestion(state) {
      if (
        state.activeExam
        && state.activeExam.currentIndex > 0
      ) {
        state.activeExam.currentIndex -= 1;
      }
    },
    goToQuestion(state, action: PayloadAction<number>) {
      if (
        state.activeExam
        && action.payload >= 0
        && action.payload
          < state.activeExam.questions.length
      ) {
        state.activeExam.currentIndex = action.payload;
      }
    },
    submitExam(state) {
      if (!state.activeExam) return;
      const { questions, answers, startedAt } = state.activeExam;
      let correct = 0;
      const categoryBreakdown: Record<
        string, { correct: number; total: number }
      > = {};

      questions.forEach((q) => {
        if (!categoryBreakdown[q.category]) {
          categoryBreakdown[q.category] = { correct: 0, total: 0 };
        }
        categoryBreakdown[q.category].total += 1;
        if (answers[q.id] === q.correctOptionId) {
          correct += 1;
          categoryBreakdown[q.category].correct += 1;
        }
      });

      const percentage = Math.round((correct / questions.length) * 100);
      const attempt: ExamAttempt = {
        id: `exam-${Date.now()}`,
        startedAt,
        completedAt: new Date().toISOString(),
        score: correct,
        total: questions.length,
        percentage,
        passed: percentage >= 70,
        answers,
        categoryBreakdown,
      };

      state.result = attempt;
      state.history.unshift(attempt);
      if (state.history.length > 20) state.history.pop();
      state.reviewMode = false;
    },
    enterReviewMode(state) {
      state.reviewMode = true;
      if (state.activeExam) {
        state.activeExam.currentIndex = 0;
      }
    },
    resetExam(state) {
      state.activeExam = null;
      state.result = null;
      state.reviewMode = false;
    },
    clearHistory(state) {
      state.history = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExamQuestions.pending, (s) => {
        s.loading = true; s.error = null;
      })
      .addCase(fetchExamQuestions.fulfilled,
        (s, action) => {
          s.loading = false;
          s.questionBank = action.payload;
        })
      .addCase(fetchExamQuestions.rejected,
        (s, action) => {
          s.loading = false;
          s.error = action.error.message
            ?? 'Failed to load questions';
        });
  },
});

export const {
  startExam,
  setAnswer,
  nextQuestion,
  previousQuestion,
  goToQuestion,
  submitExam,
  enterReviewMode,
  resetExam,
  clearHistory,
} = examSlice.actions;
export default examSlice.reducer;
