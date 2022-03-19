import { errorResponse } from '../utils/globalResponses';
import { NextFunction, Request, Response } from 'express';

const errorMiddleware = (
  error: any | unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const status: number = error.status || 500;
    const errorMessage: string = error.message || '!Oops something went wrong';

    console.log(error.message, new Error(error).stack, {
      status: error.status,
      url: req.url,
    });

    console.log(`error: `, error);

    return errorResponse(res, errorMessage, status);
  } catch (error: any) {
    return errorResponse(res, error.message);
  }
};

export default errorMiddleware;
