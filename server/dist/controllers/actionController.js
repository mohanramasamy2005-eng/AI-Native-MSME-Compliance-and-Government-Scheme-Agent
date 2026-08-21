import { ActionItem } from '../models/ActionItem.js';
export const getActionItems = async (req, res) => {
    try {
        const list = await ActionItem.find();
        return res.json(list);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
export const createActionItem = async (req, res) => {
    try {
        const item = await ActionItem.create(req.body);
        return res.status(201).json(item);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
export const updateActionItemStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const item = await ActionItem.findByIdAndUpdate(id, { status }, { new: true });
        return res.json(item);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
