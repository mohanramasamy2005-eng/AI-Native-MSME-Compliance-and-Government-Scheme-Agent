import { BusinessProfile } from '../models/BusinessProfile.js';
export const getBusinessProfile = async (req, res) => {
    try {
        let profile = await BusinessProfile.findOne();
        if (!profile) {
            profile = new BusinessProfile({
                businessName: 'ABC Engineering Pvt Ltd',
                tradeName: 'ABC Precision Engineering',
                entityType: 'Private Limited Company',
                sector: 'Manufacturing',
                location: 'Peenya Industrial Area',
                district: 'Coimbatore',
                state: 'Tamil Nadu',
                turnoverFY: 'FY 2025-26',
                turnoverValue: 1.2,
                udyamStatus: 'Active',
                udyamRegistrationNo: 'UDYAM-TN-03-0049281',
                gstin: '33AAACA1234F1Z9',
                pan: 'AAACA1234F',
                employeeCount: 24,
                incorporationYear: 2018,
                nextRenewal: 'Pollution Consent (TNPCB)',
                complianceHealthScore: 78,
            });
        }
        return res.json(profile);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
export const updateBusinessProfile = async (req, res) => {
    try {
        let profile = await BusinessProfile.findOne();
        if (!profile) {
            profile = new BusinessProfile(req.body);
        }
        else {
            Object.assign(profile, req.body);
        }
        await profile.save();
        return res.json(profile);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
