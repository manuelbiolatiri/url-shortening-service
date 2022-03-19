import { errorResponse } from './../utils/globalResponses';
import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';

const validationMiddleware = (
  type: any,
  value: string | 'body' | 'query' | 'params' = 'body',
  skipMissingProperties = false,
): RequestHandler => {
  return (req, res, next) => {
    validate(plainToInstance(type, req[value]), { skipMissingProperties }).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          const message = errors
            .map((error: ValidationError) => Object.values(error.constraints))
            .join(', ');
          return errorResponse(res, message, 400);
        } else {
          return next();
        }
      },
    );
  };
};

export default validationMiddleware;

// import { errorResponse } from '../utils/globalResponses';
// import dotenv from 'dotenv';
// import { NextFunction, Request, Response } from 'express';
// // import httpStatus from 'http-status';
// import Joi from 'joi';
// dotenv.config();

// // loshortng validator
// const shortSchema = Joi.object().keys({
//   url: Joi.string().uri().required(),
// });

// const short = async (req: Request, res: Response, next: NextFunction) => {
//   const { error } = await shortSchema.validateAsync(req.body);
//   if (error) {
//     return errorResponse(
//       res,
//       error.details[0].message.replace(/['"]/g, ''),
//       400,
//     );
//   }

//   return next();
// };

// // long validator

// const longSchema = Joi.object().keys({
//   url: Joi.string().required(),
// });

// const long = async (req: Request, res: Response, next: NextFunction) => {
//   const { error } = await longSchema.validateAsync(req.body);
//   if (error) {
//     return errorResponse(
//       res,
//       error.details[0].message.replace(/['"]/g, ''),
//       400,
//     );
//   }

//   return next();
// };

// export default { short, long };
