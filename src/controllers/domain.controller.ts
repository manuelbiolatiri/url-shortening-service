import { BASEURL } from './../utils/constants';
import { errorResponse, successResponse } from './../utils/globalResponses';
import { Request, Response } from 'express';
import domainService from '../services/domain.service';
import { RequestType } from '../enums/RequestType';
class DomainController {
  async createShortUrl(req: Request, res: Response) {
    try {
      const domain = await domainService.getOrCreate({
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
      const domain = await domainService.getOrCreate({
        ...req.body,
        type: RequestType.LONG,
      });

      return successResponse(res, { processedUrl: domain.processedUrl });
    } catch (error) {
      console.log(error);
      return errorResponse(res);
    }
  }

  async lookUp(req: Request, res: Response) {
    const processedUrl = `${BASEURL}/${req.params.id}`;

    try {
      const domain = await domainService.lookUp(processedUrl);
      if (!domain) return errorResponse(res, 'Not found', 404);
      return res.redirect(domain.url);
    } catch (error) {
      console.log(error);
      return errorResponse(res);
    }
  }
}

export default new DomainController();
