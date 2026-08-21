import React from 'react';
import { DocumentItem } from '../types';
import { StatusBadge } from './StatusBadge';

interface DocumentAnalysisCardProps {
  document: DocumentItem;
  onInspect?: (doc: DocumentItem) => void;
}

export const DocumentAnalysisCard: React.FC<DocumentAnalysisCardProps> = ({ document, onInspect }) => {
  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-md shadow-sm hover:shadow-md transition-all">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-sm mb-md pb-sm border-b border-outline-variant/60">
        <div className="flex items-start gap-sm">
          <div className="w-10 h-10 rounded-lg bg-secondary-fixed flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-secondary text-[22px]">description</span>
          </div>
          <div>
            <h3 className="font-title-md text-title-md font-bold text-primary">{document.fileName}</h3>
            <p className="font-body-md text-xs text-on-surface-variant flex items-center gap-xs mt-0.5">
              <span className="font-semibold text-secondary">{document.fileType}</span>
              <span>•</span>
              <span>Uploaded {document.uploadDate}</span>
              <span>•</span>
              <span>{document.fileSize}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-sm">
          <div className="flex items-center gap-1 bg-surface-container-high px-2.5 py-1 rounded-lg text-xs font-semibold text-primary">
            <span className="material-symbols-outlined text-[16px] text-secondary">auto_awesome</span>
            <span>AI Confidence: {document.confidenceScore}%</span>
          </div>
          <StatusBadge status={document.status} />
        </div>
      </div>

      {/* Extracted Key Metadata Fields */}
      {document.extractedFields && document.extractedFields.length > 0 && (
        <div className="mb-md">
          <h4 className="font-label-md text-xs font-bold text-primary uppercase tracking-wider mb-xs flex items-center gap-xs">
            <span className="material-symbols-outlined text-[16px] text-secondary">manage_search</span>
            Extracted Key Data Points
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-xs bg-surface-container-low p-sm rounded-lg border border-outline-variant">
            {document.extractedFields.map((field, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs p-1 rounded hover:bg-surface-container">
                <span className="text-on-surface-variant font-medium">{field.label}:</span>
                <span className="font-semibold text-primary">{field.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detected Issues / Missing / Inconsistencies */}
      {document.detectedIssues && document.detectedIssues.length > 0 && (
        <div className="mb-md bg-error-container/40 border border-error/20 p-sm rounded-lg">
          <h4 className="font-label-md text-xs font-bold text-error uppercase tracking-wider mb-xs flex items-center gap-xs">
            <span className="material-symbols-outlined text-[16px] text-error">report_problem</span>
            Detected Inconsistencies & Issues ({document.detectedIssues.length})
          </h4>
          <ul className="space-y-1">
            {document.detectedIssues.map((issue, idx) => (
              <li key={idx} className="text-xs text-on-error-container flex items-start gap-xs font-medium">
                <span className="material-symbols-outlined text-[14px] text-error shrink-0 mt-0.5">warning</span>
                <span>{issue}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* AI Recommendations */}
      {document.recommendations && document.recommendations.length > 0 && (
        <div className="mb-md bg-secondary-fixed/20 border border-secondary/20 p-sm rounded-lg">
          <h4 className="font-label-md text-xs font-bold text-secondary uppercase tracking-wider mb-xs flex items-center gap-xs">
            <span className="material-symbols-outlined text-[16px] text-secondary">lightbulb</span>
            AI Recommended Actions
          </h4>
          <ul className="space-y-1">
            {document.recommendations.map((rec, idx) => (
              <li key={idx} className="text-xs text-primary flex items-start gap-xs font-medium">
                <span className="material-symbols-outlined text-[14px] text-secondary shrink-0 mt-0.5">arrow_right</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Footer action */}
      <div className="flex justify-end pt-sm border-t border-outline-variant">
        <button
          onClick={() => onInspect && onInspect(document)}
          className="px-md py-1.5 rounded-lg bg-secondary text-on-secondary hover:bg-secondary-container font-label-md text-xs font-bold transition-colors flex items-center gap-xs"
        >
          <span>View Full Extracted Intelligence</span>
          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
