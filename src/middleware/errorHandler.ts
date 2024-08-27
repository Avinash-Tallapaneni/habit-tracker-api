import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import statusCodes from "../utils/statusCodes";

const ErrorHandler = (
  err: Error | ZodError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.error("Error", err.stack);

  // Default Error values
  const errorStatusCode =
    req.statusCode || statusCodes.INTERNAL_SERVER_ERROR.code;
  const errorMessage = err.message || "Something went wrong";
  const errorStack = process.env.NODE_ENV === "production" ? {} : err.stack;

  //checking if its a zod validator error

  if (err instanceof ZodError) {
    return res.status(statusCodes.BAD_REQUEST.code).json({
      success: false,
      message: "Invalid input data",
      errors: err.errors.map((issue) => ({
        path: issue.path,
        message: issue.message,
      })),
    });
  }

  //default error handler

  return res.status(errorStatusCode).json({
    success: false,
    message: errorMessage,
    stack: errorStack,
  });
};

export default ErrorHandler;
