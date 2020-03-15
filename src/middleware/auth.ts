import jwt, { Secret } from "jsonwebtoken";
import APIResponse from "../objects/APIResponse";

function auth(req: any, res: any, next: any) {
  const token = req.header("x-auth-token");

  let response: APIResponse = new APIResponse();

  // Check for token
  if (!token) {
    response.message = `No token, authorization denied.`;
    return res.status(401).json(response);
  }

  try {
    // Verify token
    const decoded = jwt.verify(
      token as string,
      process.env.JWT_SECRET as Secret
    );

    // Add user from payload
    req.user = decoded as string;
    next();
  } catch (error) {
    response.message = `Token is not valid.`;
    res.status(400).json(response);
  }
}

export default auth;
