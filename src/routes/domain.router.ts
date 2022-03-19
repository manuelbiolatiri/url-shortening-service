import { LongUrl } from './../dtos/longUrl';
import { ShortUrl } from './../dtos/shortUrl';
import express from 'express';
import controller from '../controllers/domain.controller';
import validationMiddleware from '../middlewares/validation.middleware';

const router = express.Router();

router.post('/short', validationMiddleware(ShortUrl), controller.create);

router.post('/long', validationMiddleware(LongUrl), controller.create);

export default router;
