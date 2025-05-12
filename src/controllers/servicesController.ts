import type { Request, Response } from 'express';

export const getServices = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Ok' });
};

export const getService = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Ok' });
};

export const createService = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Ok' });
};

export const updateService = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Ok' });
};

export const deleteService = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Ok' });
};
