export type Subject = {
  _id: string;
  name: string;
  icon: string;
  createdAt: string;
};

type SubjectsMetadata = {
  currentPage: number;
  numberOfPages: number;
  limit: number;
};

export type SubjectsData = {
  metadata: SubjectsMetadata;
  subjects: Subject[];
};
