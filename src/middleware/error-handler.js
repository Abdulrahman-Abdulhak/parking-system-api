import { CustomApiError } from "../errors/index.js";

export const errorHandler = (error, req, res, next) => {
  if (error instanceof CustomApiError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  const statusCode = error.statusCode ?? 500;

  if (statusCode === 500) console.error(error);
  return res.status(statusCode).json({ error });
};
