export class AppError extends Error {
    name: string;
    httpCode: number;
  
    constructor(name: string, description: string, httpCode: number) {
      super(description);
  
      this.name = name;
      this.httpCode = httpCode;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  