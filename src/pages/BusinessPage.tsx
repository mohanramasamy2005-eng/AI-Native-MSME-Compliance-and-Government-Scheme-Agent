import React, { useState } from 'react';
import { initialBusinessProfile } from '../services/mockData';
import { StatusBadge } from '../components/StatusBadge';

export const BusinessPage: React.FC = () => {
  const [profile, setProfile] = useState(initialBusinessProfile);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-lg">
      {/* Page Title & Header */}
      <div className="flex flex-wrap justify-between items-center gap-md pb-sm border-b border-outline-variant">
        <div>
          <h2 className="font-headline-lg text-headline-lg font-bold text-primary">
            Business Profile & Operating Details
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
            Manage your registered MSME profile data used by AI to compute compliance requirements and scheme eligibility.
          </p>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-lg py-2 rounded-lg bg-secondary text-on-secondary hover:bg-secondary-container font-label-md text-xs font-bold transition-colors flex items-center gap-xs shadow-xs"
        >
          <span className="material-symbols-outlined text-[18px]">
            {isEditing ? 'check' : 'edit'}
          </span>
          <span>{isEditing ? 'Save Profile Changes' : 'Edit Profile Information'}</span>
        </button>
      </div>

      {/* Primary Profile Card */}
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-lg shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-md mb-lg">
          <div className="flex items-start gap-md">
            <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center text-on-primary font-bold text-xl shrink-0">
              ABC
            </div>
            <div>
              <div className="flex items-center gap-sm">
                <h3 className="font-headline-md text-headline-md font-bold text-primary">
                  {profile.businessName}
                </h3>
                <StatusBadge status="verified" label="AI Verified Profile" />
              </div>
              <p className="font-body-md text-sm text-on-surface-variant font-medium mt-1">
                Trade Name: <span className="text-primary font-semibold">{profile.tradeName}</span>
              </p>
            </div>
          </div>

          <div className="bg-surface-container-low px-md py-sm rounded-lg border border-outline-variant text-right">
            <span className="font-label-md text-xs text-on-surface-variant block">Compliance Health</span>
            <span className="font-headline-lg text-headline-lg font-bold text-tertiary-container">
              {profile.complianceHealthScore}%
            </span>
          </div>
        </div>

        {/* Detailed Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
          <div className="bg-surface-container-low p-md rounded-lg border border-outline-variant space-y-1">
            <span className="font-label-md text-xs text-on-surface-variant block uppercase tracking-wider">
              Entity Structure
            </span>
            {isEditing ? (
              <input
                type="text"
                value={profile.entityType}
                onChange={(e) => setProfile({ ...profile, entityType: e.target.value })}
                className="w-full bg-surface-container-lowest border rounded p-1 text-sm font-semibold"
              />
            ) : (
              <span className="font-title-md text-title-md font-bold text-primary">{profile.entityType}</span>
            )}
          </div>

          <div className="bg-surface-container-low p-md rounded-lg border border-outline-variant space-y-1">
            <span className="font-label-md text-xs text-on-surface-variant block uppercase tracking-wider">
              Industry Sector
            </span>
            {isEditing ? (
              <input
                type="text"
                value={profile.sector}
                onChange={(e) => setProfile({ ...profile, sector: e.target.value as any })}
                className="w-full bg-surface-container-lowest border rounded p-1 text-sm font-semibold"
              />
            ) : (
              <span className="font-title-md text-title-md font-bold text-primary">{profile.sector}</span>
            )}
          </div>

          <div className="bg-surface-container-low p-md rounded-lg border border-outline-variant space-y-1">
            <span className="font-label-md text-xs text-on-surface-variant block uppercase tracking-wider">
              Annual Turnover ({profile.turnoverFY})
            </span>
            <span className="font-title-md text-title-md font-bold text-primary">₹{profile.turnoverValue} Crore</span>
          </div>

          <div className="bg-surface-container-low p-md rounded-lg border border-outline-variant space-y-1">
            <span className="font-label-md text-xs text-on-surface-variant block uppercase tracking-wider">
              Udyam Registration No
            </span>
            <span className="font-code-md text-sm font-mono font-bold text-primary">
              {profile.udyamRegistrationNo}
            </span>
          </div>

          <div className="bg-surface-container-low p-md rounded-lg border border-outline-variant space-y-1">
            <span className="font-label-md text-xs text-on-surface-variant block uppercase tracking-wider">
              GSTIN Registration
            </span>
            <span className="font-code-md text-sm font-mono font-bold text-primary">
              {profile.gstin}
            </span>
          </div>

          <div className="bg-surface-container-low p-md rounded-lg border border-outline-variant space-y-1">
            <span className="font-label-md text-xs text-on-surface-variant block uppercase tracking-wider">
              Permanent Account Number (PAN)
            </span>
            <span className="font-code-md text-sm font-mono font-bold text-primary">
              {profile.pan}
            </span>
          </div>

          <div className="bg-surface-container-low p-md rounded-lg border border-outline-variant space-y-1">
            <span className="font-label-md text-xs text-on-surface-variant block uppercase tracking-wider">
              Registered Location
            </span>
            <span className="font-title-md text-sm font-semibold text-primary">
              {profile.location}, {profile.district}, {profile.state}
            </span>
          </div>

          <div className="bg-surface-container-low p-md rounded-lg border border-outline-variant space-y-1">
            <span className="font-label-md text-xs text-on-surface-variant block uppercase tracking-wider">
              Total Employees
            </span>
            <span className="font-title-md text-sm font-semibold text-primary">
              {profile.employeeCount} Registered Workers
            </span>
          </div>

          <div className="bg-surface-container-low p-md rounded-lg border border-outline-variant space-y-1">
            <span className="font-label-md text-xs text-on-surface-variant block uppercase tracking-wider">
              Incorporation Year
            </span>
            <span className="font-title-md text-sm font-semibold text-primary">
              {profile.incorporationYear}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
