import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { BusinessProfile } from '../models/BusinessProfile.js';
import { Compliance } from '../models/Compliance.js';
import { Scheme } from '../models/Scheme.js';
import { Tender } from '../models/Tender.js';
import { Certification } from '../models/Certification.js';
import { DocumentModel } from '../models/Document.js';
import { Deadline } from '../models/Deadline.js';
import { ActionItem } from '../models/ActionItem.js';

export async function seedInitialData() {
  try {
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      console.log('🌱 Database already contains data. Skipping initial seeding.');
      return;
    }

    console.log('🌱 Seeding initial MSME business data...');

    // 1. Create Default User
    const passwordHash = await bcrypt.hash('password123', 10);
    const user = await User.create({
      email: 'rajesh@abcengineering.in',
      passwordHash,
      name: 'Rajesh Kumar',
      role: 'owner',
    });

    // 2. Create Business Profile
    const business = await BusinessProfile.create({
      userId: user._id,
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

    user.businessProfileId = business._id as any;
    await user.save();

    // 3. Seed Compliances
    await Compliance.insertMany([
      {
        businessId: business._id,
        title: 'GSTR-3B Monthly Return',
        category: 'Taxation',
        issuingAuthority: 'Goods & Services Tax Network (GSTN)',
        periodicity: 'Monthly',
        status: 'due_soon',
        dueDate: '2026-08-20',
        description: 'Monthly summary return of outward and inward supplies along with tax liability payment.',
        potentialPenalty: 'Late fee ₹50/day up to ₹10,000 + 18% p.a. interest.',
      },
      {
        businessId: business._id,
        title: 'TNPCB Consent to Operate (CTO) Renewal',
        category: 'Environmental',
        issuingAuthority: 'Tamil Nadu Pollution Control Board',
        periodicity: 'Annual',
        status: 'critical',
        dueDate: '2026-09-08',
        description: 'Statutory environmental clearance for air & water discharge compliance.',
        potentialPenalty: 'Closure notice under Water & Air Acts and operational penalty.',
      },
      {
        businessId: business._id,
        title: 'ESI & EPF Monthly Contribution Deposit',
        category: 'Labor & Safety',
        issuingAuthority: 'Ministry of Labour & Employment',
        periodicity: 'Monthly',
        status: 'verified',
        dueDate: '2026-08-15',
        description: 'Employee Provident Fund and State Insurance monthly deposit for 24 workers.',
      },
    ]);

    // 4. Seed Schemes
    await Scheme.insertMany([
      {
        title: 'Credit Guarantee Fund Trust for Micro & Small Enterprises (CGTMSE)',
        ministry: 'Ministry of MSME, Govt of India',
        category: 'Credit Guarantee',
        description: 'Collateral-free credit facility up to ₹5 Crore for MSME manufacturing expansion.',
        fundingAmount: 'Up to ₹5,00,00,000',
        eligibilityMatch: 96,
        eligibilityCriteria: ['Valid Udyam Registration', 'Manufacturing unit 2+ yrs', 'Clean CIBIL history'],
        keyBenefits: ['No collateral requirement', 'Lower interest markup', '85% guarantee coverage'],
        deadline: '2026-12-31',
        officialUrl: 'https://cgtmse.in',
      },
      {
        title: 'MSME Sustainable (ZED) Certification Scheme',
        ministry: 'Ministry of MSME',
        category: 'Subsidy',
        description: 'Subsidy on ZED certification costs and 80% subsidy for equipment upgrades.',
        fundingAmount: '80% Subsidy up to ₹5 Lakhs',
        eligibilityMatch: 92,
        eligibilityCriteria: ['Udyam Registered MSME', 'Manufacturing activity'],
        keyBenefits: ['Financial assistance for testing', 'Interest rate concessions'],
        deadline: '2026-11-30',
        officialUrl: 'https://zed.msme.gov.in',
      },
    ]);

    // 5. Seed Tenders
    await Tender.insertMany([
      {
        tenderNoticeNo: 'BHEL/RNPT/2026/ENC-882',
        title: 'Supply & Assembly of Machined Steel Enclosures for Power Grid Components',
        issuingOrg: 'Bharat Heavy Electricals Limited (BHEL), Ranipet',
        category: 'Precision Manufacturing',
        estimatedValue: '₹48,50,000',
        location: 'Ranipet / Peenya',
        submissionDeadline: '2026-09-12',
        matchScore: 94,
        status: 'Open',
      },
      {
        tenderNoticeNo: 'SR/GOC/MECH/2026/044',
        title: 'Procurement of High-Grade Machined Shafts for Diesel Locomotives',
        issuingOrg: 'Southern Railway Workshop, Golden Rock',
        category: 'Mechanical Engineering',
        estimatedValue: '₹82,00,000',
        location: 'Tiruchirappalli',
        submissionDeadline: '2026-09-25',
        matchScore: 89,
        status: 'Open',
      },
    ]);

    // 6. Seed Certifications
    await Certification.insertMany([
      {
        businessId: business._id,
        name: 'ISO 9001:2015 Quality Management System',
        issuingBody: 'Bureau Veritas Quality International (BVQI)',
        category: 'Quality',
        certificateNumber: 'IND-QMS-2022-88192',
        validFrom: '2023-11-01',
        validUntil: '2026-10-31',
        status: 'Renewal Pending',
      },
      {
        businessId: business._id,
        name: 'ZED Gold Certification (Zero Defect Zero Effect)',
        issuingBody: 'Quality Council of India (QCI) & Ministry of MSME',
        category: 'Environmental',
        certificateNumber: 'ZED-GOLD-TN-00341',
        validFrom: '2024-04-15',
        validUntil: '2027-04-14',
        status: 'Active',
      },
    ]);

    // 7. Seed Documents
    await DocumentModel.insertMany([
      {
        businessId: business._id,
        fileName: 'TNPCB_Consent_To_Operate_NOC_2025.pdf',
        fileType: 'Pollution NOC',
        uploadDate: '2026-08-10',
        fileSize: '2.4 MB',
        status: 'Action Needed',
        confidenceScore: 94,
        extractedFields: [
          { label: 'Consent Order No', value: 'TNPCB/CTO/2025/CBE/8812', confidence: 0.98 },
          { label: 'Validity Period', value: '09-Sep-2025 to 08-Sep-2026', confidence: 0.95 },
        ],
        detectedIssues: ['Expiry date is within 18 days (08-Sep-2026)'],
        recommendations: ['Apply online on TNPCB OCMMS portal for CTO renewal immediately'],
        expiryDate: '2026-09-08',
      },
      {
        businessId: business._id,
        fileName: 'GSTR3B_Filing_Acknowledgement_July_2026.pdf',
        fileType: 'GST Return',
        uploadDate: '2026-08-14',
        fileSize: '1.1 MB',
        status: 'Analyzed',
        confidenceScore: 99,
        extractedFields: [
          { label: 'ARN', value: 'AA3307260982143', confidence: 0.99 },
          { label: 'Total Output Tax Paid', value: '₹1,42,800', confidence: 0.98 },
        ],
        detectedIssues: [],
        recommendations: ['Reconcile ITC with GSTR-2B before next monthly cycle'],
      },
    ]);

    // 8. Seed Deadlines
    await Deadline.insertMany([
      {
        businessId: business._id,
        title: 'GSTR-3B Monthly Tax Return Filing',
        category: 'GST Compliance',
        dueDate: '2026-08-20',
        daysRemaining: 1,
        status: 'Urgent',
        priority: 'high',
        authority: 'GSTN',
      },
      {
        businessId: business._id,
        title: 'TNPCB Consent to Operate (CTO) Renewal Submission',
        category: 'Pollution Control',
        dueDate: '2026-09-08',
        daysRemaining: 18,
        status: 'Urgent',
        priority: 'critical',
        authority: 'TNPCB',
      },
    ]);

    // 9. Seed Action Items
    await ActionItem.insertMany([
      {
        businessId: business._id,
        title: 'Initiate TNPCB Pollution Consent CTO Renewal',
        category: 'Compliance',
        priority: 'critical',
        status: 'Pending',
        dueDate: '2026-09-08',
        estimatedTimeMinutes: 30,
        impactSummary: 'Prevents operational notice & maintains 100% compliance health score.',
        steps: [
          'Log into TNPCB OCMMS Portal with Udyam ID',
          'Upload updated water test report',
          'Pay online renewal fee of ₹12,500',
        ],
      },
      {
        businessId: business._id,
        title: 'File GSTR-3B Tax Return for July 2026',
        category: 'Tax Filing',
        priority: 'high',
        status: 'Pending',
        dueDate: '2026-08-20',
        estimatedTimeMinutes: 20,
        impactSummary: 'Avoids ₹50/day late fee and ensures 100% GSTR rating.',
        steps: [
          'Reconcile Sales Register with Purchase Register (GSTR-2B)',
          'Confirm net payable cash liability (₹24,300)',
        ],
      },
    ]);

    console.log('✅ MSME AI Database Seeding Complete!');
  } catch (err) {
    console.error('❌ Error seeding database:', err);
  }
}
