import { errorResponse, successResponse } from './../utils/globalResponses';
import { Request, Response, NextFunction } from 'express';

class DomainController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      return successResponse(res, { req });
    } catch (error) {
      return errorResponse(res);
    }
  }
}

export default new DomainController();
