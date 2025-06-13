// NOTE: CustomError extends the built-in Error to include an HTTP status code. This makes error handling more expressive and type-safe throughout the app.
// 'public' by default
export class CustomError extends Error {
  httpStatus: number;

  constructor(message: string, httpStatus = 500) {
    super(message);
    this.name = "CustomError";
    this.httpStatus = httpStatus;
  }
}

// NOTE: This function always throws and never returns, so its return type is 'never'. 'void' would incorrectly imply it returns normally—'never' tells TypeScript it's unreachable.
export const generateErrorUtil = (msg: string, code = 500): never => {
  if (typeof code !== "number" || code < 100 || code > 599) {
    throw new Error("Invalid HTTP status code");
  }

  throw new CustomError(msg, code);
};
