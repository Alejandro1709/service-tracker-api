import express from 'express';
import morgan from 'morgan';
import { globalErrorHandler } from './middlewares/error';
import dotenv from 'dotenv';
import connectDb from './config/db';
import serviceRouter from './routes/serviceRouter';
import entriesRouter from './routes/entryRouter';
import authRouter from './routes/authRouter';
import AppError from './utils/AppError';
import cors from 'cors';

dotenv.config();

const app = express();

connectDb(process.env.MONGO_URI as string);

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/services', serviceRouter);
app.use('/api/v1/entries', entriesRouter);
app.use('/api/v1/auth', authRouter);

app.use((req, res, next) => {
  next(new AppError('This route does not exists', 404));
});

app.use(globalErrorHandler);

export default app;
