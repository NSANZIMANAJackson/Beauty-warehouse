import { CustomAPIError } from "../errors/customAPIerror.js";

function errorHandlingMiddleware(err, req, res, next) {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  console.error("🔴 Unhandled Error:", err);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({ msg: message });
}

export default errorHandlingMiddleware;
