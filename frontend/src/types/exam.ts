export interface QuestionOption {
  id: string;
  text: string;
}

export interface ExamQuestion {
  id: string;
  text: string;
  options: QuestionOption[];
  correctOptionId: string;
  explanation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}
