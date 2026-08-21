import { Request, Response } from 'express';
import { Scheme } from '../models/Scheme.js';

export const getSchemes = async (req: Request, res: Response) => {
  try {
    const list = await Scheme.find();
    return res.json(list);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

export const createScheme = async (req: Request, res: Response) => {
  try {
    const scheme = await Scheme.create(req.body);
    return res.status(201).json(scheme);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
