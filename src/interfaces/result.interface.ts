export interface IResult<T> {
  code?: CodeNumber;
  statusCode?: number;
  message?: string | T;
  data?: T;
  error?: T;
  token?: string;
}

export enum CodeNumber {
  SUCCESS = 0,
  FAILED = 1,
}

export enum Kind {
  GENIUS = 'GENIUS',
  BOSS = 'BOSS',
}
