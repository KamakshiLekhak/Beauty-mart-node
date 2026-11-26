export class HttpError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export class ConflictError extends HttpError {
  constructor(message: string) {
    super(409,message);
  }
}
