import CustomApiError from "./CustomApiError.js";

export default class UnauthorizedError extends CustomApiError {
  constructor() {
    super("User is unauthorized for this action", 401);
  }
}
