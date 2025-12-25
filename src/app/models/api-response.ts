export interface ApiResponse<T> {
  data?: T;
  message: string;
  errors?: { [key: string]: string[] };
}
