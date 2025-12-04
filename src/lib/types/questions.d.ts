export type Answer = {
  answer: string;
  key: string;
};

export type ExamInfo = {
  _id: string;
  title: string;
  duration: number;
  subject: string;
  numberOfQuestions: number;
  active: boolean;
  createdAt: string;
};

export type Question = {
  _id: string;
  question: string;
  answers: Answer[];
  type: string;
  correct: string;
  subject: string | null;
  exam: ExamInfo;
  createdAt: string;
};

export type QuestionsData = {
  questions: Question[];
};

export type QuestionsResponse = ApiResponse<QuestionsData>;
