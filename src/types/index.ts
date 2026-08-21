export type ComplianceStatus =
  | "active"
  | "verified"
  | "pending"
  | "due_soon"
  | "overdue"
  | "critical";
export type PriorityLevel = "critical" | "high" | "medium" | "low";
export type SectorType =
  | "Manufacturing"
  | "Services"
  | "Retail & Wholesale"
  | "Textiles"
  | "Agri-Processing"
  | "Technology";

export interface BusinessProfile {
  id: string;
  businessName: string;
  tradeName: string;
  entityType: string;
  sector: SectorType;
  location: string;
  state: string;
  district: string;
  turnoverFY: string;
  turnoverValue: number;
  udyamStatus: "Active" | "Pending" | "Not Registered";
  udyamRegistrationNo?: string;
  gstin?: string;
  pan?: string;
  employeeCount: number;
  incorporationYear: number;
  nextRenewal: string;
  complianceHealthScore: number;
}

export interface ComplianceItem {
  id: string;
  title: string;
  category:
    | "Taxation"
    | "Labor & Safety"
    | "Environmental"
    | "Corporate Governance"
    | "License & Permit";
  issuingAuthority: string;
  periodicity: "Monthly" | "Quarterly" | "Annual" | "Bi-Annual" | "One-Time";
  status: ComplianceStatus;
  dueDate: string;
  description: string;
  potentialPenalty?: string;
}

export interface SchemeItem {
  id: string;
  title: string;
  ministry: string;
  category:
    | "Credit Guarantee"
    | "Technology Upgradation"
    | "Subsidy"
    | "Export Support"
    | "Infrastructure";
  description: string;
  fundingAmount: string;
  eligibilityMatch: number;
  eligibilityCriteria: string[];
  keyBenefits: string[];
  deadline: string;
  officialUrl?: string;
}

export interface TenderItem {
  id: string;
  title: string;
  issuingOrg: string;
  category: string;
  estimatedValue: string;
  location: string;
  submissionDeadline: string;
  matchScore: number;
  status: "Open" | "Under Review" | "Submitted";
  tenderNoticeNo: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuingBody: string;
  category:
    | "Quality"
    | "Safety"
    | "Environmental"
    | "Export"
    | "Sustainability";
  certificateNumber: string;
  validFrom: string;
  validUntil: string;
  status: "Active" | "Renewal Pending" | "Expired";
}

export interface ExtractedField {
  label: string;
  value: string;
  confidence: number;
}

export interface DocumentItem {
  id: string;
  fileName: string;
  fileType: string;
  uploadDate: string;
  fileSize: string;
  status: "Analyzed" | "Action Needed" | "Processing";
  confidenceScore: number;
  extractedFields: ExtractedField[];
  detectedIssues: string[];
  recommendations: string[];
  expiryDate?: string;
  review?: {
    extractedTextPreview: string;
    profileMatches: string[];
    profileMismatches: string[];
    missingInformation: string[];
    potentialIssues: string[];
    reviewReport: string;
    ragGuidance: string[];
  };
}

export interface DeadlineItem {
  id: string;
  title: string;
  category: string;
  dueDate: string;
  daysRemaining: number;
  status: "Urgent" | "Upcoming" | "Completed";
  priority: PriorityLevel;
  authority: string;
}

export interface ActionItem {
  id: string;
  title: string;
  category:
    | "Compliance"
    | "Grant Application"
    | "Document Fix"
    | "Tax Filing"
    | "Certification";
  priority: PriorityLevel;
  status: "Pending" | "In Progress" | "Completed";
  dueDate: string;
  estimatedTimeMinutes: number;
  impactSummary: string;
  steps: string[];
}

export interface SourceCitationMetadata {
  sourceName: string;
  officialUrl: string;
  documentTitle: string;
  lastVerifiedDate: string;
  category: string;
}

export interface RagCitation {
  docId: string;
  sourceName: string;
  officialUrl: string;
  documentTitle: string;
  lastVerifiedDate: string;
  category: string;
  matchedText: string;
  relevanceScore: number;
}

export interface AiRecommendationItem {
  title: string;
  relevanceMatch: string;
  whyRelevant: string;
  eligibilityFactors: string[];
  recommendedAction: string;
  deadline?: string;
  officialSource?: string;
  sourceMetadata?: SourceCitationMetadata;
}

export interface StructuredAiResponse {
  replyText: string;
  recommendations: AiRecommendationItem[];
  suggestedPrompts: string[];
  referencedDocs?: string[];
  retrievedCitations?: RagCitation[];
}

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
  recommendations?: AiRecommendationItem[];
  suggestions?: string[];
  referencedDocs?: string[];
  retrievedCitations?: RagCitation[];
}
