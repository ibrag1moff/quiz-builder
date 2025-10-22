export type QuestionType = "INPUT" | "BOOLEAN" | "CHECKBOX";

interface Option {
  id: number;
  text: string;
  isCorrect: boolean;
  questionId: number;
}

interface Question {
  id: number;
  text: string;
  type: string;
  correctAnswer: string;
  quizId: number;
  createdAt: string;
  options: Option[];
}

export interface Quizz {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  questions: Question[];
}
