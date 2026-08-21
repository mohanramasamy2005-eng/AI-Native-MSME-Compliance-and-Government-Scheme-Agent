import { Deadline } from '../models/Deadline.js';
export const getDeadlines = async (req, res) => {
    try {
        const list = await Deadline.find().sort({ daysRemaining: 1 });
        return res.json(list);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
export const createDeadline = async (req, res) => {
    try {
        const item = await Deadline.create(req.body);
        return res.status(201).json(item);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
