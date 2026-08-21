import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { initialDocumentsList } from "../services/mockData";
import { DocumentAnalysisCard } from "../components/DocumentAnalysisCard";
import { Modal } from "../components/Modal";
import { DocumentItem } from "../types";

export const DocumentsPage: React.FC = () => {
  const [documents, setDocuments] =
    useState<DocumentItem[]>(initialDocumentsList);
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    api.getDocuments().then(setDocuments);
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setIsUploading(true);
      try {
        const newDoc = await api.uploadDocument(file);
        setDocuments((prev) => [newDoc, ...prev]);
      } catch (error) {
        window.alert(
          error instanceof Error ? error.message : "Document analysis failed",
        );
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="space-y-lg">
      {/* Title */}
      <div className="flex flex-wrap justify-between items-center gap-md pb-sm border-b border-outline-variant">
        <div>
          <h2 className="font-headline-lg text-headline-lg font-bold text-primary">
            AI Document Intelligence & Analysis
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
            Upload your business licenses, tax filings, and permits for AI data
            extraction, issue detection, and expiry tracking.
          </p>
        </div>
      </div>

      {/* Notice Banner */}
      <div className="bg-primary-container text-on-primary-container p-md rounded-xl border border-primary-container flex items-start gap-md">
        <span className="material-symbols-outlined text-tertiary-fixed-dim text-[24px] shrink-0 mt-0.5">
          auto_awesome
        </span>
        <div className="text-xs space-y-1">
          <p className="font-bold text-on-primary text-sm">
            AI Document Intelligence System
          </p>
          <p>
            Extracts key identifiers, checks field consistency across documents,
            flags unreadable sections, and detects upcoming expiry dates.
          </p>
          <p className="text-[11px] opacity-80 italic">
            * Note: This tool assists in business document analysis and does not
            issue or legally authenticate government certificates.
          </p>
        </div>
      </div>

      {/* Upload Dropzone */}
      <div className="bg-surface-container-lowest border-2 border-dashed border-secondary/40 rounded-xl p-lg text-center hover:border-secondary transition-all">
        <div className="flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-secondary-fixed/50 flex items-center justify-center mb-sm text-secondary">
            <span className="material-symbols-outlined text-[32px]">
              cloud_upload
            </span>
          </div>
          <h3 className="font-title-md text-title-md font-bold text-primary mb-xs">
            Upload Business Document for AI Analysis
          </h3>
          <p className="font-body-md text-xs text-on-surface-variant max-w-md mb-md">
            Drag & drop PDF files, scanned NOCs, GST returns, Udyam
            certificates, or electricity bills.
          </p>

          <label className="px-lg py-2.5 rounded-lg bg-secondary text-on-secondary hover:bg-secondary-container font-label-md text-xs font-bold transition-colors cursor-pointer flex items-center gap-xs shadow-xs">
            <span className="material-symbols-outlined text-[18px]">
              file_upload
            </span>
            <span>
              {isUploading
                ? "Analyzing Document with AI..."
                : "Select File from Computer"}
            </span>
            <input
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={handleFileUpload}
              className="hidden"
              disabled={isUploading}
            />
          </label>
        </div>
      </div>

      {/* Document Analysis Cards List */}
      <div className="space-y-md">
        <h3 className="font-headline-md text-headline-md font-bold text-primary flex items-center gap-xs">
          <span className="material-symbols-outlined text-secondary text-[24px]">
            folder_managed
          </span>
          <span>Analyzed Business Documents ({documents.length})</span>
        </h3>

        <div className="grid grid-cols-1 gap-gutter">
          {documents.map((doc) => (
            <DocumentAnalysisCard
              key={doc.id}
              document={doc}
              onInspect={(d) => setSelectedDoc(d)}
            />
          ))}
        </div>
      </div>

      {/* Inspection Modal */}
      <Modal
        isOpen={!!selectedDoc}
        onClose={() => setSelectedDoc(null)}
        title={selectedDoc?.fileName || "Document Intelligence"}
        subtitle={`Document Type: ${selectedDoc?.fileType} | Confidence: ${selectedDoc?.confidenceScore}%`}
      >
        {selectedDoc && (
          <div className="space-y-md">
            <div>
              <h4 className="font-label-md text-xs font-bold text-primary mb-xs uppercase">
                Extracted Key Data
              </h4>
              <div className="bg-surface-container-low p-sm rounded-lg border border-outline-variant space-y-1 text-xs">
                {selectedDoc.extractedFields.map((f, i) => (
                  <div
                    key={i}
                    className="flex justify-between py-0.5 border-b border-outline-variant/30 last:border-0"
                  >
                    <span className="text-on-surface-variant font-medium">
                      {f.label}:
                    </span>
                    <span className="font-bold text-primary">{f.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {selectedDoc.detectedIssues.length > 0 && (
              <div>
                <h4 className="font-label-md text-xs font-bold text-error mb-xs uppercase">
                  Detected Issues
                </h4>
                <ul className="bg-error-container/30 p-sm rounded-lg border border-error/20 space-y-1 text-xs text-on-error-container">
                  {selectedDoc.detectedIssues.map((issue, i) => (
                    <li key={i} className="flex items-center gap-1 font-medium">
                      <span>• {issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {selectedDoc.review && (
              <div className="space-y-sm">
                <div>
                  <h4 className="font-label-md text-xs font-bold text-primary mb-xs uppercase">
                    AI Document Review Report
                  </h4>
                  <p className="bg-surface-container-low p-sm rounded-lg border border-outline-variant text-xs text-on-surface-variant">
                    {selectedDoc.review.reviewReport}
                  </p>
                </div>
                {selectedDoc.review.profileMatches.length > 0 && (
                  <div className="bg-tertiary-container/10 border border-tertiary/20 p-sm rounded-lg text-xs">
                    <h4 className="font-label-md font-bold text-tertiary mb-xs uppercase">
                      Profile Matches
                    </h4>
                    <ul className="space-y-1">
                      {selectedDoc.review.profileMatches.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {selectedDoc.review.profileMismatches.length > 0 && (
                  <div className="bg-error-container/30 border border-error/20 p-sm rounded-lg text-xs text-on-error-container">
                    <h4 className="font-label-md font-bold text-error mb-xs uppercase">
                      Profile Mismatches
                    </h4>
                    <ul className="space-y-1">
                      {selectedDoc.review.profileMismatches.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {selectedDoc.review.missingInformation.length > 0 && (
                  <div className="bg-secondary-fixed/20 border border-secondary/20 p-sm rounded-lg text-xs">
                    <h4 className="font-label-md font-bold text-secondary mb-xs uppercase">
                      Missing or Unreadable Information
                    </h4>
                    <ul className="space-y-1">
                      {selectedDoc.review.missingInformation.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {selectedDoc.review.ragGuidance.length > 0 && (
                  <div>
                    <h4 className="font-label-md text-xs font-bold text-primary mb-xs uppercase">
                      Relevant Guidance
                    </h4>
                    <ul className="bg-surface-container-low p-sm rounded-lg border border-outline-variant space-y-1 text-xs">
                      {selectedDoc.review.ragGuidance.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};
