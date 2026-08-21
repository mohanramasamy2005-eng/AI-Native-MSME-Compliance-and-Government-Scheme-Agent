import { Tender } from '../models/Tender.js';
export const getTenders = async (req, res) => {
    try {
        const list = await Tender.find();
        return res.json(list);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
export const createTender = async (req, res) => {
    try {
        const tender = await Tender.create(req.body);
        return res.status(201).json(tender);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
