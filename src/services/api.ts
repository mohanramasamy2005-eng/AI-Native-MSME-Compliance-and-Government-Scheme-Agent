/// <reference types="vite/client" />

import {
  BusinessProfile,
  ComplianceItem,
  SchemeItem,
  TenderItem,
  CertificationItem,
  DocumentItem,
  DeadlineItem,
  ActionItem,
  StructuredAiResponse,
} from "../types";
import {
  initialBusinessProfile,
  initialComplianceList,
  initialSchemesList,
  initialTendersList,
  initialCertificationsList,
  initialDocumentsList,
  initialDeadlinesList,
  initialActionItems,
} from "./mockData";

const getAuthHeaders = () => {
  const token = localStorage.getItem("msme_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const BASE_URL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/api$/, "") : "";

export const api = {
  // Business Profile API
  async getBusinessProfile(): Promise<BusinessProfile> {
    try {
      const res = await fetch(`${BASE_URL}/api/business`, { headers: getAuthHeaders() });
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      return { ...initialBusinessProfile, ...data };
    } catch {
      return initialBusinessProfile;
    }
  },

  async updateBusinessProfile(
    data: Partial<BusinessProfile>,
  ): Promise<BusinessProfile> {
    try {
      const res = await fetch(`${BASE_URL}/api/business`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("API error");
      return await res.json();
    } catch {
      return { ...initialBusinessProfile, ...data };
    }
  },

  // Compliances API
  async getCompliances(): Promise<ComplianceItem[]> {
    try {
      const res = await fetch(`${BASE_URL}/api/compliance`, { headers: getAuthHeaders() });
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      return data.length ? data : initialComplianceList;
    } catch {
      return initialComplianceList;
    }
  },

  // Schemes API
  async getSchemes(): Promise<SchemeItem[]> {
    try {
      const res = await fetch(`${BASE_URL}/api/schemes`, { headers: getAuthHeaders() });
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      return data.length ? data : initialSchemesList;
    } catch {
      return initialSchemesList;
    }
  },

  // Tenders API
  async getTenders(): Promise<TenderItem[]> {
    try {
      const res = await fetch(`${BASE_URL}/api/tenders`, { headers: getAuthHeaders() });
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      return data.length ? data : initialTendersList;
    } catch {
      return initialTendersList;
    }
  },

  // Certifications API
  async getCertifications(): Promise<CertificationItem[]> {
    try {
      const res = await fetch(`${BASE_URL}/api/certifications`, {
        headers: getAuthHeaders(),
      });
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      return data.length ? data : initialCertificationsList;
    } catch {
      return initialCertificationsList;
    }
  },

  // Documents API
  async getDocuments(): Promise<DocumentItem[]> {
    try {
      const res = await fetch(`${BASE_URL}/api/documents`, { headers: getAuthHeaders() });
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      return data.length ? data : initialDocumentsList;
    } catch {
      return initialDocumentsList;
    }
  },

  async uploadDocument(file: File): Promise<DocumentItem> {
    const formData = new FormData();
    formData.append("file", file);
    const token = localStorage.getItem("msme_token");
    const res = await fetch(`${BASE_URL}/api/documents/upload`, {
      method: "POST",
      body: formData,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    if (!res.ok)
      throw new Error(
        (await res.json().catch(() => null))?.error ||
          "Document analysis failed",
      );
    return await res.json();
  },

  // Deadlines API
  async getDeadlines(): Promise<DeadlineItem[]> {
    try {
      const res = await fetch(`${BASE_URL}/api/deadlines`, { headers: getAuthHeaders() });
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      return data.length ? data : initialDeadlinesList;
    } catch {
      return initialDeadlinesList;
    }
  },

  // Action Items API
  async getActionItems(): Promise<ActionItem[]> {
    try {
      const res = await fetch(`${BASE_URL}/api/actions`, { headers: getAuthHeaders() });
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      return data.length ? data : initialActionItems;
    } catch {
      return initialActionItems;
    }
  },

  async updateActionStatus(id: string, status: string): Promise<any> {
    try {
      const res = await fetch(`${BASE_URL}/api/actions/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("API error");
      return await res.json();
    } catch {
      return { id, status };
    }
  },

  // AI Assistant API
  async sendAssistantMessage(message: string): Promise<StructuredAiResponse> {
    try {
      const res = await fetch(`${BASE_URL}/api/assistant/chat`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ message }),
      });
      if (!res.ok) throw new Error("API error");
      return await res.json();
    } catch {
      return {
        replyText: `Here are recommendations based on ABC Engineering Pvt Ltd's business profile:`,
        recommendations: [
          {
            title: "CGTMSE Collateral-Free Credit Loan",
            relevanceMatch: "96% Fit",
            whyRelevant:
              "Manufacturing MSME with 2+ years turnover qualifying for collateral-free credit.",
            eligibilityFactors: [
              "Active Udyam Registration",
              "Clean credit record",
            ],
            recommendedAction: "Submit audited statements to bank branch.",
            deadline: "2026-12-31",
            officialSource: "https://cgtmse.in",
          },
        ],
        suggestedPrompts: [
          "What schemes are relevant to my business?",
          "What compliance should I focus on?",
          "What should I do first?",
          "What deadlines are coming up?",
        ],
      };
    }
  },
};
