import { Request, Response } from 'express';
import { Certification } from '../models/Certification.js';

export const getCertifications = async (req: Request, res: Response) => {
  try {
    const list = await Certification.find();
    return res.json(list);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

export const createCertification = async (req: Request, res: Response) => {
  try {
    const item = await Certification.create(req.body);
    return res.status(201).json(item);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

export const updateCertification = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await Certification.findByIdAndUpdate(id, req.body, { new: true });
    return res.json(item);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
