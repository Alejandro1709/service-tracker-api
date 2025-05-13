import express from 'express';
import morgan from 'morgan';
import { globalErrorHandler } from './middlewares/error';
import dotenv from 'dotenv';
import connectDb from './config/db';
import serviceRouter from './routes/serviceRouter';

dotenv.config();

const app = express();

connectDb(process.env.MONGO_URI as string);

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/services', serviceRouter);

app.use((req, res, next) => {
  res.status(404).json({ status: 'fail', message: 'This route does not exists' });
});

app.use(globalErrorHandler);

export default app;
