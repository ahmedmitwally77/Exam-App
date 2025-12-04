declare type ErrorResponse = {
  message: string;
  code: number;
};

declare type SuccessResponse<T> = {
  message: string;
} & T;

declare type ApiResponse<T> = ErrorResponse | SuccessResponse<T>;

declare type SubjectsMetadata = {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number;
  prevPage?: number;
};
