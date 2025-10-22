export interface AppErrorType extends Error {
  statusCode?: number;
}

export default class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}
