import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: 'ABC Engineering Pvt Ltd',
    tradeName: 'ABC Precision Tools',
    entityType: 'Private Limited Company',
    sector: 'Manufacturing',
    state: 'Tamil Nadu',
    district: 'Coimbatore',
    turnover: '1.2 Cr',
    udyamStatus: 'Active',
    udyamNo: 'UDYAM-TN-03-0049281',
    gstin: '33AAACA1234F1Z9',
    employees: '24'
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-background p-md sm:p-lg flex flex-col justify-center items-center">
      <div className="w-full max-w-3xl bg-surface-container-lowest border border-outline-variant rounded-xl p-md sm:p-xl shadow-lg">
        {/* Progress Bar */}
        <div className="mb-lg">
          <div className="flex justify-between items-center text-xs font-semibold text-on-surface-variant mb-xs">
            <span>Step {step} of 3: {step === 1 ? 'Business Identity' : step === 2 ? 'Turnover & Identifiers' : 'Compliance & Preferences'}</span>
            <span>{Math.round((step / 3) * 100)}% Completed</span>
          </div>
          <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
            <div
              className="bg-secondary h-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-md animate-in fade-in duration-200">
            <div className="border-b border-outline-variant pb-xs">
              <h2 className="font-title-lg text-title-lg font-bold text-primary">Business Profile & Entity</h2>
              <p className="font-body-md text-xs text-on-surface-variant">Provide your registered business details to customize compliance rules.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
              <div>
                <label className="block font-label-md text-xs font-semibold text-primary mb-1">Legal Business Name</label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-sm text-sm focus:outline-none focus:border-secondary"
                />
              </div>

              <div>
                <label className="block font-label-md text-xs font-semibold text-primary mb-1">Trade Name (If Different)</label>
                <input
                  type="text"
                  value={formData.tradeName}
                  onChange={(e) => setFormData({ ...formData, tradeName: e.target.value })}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-sm text-sm focus:outline-none focus:border-secondary"
                />
              </div>

              <div>
                <label className="block font-label-md text-xs font-semibold text-primary mb-1">Entity Structure</label>
                <select
                  value={formData.entityType}
                  onChange={(e) => setFormData({ ...formData, entityType: e.target.value })}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-sm text-sm focus:outline-none focus:border-secondary"
                >
                  <option>Private Limited Company</option>
                  <option>Sole Proprietorship</option>
                  <option>Partnership Firm</option>
                  <option>Limited Liability Partnership (LLP)</option>
                  <option>Public Limited Company</option>
                </select>
              </div>

              <div>
                <label className="block font-label-md text-xs font-semibold text-primary mb-1">Primary Sector</label>
                <select
                  value={formData.sector}
                  onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-sm text-sm focus:outline-none focus:border-secondary"
                >
                  <option>Manufacturing</option>
                  <option>Services</option>
                  <option>Retail & Wholesale</option>
                  <option>Textiles & Garments</option>
                  <option>Agri & Food Processing</option>
                </select>
              </div>

              <div>
                <label className="block font-label-md text-xs font-semibold text-primary mb-1">State / UT</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-sm text-sm focus:outline-none focus:border-secondary"
                />
              </div>

              <div>
                <label className="block font-label-md text-xs font-semibold text-primary mb-1">District / Hub</label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-sm text-sm focus:outline-none focus:border-secondary"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-md animate-in fade-in duration-200">
            <div className="border-b border-outline-variant pb-xs">
              <h2 className="font-title-lg text-title-lg font-bold text-primary">Turnover & Registration Identifiers</h2>
              <p className="font-body-md text-xs text-on-surface-variant">Used strictly to filter applicable tax slabs, scheme eligibility & subsidies.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
              <div>
                <label className="block font-label-md text-xs font-semibold text-primary mb-1">Annual Turnover (FY 2025-26)</label>
                <select
                  value={formData.turnover}
                  onChange={(e) => setFormData({ ...formData, turnover: e.target.value })}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-sm text-sm focus:outline-none focus:border-secondary"
                >
                  <option>Below ₹25 Lakhs (Micro)</option>
                  <option>₹25 Lakhs - ₹1 Crore</option>
                  <option>1.2 Cr</option>
                  <option>₹1 Cr - ₹5 Cr (Small)</option>
                  <option>₹5 Cr - ₹50 Cr (Medium)</option>
                </select>
              </div>

              <div>
                <label className="block font-label-md text-xs font-semibold text-primary mb-1">Udyam Registration Status</label>
                <select
                  value={formData.udyamStatus}
                  onChange={(e) => setFormData({ ...formData, udyamStatus: e.target.value })}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-sm text-sm focus:outline-none focus:border-secondary"
                >
                  <option>Active</option>
                  <option>Pending Registration</option>
                  <option>Not Registered</option>
                </select>
              </div>

              <div>
                <label className="block font-label-md text-xs font-semibold text-primary mb-1">Udyam Registration Number (Optional)</label>
                <input
                  type="text"
                  value={formData.udyamNo}
                  onChange={(e) => setFormData({ ...formData, udyamNo: e.target.value })}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-sm text-sm focus:outline-none focus:border-secondary"
                  placeholder="UDYAM-TN-00-0000000"
                />
              </div>

              <div>
                <label className="block font-label-md text-xs font-semibold text-primary mb-1">GSTIN Number (Optional)</label>
                <input
                  type="text"
                  value={formData.gstin}
                  onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-sm text-sm focus:outline-none focus:border-secondary"
                  placeholder="33AAAAA0000A1Z5"
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-md animate-in fade-in duration-200">
            <div className="border-b border-outline-variant pb-xs">
              <h2 className="font-title-lg text-title-lg font-bold text-primary">Compliance Categories & Notifications</h2>
              <p className="font-body-md text-xs text-on-surface-variant">Select which regulatory areas your business operates under.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-sm">
              {[
                { name: 'GST & Income Tax Returns', checked: true },
                { name: 'Pollution Control Board NOC (Air/Water)', checked: true },
                { name: 'Factory Inspectorate & Safety Acts', checked: true },
                { name: 'PF & ESI Employee Welfare Compliance', checked: true },
                { name: 'Food Safety (FSSAI) Licenses', checked: false },
                { name: 'Export-Import (IEC) & Custom Clearances', checked: true },
              ].map((item, idx) => (
                <label key={idx} className="flex items-center gap-sm bg-surface-container-low p-sm rounded-lg border border-outline-variant cursor-pointer hover:bg-surface-container">
                  <input type="checkbox" defaultChecked={item.checked} className="w-4 h-4 text-secondary rounded" />
                  <span className="text-xs font-semibold text-primary">{item.name}</span>
                </label>
              ))}
            </div>

            <div className="bg-secondary-fixed/30 p-sm rounded-lg border border-secondary/20 flex items-center gap-sm text-xs text-primary">
              <span className="material-symbols-outlined text-secondary text-[22px]">info</span>
              <span>Note: MSME AI automatically customizes scheme recommendations and compliance deadlines based on these settings.</span>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-between items-center mt-lg pt-md border-t border-outline-variant">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-md py-2 rounded-lg bg-surface-container-high text-primary hover:bg-outline-variant font-label-md text-xs font-semibold"
            >
              ← Back
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={handleNext}
            className="px-lg py-2.5 rounded-lg bg-secondary text-on-secondary hover:bg-secondary-container font-label-md text-xs font-bold transition-colors flex items-center gap-xs shadow-sm"
          >
            <span>{step === 3 ? 'Finish & Open OS Dashboard' : 'Next Step →'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
