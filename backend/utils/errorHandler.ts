class ErrorHandler extends Error {
  statusCode: number;

  constructor(statusCode: number, errMessage: string) {
    super(errMessage);
    this.statusCode = statusCode;
  }
}

export default ErrorHandler;
