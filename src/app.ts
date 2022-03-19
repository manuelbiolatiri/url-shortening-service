import { errorResponse, successResponse } from './utils/globalResponses';
import cors from 'cors';
import express, { Application } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import Router from './routes';
import dotenv from 'dotenv';
import errorMiddleware from './middlewares/error-middleware';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

// Init environment
dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(cors());

app.use(helmet());

app.use(Router);

app.get('/', async (req, res) => {
  successResponse(res, { message: 'ok' });
});

app.get('/', (req, res) => {
  errorResponse(res, 'Not found', 404);
});

const initializeSwagger = () => {
  const options = {
    swaggerDefinition: {
      info: {
        title: 'URL Shortening Service',
        version: '1.0.0',
        description: 'API docs',
      },
    },
    apis: ['swagger.yaml'],
  };

  const specs = swaggerJSDoc(options);
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
};

initializeSwagger();

app.use(errorMiddleware);

export default app;
