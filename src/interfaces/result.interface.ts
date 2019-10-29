export interface IResult<T> {
  statusCode?: number;
  message?: string | T;
  data?: T;
  error?: T;
  token?: string;
}
