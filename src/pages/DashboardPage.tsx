import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ComplianceGauge } from "../components/ComplianceGauge";
import { KpiCard } from "../components/KpiCard";
import { AiRecommendationCard } from "../components/AiRecommendationCard";
import {
  initialBusinessProfile,
  initialActionItems,
  initialSchemesList,
} from "../services/mockData";
import { api } from "../services/api";
import { ActionItem, DeadlineItem } from "../types";

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const profile = initialBusinessProfile;
  const [renewalActions, setRenewalActions] = useState<ActionItem[]>([]);
  const [renewalDeadlines, setRenewalDeadlines] = useState<DeadlineItem[]>([]);

  useEffect(() => {
    Promise.all([api.getActionItems(), api.getDeadlines()]).then(
      ([actions, deadlines]) => {
        setRenewalActions(
          actions.filter(
            (item) =>
              item.title.startsWith("Renew ") && item.status !== "Completed",
          ),
        );
        setRenewalDeadlines(
          deadlines.filter(
            (item) =>
              item.category === "Document Renewal" &&
              item.status !== "Completed",
          ),
        );
      },
    );
  }, []);

  return (
    <div className="space-y-lg">
      {/* Welcome Header */}
      <div className="flex flex-wrap justify-between items-end gap-md">
        <div>
          <h2 className="font-headline-lg text-headline-lg font-bold text-primary">
            Good morning, Rajesh 👋
          </h2>
          <p className="font-title-md text-title-md text-on-surface-variant mt-xs">
            Here’s what your business needs attention on today.
          </p>
        </div>

        <div className="flex items-center gap-sm">
          <button
            onClick={() => navigate("/documents")}
            className="px-md py-2 rounded-lg bg-surface-container-lowest border border-outline-variant text-primary hover:bg-surface-container-high font-label-md text-xs font-semibold transition-colors flex items-center gap-xs shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary">
              upload_file
            </span>
            <span>Upload Document</span>
          </button>
          <button
            onClick={() => navigate("/assistant")}
            className="px-md py-2 rounded-lg bg-secondary text-on-secondary hover:bg-secondary-container font-label-md text-xs font-bold transition-colors flex items-center gap-xs shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">
              auto_awesome
            </span>
            <span>Ask AI Assistant</span>
          </button>
        </div>
      </div>

      {renewalActions.length > 0 && (
        <div className="bg-error-container/50 border border-error/30 rounded-xl p-md flex flex-wrap items-center justify-between gap-md">
          <div className="flex items-start gap-sm">
            <span className="material-symbols-outlined text-error text-[24px]">
              notification_important
            </span>
            <div>
              <p className="font-title-md text-title-md font-bold text-on-error-container">
                Document renewal requires attention
              </p>
              <p className="font-body-md text-xs text-on-error-container mt-xs">
                {renewalActions[0].title} is due{" "}
                {renewalDeadlines[0]
                  ? `on ${renewalDeadlines[0].dueDate}`
                  : "soon"}
                .
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/actions")}
            className="px-md py-2 rounded-lg bg-error text-on-error font-label-md text-xs font-bold transition-colors"
          >
            Review Action
          </button>
        </div>
      )}

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-gutter">
        {/* Business Profile Summary (Col 1-8) */}
        <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-xl border border-outline-variant p-md flex flex-col justify-between shadow-sm">
          <div className="flex justify-between items-start mb-md">
            <div>
              <div className="flex items-center gap-sm">
                <h3 className="font-title-lg text-title-lg font-bold text-primary">
                  {profile.businessName}
                </h3>
                <span className="bg-secondary-fixed/60 text-secondary text-xs px-2 py-0.5 rounded font-semibold">
                  {profile.entityType}
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-xs mt-xs">
                <span className="material-symbols-outlined text-[16px]">
                  factory
                </span>
                <span>{profile.sector}</span>
                <span className="text-outline-variant mx-xs">|</span>
                <span className="material-symbols-outlined text-[16px]">
                  location_on
                </span>
                <span>
                  {profile.district}, {profile.state}
                </span>
              </p>
            </div>
            <button
              onClick={() => navigate("/business")}
              className="px-md py-1.5 rounded-lg bg-surface-container-low border border-outline-variant font-label-md text-xs font-semibold text-on-surface hover:bg-surface-container-high transition-colors"
            >
              Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-sm mt-md">
            <div className="bg-surface-container-low p-sm rounded-lg border border-outline-variant">
              <span className="font-label-md text-xs text-on-surface-variant block mb-xs">
                Udyam Status
              </span>
              <span className="font-body-md text-xs text-on-tertiary-container bg-tertiary-fixed-dim/20 px-2 py-1 rounded flex items-center gap-xs w-max font-bold">
                <span className="material-symbols-outlined text-[14px]">
                  check_circle
                </span>
                {profile.udyamStatus}
              </span>
            </div>

            <div className="bg-surface-container-low p-sm rounded-lg border border-outline-variant">
              <span className="font-label-md text-xs text-on-surface-variant block mb-xs">
                Turnover ({profile.turnoverFY})
              </span>
              <span className="font-title-md text-title-md font-bold text-primary">
                ₹{profile.turnoverValue} Cr
              </span>
            </div>

            <div className="bg-surface-container-low p-sm rounded-lg border border-outline-variant">
              <span className="font-label-md text-xs text-on-surface-variant block mb-xs">
                Next Major Renewal
              </span>
              <span className="font-title-md text-title-md font-bold text-error truncate block">
                {profile.nextRenewal}
              </span>
            </div>
          </div>
        </div>

        {/* Compliance Health Gauge (Col 9-12) */}
        <div className="col-span-12 lg:col-span-4">
          <ComplianceGauge score={profile.complianceHealthScore} />
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
        <KpiCard
          title="Relevant Schemes"
          value={5}
          icon="account_balance"
          subtitle="Matching business profile"
          onClick={() => navigate("/schemes")}
        />
        <KpiCard
          title="Active Opportunities"
          value={8}
          icon="assignment"
          subtitle="Tenders & Subsidies"
          onClick={() => navigate("/tenders")}
        />
        <KpiCard
          title="Upcoming Deadlines"
          value={3}
          icon="event"
          subtitle="Due within 30 days"
          iconBgColor="bg-error-container"
          iconTextColor="text-on-error-container"
          valueColor="text-error"
          onClick={() => navigate("/deadlines")}
        />
        <KpiCard
          title="Documents Reviewed"
          value={12}
          icon="description"
          subtitle="AI Intelligence Extracted"
          onClick={() => navigate("/documents")}
        />
      </div>

      {/* Priority AI Recommendations Section */}
      <div className="space-y-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-xs">
            <span className="material-symbols-outlined text-[24px] text-secondary">
              auto_awesome
            </span>
            <h3 className="font-headline-md text-headline-md font-bold text-primary">
              AI Priority Recommendations
            </h3>
          </div>
          <button
            onClick={() => navigate("/actions")}
            className="text-xs font-bold text-secondary hover:underline flex items-center gap-xs"
          >
            <span>View All Action Items ({initialActionItems.length})</span>
            <span className="material-symbols-outlined text-[16px]">
              arrow_forward
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          <AiRecommendationCard
            title="Renew TNPCB Pollution Consent to Operate (CTO)"
            category="Environmental Compliance"
            urgency="critical"
            impact="Avoid Operational Closure Notice"
            dueDate="2026-09-08"
            description="Your Tamil Nadu Pollution Control Board CTO expires in 18 days. Submit your quarterly water analysis report to avoid statutory penalty notices."
            onAction={() => navigate("/documents")}
          />

          <AiRecommendationCard
            title="Apply for CGTMSE Collateral-Free Credit Scheme"
            category="Capital Subsidy"
            urgency="high"
            impact="Unlock ₹50 Lakh Credit Line"
            description="ABC Engineering Pvt Ltd qualifies for CGTMSE collateral-free bank credit based on 2-year audited manufacturing turnover."
            onAction={() => navigate("/schemes")}
          />
        </div>
      </div>
    </div>
  );
};
