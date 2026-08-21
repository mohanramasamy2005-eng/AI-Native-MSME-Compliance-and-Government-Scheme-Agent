import { Certification } from '../models/Certification.js';
export const getCertifications = async (req, res) => {
    try {
        const list = await Certification.find();
        return res.json(list);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
export const createCertification = async (req, res) => {
    try {
        const item = await Certification.create(req.body);
        return res.status(201).json(item);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
export const updateCertification = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Certification.findByIdAndUpdate(id, req.body, { new: true });
        return res.json(item);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
