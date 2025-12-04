export type Exam = {
  _id: string;
  title: string;
  duration: number;
  subject: string;
  numberOfQuestions: number;
  active: boolean;
  createdAt: string;
};

export type ExamsMetadata = {
  currentPage: number;
  numberOfPages: number;
  limit: number;
};

export type ExamsData = {
  metadata: ExamsMetadata;
  exams: Exam[];
};

export type ExamsResponse = ApiResponse<ExamsData>;
