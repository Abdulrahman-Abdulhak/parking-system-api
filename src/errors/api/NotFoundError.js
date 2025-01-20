import CustomApiError from "./CustomApiError.js";

export default class NotFoundError extends CustomApiError {
  constructor(msg) {
    super(msg, 404);
  }
}
