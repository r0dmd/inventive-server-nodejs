import type { Schema } from "joi";
import { CustomError } from "./generateErrorUtil";

// Validates incoming data against a Joi schema. On validation failure, wraps the Joi error in a CustomError with HTTP 400 status, for consistent error structure across the app.
const validateSchemaUtil = async (
  schema: Schema,
  data: unknown,
): Promise<void> => {
  try {
    await schema.validateAsync(data);
  } catch (err) {
    // NOTE: TS types the 'catch' variable as 'unknown' by default because JS allows throwing any value (not just Error objects). We use a type assertion here to tell TS that 'err' is an Error instance, so we can safely access 'message'.
    // Alternatively, we could declare `const message = err instanceof Error ? err.message : "Unknown validation error";` and then pass `message` directly
    throw new CustomError((err as Error).message, 400);
  }
};

export default validateSchemaUtil;
