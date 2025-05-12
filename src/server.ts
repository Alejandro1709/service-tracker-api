import express from 'express';
import morgan from 'morgan';
import { globalErrorHandler } from './middlewares/error';
import dotenv from 'dotenv';
import connectDb from './config/db';

dotenv.config();

const app = express();

connectDb(process.env.MONGO_URI as string);

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Ok' });
});

app.use((req, res, next) => {
  res.status(404).json({ status: 'fail', message: 'This route does not exists' });
});

app.use(globalErrorHandler);

export default app;
