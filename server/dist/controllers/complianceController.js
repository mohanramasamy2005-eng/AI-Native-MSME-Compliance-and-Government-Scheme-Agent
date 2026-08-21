import { Compliance } from '../models/Compliance.js';
export const getCompliances = async (req, res) => {
    try {
        const list = await Compliance.find();
        return res.json(list);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
export const createCompliance = async (req, res) => {
    try {
        const item = await Compliance.create(req.body);
        return res.status(201).json(item);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
export const updateCompliance = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Compliance.findByIdAndUpdate(id, req.body, { new: true });
        return res.json(item);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
export const deleteCompliance = async (req, res) => {
    try {
        const { id } = req.params;
        await Compliance.findByIdAndDelete(id);
        return res.json({ message: 'Compliance item deleted successfully' });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
