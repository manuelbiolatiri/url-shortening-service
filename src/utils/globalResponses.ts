import { Response } from 'express';

export const successResponse = (
  res: Response,
  data: { [key: string]: any },
  code = 200,
) => {
  return res.status(code).json({ data });
};

export const errorResponse = (
  res: Response,
  error = 'Oops. An Error Occurred',
  code = 500,
) => {
  return res.status(code).json({ error: error });
};
