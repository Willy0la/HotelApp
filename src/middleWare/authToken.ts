import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import STATUS from "../constant/constant";


declare module 'express-serve-static-core' {
  interface Request {
    user?: string | jwt.JwtPayload; 
  }
}
const authToken = async (req: Request, res: Response, next: NextFunction) => {
try {
      const authHead = req.get("Authorization");

  if (!authHead || !authHead.startsWith("Bearer ")) {
    const error = new Error("Header not found ") as Error & {
      statusCode?: number | string;
    };
    error.statusCode = STATUS.UNAUTHORIZED;
   return  next(error);
  }

  const token = authHead.split(" ")[1]?.trim();

  if (!token) {
    const error = new Error("Token not provided ") as Error & {
      statusCode?: number | string;
    };
    error.statusCode = STATUS.UNAUTHORIZED;
    return next(error);
  }

  const decode = jwt.verify(token, process.env.ACCESS_TOKEN as string) as JwtPayload;

  if (!decode) {
    const error = new Error("Unable to decode user  ") as Error & {
      statusCode?: number | string;
    };
    error.statusCode = STATUS.UNAUTHORIZED;
    return next(error);
  }

  req.user = decode
 next()
} catch (error) {
     const customError = new Error(" Internal Server error ") as Error & {
      statusCode?: number | string;
}
customError.statusCode = STATUS.INTERNAL_SERVER_ERROR
    return next(customError);

}
};


export default authToken;