import { successResponse } from './utils/globalResponses';
import cors from 'cors';
import express, { Application } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import Router from './routes';
import dotenv from 'dotenv';
import errorMiddleware from './middlewares/error-middleware';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDoc from './swagger.json';

// Init environment
dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(cors());

app.use(helmet());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(Router);

app.get('/', async (req, res) => {
  successResponse(res, { message: 'ok' });
});

app.use(errorMiddleware);

export default app;
