import { Request, Response } from 'express';
import { ActionItem } from '../models/ActionItem.js';

export const getActionItems = async (req: Request, res: Response) => {
  try {
    const list = await ActionItem.find();
    return res.json(list);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

export const createActionItem = async (req: Request, res: Response) => {
  try {
    const item = await ActionItem.create(req.body);
    return res.status(201).json(item);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

export const updateActionItemStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const item = await ActionItem.findByIdAndUpdate(id, { status }, { new: true });
    return res.json(item);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
