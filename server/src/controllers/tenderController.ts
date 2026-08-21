import { Request, Response } from 'express';
import { Tender } from '../models/Tender.js';

export const getTenders = async (req: Request, res: Response) => {
  try {
    const list = await Tender.find();
    return res.json(list);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

export const createTender = async (req: Request, res: Response) => {
  try {
    const tender = await Tender.create(req.body);
    return res.status(201).json(tender);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
