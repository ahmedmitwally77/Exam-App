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

export type SubmitExamAnswer = {
  questionId: string;
  correct: string;
};

export type SubmitExamPayload = {
  answers: SubmitExamAnswer[];
  time: number;
};

export type WrongQuestion = {
  QID: string;
  Question: string;
  inCorrectAnswer: string;
  correctAnswer: string;
  answers: Record<string, unknown>;
};

export type CorrectQuestion = {
  QID: string;
  Question: string;
  correctAnswer: string;
  answers: Record<string, unknown>;
};

export type ExamResultData = {
  message: string;
  correct: number;
  wrong: number;
  total: string;
  WrongQuestions: WrongQuestion[];
  correctQuestions: CorrectQuestion[];
};

export type ExamResultResponse = ApiResponse<ExamResultData>;
