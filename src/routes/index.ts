import express from 'express';
import domainRouter from './domain.router';

const router = express.Router();

router.get('/', async (_req, res) => {
  return res.send({ message: 'OK' });
});

router.use('/domain', domainRouter);

export default router;
