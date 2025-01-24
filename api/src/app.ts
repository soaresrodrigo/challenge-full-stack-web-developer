import express from 'express';
import cors from 'cors';
import routes from './routes/index.routes';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: false,
  })
);

app.use(express.json());
app.use('/api', routes);

app.use(errorHandler);

export default app;
