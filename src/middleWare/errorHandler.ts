import type { Request, Response, NextFunction } from "express";
import STATUS from "../constant/constant";

interface customError extends Error {
  statusCode?: number;
}

const errorHandler = (
  err: customError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || STATUS.INTERNAL_SERVER_ERROR;
  console.log(err.message);

  switch (statusCode) {
    case STATUS.BAD_REQUEST:
      res.status(STATUS.BAD_REQUEST).json({
        title: "Bad Request",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case STATUS.BAD_REQUEST:
      res.status(STATUS.BAD_REQUEST).json({
        title: "Bad Request",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case STATUS.UNAUTHORIZED:
      res.status(STATUS.UNAUTHORIZED).json({
        title: "Unauthorized Request",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case STATUS.FORBIDDEN:
      res.status(STATUS.FORBIDDEN).json({
        title: "Forbidden Request",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case STATUS.NOT_FOUND:
      res.status(STATUS.NOT_FOUND).json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case STATUS.CONFLICT:
      res.status(STATUS.CONFLICT).json({
        title: "Conflicting  Resources",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    default:
      res.status(STATUS.INTERNAL_SERVER_ERROR).json({
        title: "Something went wrong",
        message: err.message,
        stackTrace: err.stack,
      });
  }
};


export default errorHandler