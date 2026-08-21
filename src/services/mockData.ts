import {
  BusinessProfile,
  ComplianceItem,
  SchemeItem,
  TenderItem,
  CertificationItem,
  DocumentItem,
  DeadlineItem,
  ActionItem,
  ChatMessage
} from '../types';

export const initialBusinessProfile: BusinessProfile = {
  id: 'biz_001',
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
};

export const initialComplianceList: ComplianceItem[] = [
  {
    id: 'comp_01',
    title: 'GSTR-3B Monthly Return',
    category: 'Taxation',
    issuingAuthority: 'Goods & Services Tax Network (GSTN)',
    periodicity: 'Monthly',
    status: 'due_soon',
    dueDate: '2026-08-20',
    description: 'Monthly summary return of outward and inward supplies along with tax liability payment.',
    potentialPenalty: 'Late fee ₹50/day up to ₹10,000 + 18% p.a. interest on delayed tax.'
  },
  {
    id: 'comp_02',
    title: 'TNPCB Consent to Operate (CTO) Renewal',
    category: 'Environmental',
    issuingAuthority: 'Tamil Nadu Pollution Control Board',
    periodicity: 'Annual',
    status: 'critical',
    dueDate: '2026-09-08',
    description: 'Statutory environmental clearance for air & water discharge compliance.',
    potentialPenalty: 'Closure notice under Water & Air Acts and operational penalty.'
  },
  {
    id: 'comp_03',
    title: 'ESI & EPF Monthly Contribution Deposit',
    category: 'Labor & Safety',
    issuingAuthority: 'Ministry of Labour & Employment',
    periodicity: 'Monthly',
    status: 'verified',
    dueDate: '2026-08-15',
    description: 'Employee Provident Fund and State Insurance monthly deposit for 24 registered workers.',
  },
  {
    id: 'comp_04',
    title: 'Annual Factory Inspectorate Return',
    category: 'License & Permit',
    issuingAuthority: 'Directorate of Industrial Safety & Health',
    periodicity: 'Annual',
    status: 'pending',
    dueDate: '2026-10-15',
    description: 'Declaration of machinery list, safety officer logs, and working condition logs.',
  },
  {
    id: 'comp_05',
    title: 'Advance Tax Second Installment',
    category: 'Taxation',
    issuingAuthority: 'Income Tax Department (CBDT)',
    periodicity: 'Quarterly',
    status: 'due_soon',
    dueDate: '2026-09-15',
    description: 'Deposit 45% of estimated net corporate tax liability for FY 2026-27.',
  }
];

export const initialSchemesList: SchemeItem[] = [
  {
    id: 'sch_01',
    title: 'Credit Guarantee Fund Trust for Micro & Small Enterprises (CGTMSE)',
    ministry: 'Ministry of MSME, Govt of India',
    category: 'Credit Guarantee',
    description: 'Collateral-free credit facility up to ₹5 Crore for MSME manufacturing expansion and capital expenditure.',
    fundingAmount: 'Up to ₹5,00,00,000',
    eligibilityMatch: 96,
    eligibilityCriteria: ['Valid Udyam Registration', 'Manufacturing unit operational for 2+ years', 'Clean CIBIL commercial history'],
    keyBenefits: ['No collateral requirement', 'Lower interest rate markup by partner banks', '85% guarantee coverage'],
    deadline: '2026-12-31',
    officialUrl: 'https://cgtmse.in'
  },
  {
    id: 'sch_02',
    title: 'MSME Sustainable (ZED) Certification Scheme',
    ministry: 'Ministry of MSME',
    category: 'Subsidy',
    description: 'Subsidy on ZED certification costs and 80% subsidy for micro enterprises on capital equipment upgrades.',
    fundingAmount: '80% Subsidy up to ₹5 Lakhs',
    eligibilityMatch: 92,
    eligibilityCriteria: ['Udyam Registered MSME', 'Manufacturing activity'],
    keyBenefits: ['Financial assistance for testing & calibration', 'Concession on bank loan interest rates', 'Free handholding by QCI'],
    deadline: '2026-11-30',
    officialUrl: 'https://zed.msme.gov.in'
  },
  {
    id: 'sch_03',
    title: 'TEQUP — Technology and Quality Upgradation Support',
    ministry: 'Ministry of MSME',
    category: 'Technology Upgradation',
    description: 'Encouraging MSMEs to adopt Energy Efficient Technologies (EET) in industrial units.',
    fundingAmount: '25% Capital Subsidy up to ₹10 Lakhs',
    eligibilityMatch: 88,
    eligibilityCriteria: ['Energy audit report by BEE accredited auditor', 'Energy saving technology implementation'],
    keyBenefits: ['Reduces monthly electricity bills by 20%', 'Capital subsidy credited directly to loan account'],
    deadline: '2026-10-15',
  },
  {
    id: 'sch_04',
    title: 'Procurement and Marketing Support (PMS) Scheme',
    ministry: 'Ministry of MSME',
    category: 'Export Support',
    description: 'Financial assistance for participating in national & international trade fairs, exhibitions, and buyer-seller meets.',
    fundingAmount: '100% Stall Fee Reimbursement up to ₹1.5 Lakhs',
    eligibilityMatch: 84,
    eligibilityCriteria: ['Udyam Registration', 'Participation in recognized trade expo'],
    keyBenefits: ['Stall fee reimbursement', 'Airfare & freight allowance for international events'],
    deadline: '2027-03-31',
  }
];

export const initialTendersList: TenderItem[] = [
  {
    id: 'tend_01',
    title: 'Supply & Assembly of Machined Steel Enclosures for Power Grid Components',
    issuingOrg: 'Bharat Heavy Electricals Limited (BHEL), Ranipet',
    category: 'Precision Manufacturing',
    estimatedValue: '₹48,50,000',
    location: 'Ranipet / Peenya',
    submissionDeadline: '2026-09-12',
    matchScore: 94,
    status: 'Open',
    tenderNoticeNo: 'BHEL/RNPT/2026/ENC-882'
  },
  {
    id: 'tend_02',
    title: 'Procurement of High-Grade Machined Shafts for Diesel Locomotives',
    issuingOrg: 'Southern Railway Workshop, Golden Rock',
    category: 'Mechanical Engineering',
    estimatedValue: '₹82,00,000',
    location: 'Tiruchirappalli',
    submissionDeadline: '2026-09-25',
    matchScore: 89,
    status: 'Open',
    tenderNoticeNo: 'SR/GOC/MECH/2026/044'
  },
  {
    id: 'tend_03',
    title: 'Fabrication of Aluminium Control Panel Cabinets',
    issuingOrg: 'Tamil Nadu Generation and Distribution Corp (TANGEDCO)',
    category: 'Fabrication',
    estimatedValue: '₹22,00,000',
    location: 'Coimbatore',
    submissionDeadline: '2026-10-05',
    matchScore: 82,
    status: 'Open',
    tenderNoticeNo: 'TANGEDCO/CBE/2026/FAB-102'
  }
];

export const initialCertificationsList: CertificationItem[] = [
  {
    id: 'cert_01',
    name: 'ISO 9001:2015 Quality Management System',
    issuingBody: 'Bureau Veritas Quality International (BVQI)',
    category: 'Quality',
    certificateNumber: 'IND-QMS-2022-88192',
    validFrom: '2023-11-01',
    validUntil: '2026-10-31',
    status: 'Renewal Pending'
  },
  {
    id: 'cert_02',
    name: 'ZED Gold Certification (Zero Defect Zero Effect)',
    issuingBody: 'Quality Council of India (QCI) & Ministry of MSME',
    category: 'Environmental',
    certificateNumber: 'ZED-GOLD-TN-00341',
    validFrom: '2024-04-15',
    validUntil: '2027-04-14',
    status: 'Active'
  },
  {
    id: 'cert_03',
    name: 'CE Marking for Machined Components',
    issuingBody: 'TÜV SÜD South Asia',
    category: 'Export',
    certificateNumber: 'CE-EU-2024-99120',
    validFrom: '2024-01-10',
    validUntil: '2027-01-09',
    status: 'Active'
  }
];

export const initialDocumentsList: DocumentItem[] = [
  {
    id: 'doc_01',
    fileName: 'TNPCB_Consent_To_Operate_NOC_2025.pdf',
    fileType: 'Pollution NOC',
    uploadDate: '2026-08-10',
    fileSize: '2.4 MB',
    status: 'Action Needed',
    confidenceScore: 94,
    extractedFields: [
      { label: 'Consent Order No', value: 'TNPCB/CTO/2025/CBE/8812', confidence: 0.98 },
      { label: 'Category', value: 'Orange Category (Manufacturing)', confidence: 0.96 },
      { label: 'Validity Period', value: '09-Sep-2025 to 08-Sep-2026', confidence: 0.95 },
      { label: 'Air & Water Discharge Cap', value: '2.5 KLD Industrial Effluent', confidence: 0.91 }
    ],
    detectedIssues: [
      'Expiry date is within 18 days (08-Sep-2026)',
      'Quarterly Water Analysis Test Report attachment is unreadable/missing'
    ],
    recommendations: [
      'Apply online on TNPCB OCMMS portal for CTO renewal immediately',
      'Re-upload clear scan of Quarterly Water Analysis Test Report'
    ],
    expiryDate: '2026-09-08'
  },
  {
    id: 'doc_02',
    fileName: 'GSTR3B_Filing_Acknowledgement_July_2026.pdf',
    fileType: 'GST Return',
    uploadDate: '2026-08-14',
    fileSize: '1.1 MB',
    status: 'Analyzed',
    confidenceScore: 99,
    extractedFields: [
      { label: 'ARN', value: 'AA3307260982143', confidence: 0.99 },
      { label: 'Period', value: 'July 2026', confidence: 0.99 },
      { label: 'Total Output Tax Paid', value: '₹1,42,800', confidence: 0.98 },
      { label: 'Input Tax Credit (ITC) Availed', value: '₹1,18,500', confidence: 0.97 }
    ],
    detectedIssues: [],
    recommendations: [
      'Reconcile ITC with GSTR-2B before next monthly cycle'
    ]
  },
  {
    id: 'doc_03',
    fileName: 'Factory_License_Renewal_Application_Draft.pdf',
    fileType: 'Factory License',
    uploadDate: '2026-08-18',
    fileSize: '3.8 MB',
    status: 'Action Needed',
    confidenceScore: 86,
    extractedFields: [
      { label: 'Factory License No', value: 'CBE/FAC/2021/4491', confidence: 0.92 },
      { label: 'Max Horse Power Installed', value: '75 HP', confidence: 0.88 },
      { label: 'Max Workers Sanctioned', value: '30 Workers', confidence: 0.85 }
    ],
    detectedIssues: [
      'Inspectorate seal on Page 3 is blurry (confidence 62%)',
      'Inconsistency detected: Installed HP listed as 75 HP, but Electricity Bill shows 90 HP connected load'
    ],
    recommendations: [
      'Verify connected load with TANGEDCO power bill before submitting to DISH portal',
      'Scan Page 3 at 300 DPI for clear seal visibility'
    ]
  }
];

export const initialDeadlinesList: DeadlineItem[] = [
  {
    id: 'dead_01',
    title: 'GSTR-3B Monthly Tax Return Filing',
    category: 'GST Compliance',
    dueDate: '2026-08-20',
    daysRemaining: 1,
    status: 'Urgent',
    priority: 'high',
    authority: 'GSTN'
  },
  {
    id: 'dead_02',
    title: 'TNPCB Consent to Operate (CTO) Renewal Submission',
    category: 'Pollution Control',
    dueDate: '2026-09-08',
    daysRemaining: 18,
    status: 'Urgent',
    priority: 'critical',
    authority: 'TNPCB'
  },
  {
    id: 'dead:03',
    title: 'Advance Income Tax 2nd Quarter Installment',
    category: 'Corporate Income Tax',
    dueDate: '2026-09-15',
    daysRemaining: 25,
    status: 'Upcoming',
    priority: 'medium',
    authority: 'Income Tax Dept'
  },
  {
    id: 'dead_04',
    title: 'ISO 9001:2015 Recertification Audit',
    category: 'Quality Certification',
    dueDate: '2026-10-31',
    daysRemaining: 71,
    status: 'Upcoming',
    priority: 'medium',
    authority: 'Bureau Veritas'
  }
];

export const initialActionItems: ActionItem[] = [
  {
    id: 'act_01',
    title: 'Initiate TNPCB Pollution Consent CTO Renewal',
    category: 'Compliance',
    priority: 'critical',
    status: 'Pending',
    dueDate: '2026-09-08',
    estimatedTimeMinutes: 30,
    impactSummary: 'Prevents operational notice & maintains 100% compliance health score.',
    steps: [
      'Log into TNPCB OCMMS Portal with Udyam ID',
      'Upload updated water test report & stack emission test report',
      'Pay online renewal fee of ₹12,500',
      'Obtain acknowledgement copy'
    ]
  },
  {
    id: 'act_02',
    title: 'File GSTR-3B Tax Return for July 2026',
    category: 'Tax Filing',
    priority: 'high',
    status: 'Pending',
    dueDate: '2026-08-20',
    estimatedTimeMinutes: 20,
    impactSummary: 'Avoids ₹50/day late fee and ensures 100% GSTR compliance rating.',
    steps: [
      'Reconcile Sales Register with Purchase Register (GSTR-2B)',
      'Confirm net payable cash liability (₹24,300)',
      'Approve challan payment via net banking',
      'File return using EVC OTP authentication'
    ]
  },
  {
    id: 'act_03',
    title: 'Submit CGTMSE Collateral-Free Credit Loan Application',
    category: 'Grant Application',
    priority: 'medium',
    status: 'In Progress',
    dueDate: '2026-09-30',
    estimatedTimeMinutes: 45,
    impactSummary: 'Unlocks ₹50 Lakh working capital loan at 8.5% interest without collateral.',
    steps: [
      'Download pre-filled MSME Project Profile from MSME AI',
      'Attach audited balance sheet for FY 2024-25 & FY 2025-26',
      'Submit dossier to Canara Bank Peenya Branch'
    ]
  },
  {
    id: 'act_04',
    title: 'Fix Connected Load Mismatch in Factory License Draft',
    category: 'Document Fix',
    priority: 'medium',
    status: 'Pending',
    dueDate: '2026-10-05',
    estimatedTimeMinutes: 15,
    impactSummary: 'Prevents rejection of Factory License renewal by DISH inspector.',
    steps: [
      'Check TANGEDCO power sanction letter',
      'Update installed HP from 75 HP to 90 HP in draft form',
      'Re-upload high resolution page 3 scan'
    ]
  }
];

export const initialChatMessages: ChatMessage[] = [
  {
    id: 'msg_01',
    sender: 'assistant',
    text: 'Hello Rajesh! I am your MSME AI Assistant. I have analyzed ABC Engineering Pvt Ltd. You have **2 urgent actions** that require attention, including your TNPCB Pollution Consent renewal due in 18 days and GSTR-3B filing due tomorrow.',
    timestamp: '10:30 AM',
    suggestions: [
      'How do I renew my TNPCB Pollution Consent?',
      'Am I eligible for CGTMSE collateral-free loan?',
      'What GST returns are due this month?',
      'Analyze my uploaded factory license document'
    ]
  }
];
