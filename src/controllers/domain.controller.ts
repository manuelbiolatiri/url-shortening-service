import { errorResponse, successResponse } from './../utils/globalResponses';
import { Request, Response } from 'express';
import domainService from '../services/domain.service';
import { RequestType } from '../enums/RequestType';

class DomainController {
  async createShortUrl(req: Request, res: Response) {
    try {
      const domain = await domainService.create({
        ...req.body,
        type: RequestType.SHORT,
      });

      return successResponse(res, { processedUrl: domain.processedUrl });
    } catch (error) {
      console.log(error);
      return errorResponse(res);
    }
  }

  async createLongUrl(req: Request, res: Response) {
    try {
      const domain = await domainService.create({
        ...req.body,
        type: RequestType.LONG,
      });

      return successResponse(res, { processedUrl: domain.processedUrl });
    } catch (error) {
      console.log(error);
      return errorResponse(res);
    }
  }
}

export default new DomainController();
