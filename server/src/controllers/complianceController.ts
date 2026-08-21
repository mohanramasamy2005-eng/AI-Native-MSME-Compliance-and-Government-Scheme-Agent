import { Request, Response } from 'express';
import { Compliance } from '../models/Compliance.js';

export const getCompliances = async (req: Request, res: Response) => {
  try {
    const list = await Compliance.find();
    return res.json(list);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

export const createCompliance = async (req: Request, res: Response) => {
  try {
    const item = await Compliance.create(req.body);
    return res.status(201).json(item);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

export const updateCompliance = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await Compliance.findByIdAndUpdate(id, req.body, { new: true });
    return res.json(item);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

export const deleteCompliance = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Compliance.findByIdAndDelete(id);
    return res.json({ message: 'Compliance item deleted successfully' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
