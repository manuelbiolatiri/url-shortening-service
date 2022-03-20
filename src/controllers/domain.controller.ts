import { errorResponse, successResponse } from './../utils/globalResponses';
import { Request, Response, NextFunction } from 'express';
import domainService from '../services/domain.service';

class DomainController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      //gen short url

      const domain = await domainService.create({
        ...req.body,
        shortUrl: 'qwertyuiop.io',
      });
      return successResponse(res, domain);
    } catch (error) {
      console.log(error);
      return errorResponse(res);
    }
  }
}

export default new DomainController();
