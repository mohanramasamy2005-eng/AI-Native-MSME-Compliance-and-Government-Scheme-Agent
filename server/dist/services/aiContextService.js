import { BusinessProfile } from '../models/BusinessProfile.js';
import { Compliance } from '../models/Compliance.js';
import { Scheme } from '../models/Scheme.js';
import { Tender } from '../models/Tender.js';
import { Certification } from '../models/Certification.js';
import { DocumentModel } from '../models/Document.js';
import { Deadline } from '../models/Deadline.js';
import { ActionItem } from '../models/ActionItem.js';
export async function buildBusinessContext() {
    const profile = (await BusinessProfile.findOne()) || {
        businessName: 'ABC Engineering Pvt Ltd',
        tradeName: 'ABC Precision Engineering',
        entityType: 'Private Limited Company',
        sector: 'Manufacturing',
        district: 'Coimbatore',
        state: 'Tamil Nadu',
        turnoverValue: 1.2,
        udyamStatus: 'Active',
        gstin: '33AAACA1234F1Z9',
        complianceHealthScore: 78,
    };
    const compliances = await Compliance.find();
    const schemes = await Scheme.find();
    const tenders = await Tender.find();
    const certifications = await Certification.find();
    const documents = await DocumentModel.find();
    const deadlines = await Deadline.find();
    const actionItems = await ActionItem.find();
    return {
        profile,
        compliances,
        schemes,
        tenders,
        certifications,
        documents,
        deadlines,
        actionItems,
    };
}
