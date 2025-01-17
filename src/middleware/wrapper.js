/**
 * Wrap around controller functions to catch API Errors more easily.
 * @param {(req, res, next) => void | Promise<void>} wrappedFunction Controller function.
 * @returns
 */
export const controllerWrapper = (wrappedFunction) => {
  return async (req, res, next) => {
    try {
      await wrappedFunction(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
