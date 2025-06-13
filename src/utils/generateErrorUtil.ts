// Function to generate and throw a custom error with a message and HTTP status code
const generateErrorUtil = (msg, code = 500) => {
  if (typeof code !== "number" || code < 100 || code > 599) {
    throw new Error("Invalid HTTP status code");
  }

  const err = new Error(msg);
  err.httpStatus = code;
  err.name = "CustomError"; // Optional custom name for better identification in debugging
  throw err;
};

export default generateErrorUtil;
