import { Scheme } from '../models/Scheme.js';
export const getSchemes = async (req, res) => {
    try {
        const list = await Scheme.find();
        return res.json(list);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
export const createScheme = async (req, res) => {
    try {
        const scheme = await Scheme.create(req.body);
        return res.status(201).json(scheme);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
