import express from 'express';
import morgan from 'morgan';
import { globalErrorHandler } from './middlewares/error';
import dotenv from 'dotenv';
import connectDb from './config/db';
import serviceRouter from './routes/serviceRouter';
import AppError from './utils/AppError';

dotenv.config();

const app = express();

connectDb(process.env.MONGO_URI as string);

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/services', serviceRouter);

app.use((req, res, next) => {
  next(new AppError('This route does not exists', 404));
});

app.use(globalErrorHandler);

export default app;
