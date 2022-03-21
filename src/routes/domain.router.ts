import { Url } from '../dtos/url';
import express from 'express';
import controller from '../controllers/domain.controller';
import validationMiddleware from '../middlewares/validation.middleware';

const router = express.Router();

router.post('/short', validationMiddleware(Url), controller.createShortUrl);

router.post('/long', validationMiddleware(Url), controller.createLongUrl);

export default router;
