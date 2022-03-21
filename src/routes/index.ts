import express from 'express';
import domainRouter from './domain.router';
import controller from '../controllers/domain.controller';

const router = express.Router();

router.get('/', async (_req, res) => {
  return res.send({ message: 'OK' });
});

router.get('/:id', controller.lookUp);

router.use('/domain', domainRouter);

export default router;
