import { createCustomAPIError } from "../errors/customAPIerror.js";
import jwt from "jsonwebtoken";
async function authenticationMiddleware(req, res, next) {
  //validate token
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    next(
      createCustomAPIError("Authentication Invalid please login again", 401)
    );
    
  }
  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = { username: decoded.userName };
    next();
  } catch (error) {
    next(error);
  }
}
export default authenticationMiddleware;
