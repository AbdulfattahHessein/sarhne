export interface ApiResponse<T = null> {
  data: T;
  isSuccess: boolean;
  message: string;
  errors: { [key: string]: string[] };
  paginator: Paginator;
}

export interface Paginator {
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
