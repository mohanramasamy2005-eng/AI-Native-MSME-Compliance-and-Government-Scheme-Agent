import React, { useState } from 'react';

export const SettingsPage: React.FC = () => {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [autoExtract, setAutoExtract] = useState(true);

  return (
    <div className="space-y-lg max-w-4xl">
      <div className="pb-sm border-b border-outline-variant">
        <h2 className="font-headline-lg text-headline-lg font-bold text-primary">
          System Settings & Preferences
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant mt-xs">
          Configure notifications, document storage privacy, and AI engine preferences.
        </p>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md space-y-md shadow-sm">
        <h3 className="font-title-lg text-title-lg font-bold text-primary flex items-center gap-xs">
          <span className="material-symbols-outlined text-secondary">notifications</span>
          <span>Compliance Reminder Alerts</span>
        </h3>

        <div className="space-y-sm text-xs">
          <label className="flex items-center justify-between p-sm bg-surface-container-low rounded-lg border border-outline-variant cursor-pointer">
            <div>
              <p className="font-bold text-primary">Email Notifications</p>
              <p className="text-on-surface-variant">Receive weekly compliance digests and 15-day deadline alerts.</p>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="w-4 h-4 text-secondary rounded"
            />
          </label>

          <label className="flex items-center justify-between p-sm bg-surface-container-low rounded-lg border border-outline-variant cursor-pointer">
            <div>
              <p className="font-bold text-primary">WhatsApp Urgency Reminders</p>
              <p className="text-on-surface-variant">Get instant WhatsApp alerts 3 days before critical license expiry dates.</p>
            </div>
            <input
              type="checkbox"
              checked={whatsappAlerts}
              onChange={(e) => setWhatsappAlerts(e.target.checked)}
              className="w-4 h-4 text-secondary rounded"
            />
          </label>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md space-y-md shadow-sm">
        <h3 className="font-title-lg text-title-lg font-bold text-primary flex items-center gap-xs">
          <span className="material-symbols-outlined text-secondary">security</span>
          <span>AI Document Intelligence Privacy</span>
        </h3>

        <div className="space-y-sm text-xs">
          <label className="flex items-center justify-between p-sm bg-surface-container-low rounded-lg border border-outline-variant cursor-pointer">
            <div>
              <p className="font-bold text-primary">Automatic OCR & Field Extraction</p>
              <p className="text-on-surface-variant">Automatically analyze uploaded PDFs and extract GST, Udyam, and expiry fields.</p>
            </div>
            <input
              type="checkbox"
              checked={autoExtract}
              onChange={(e) => setAutoExtract(e.target.checked)}
              className="w-4 h-4 text-secondary rounded"
            />
          </label>

          <div className="p-sm bg-secondary-fixed/20 border border-secondary/20 rounded-lg text-primary">
            <p className="font-bold text-secondary mb-0.5">Data Privacy Guarantee</p>
            <p>Your uploaded business documents are stored securely with end-to-end encryption and are used strictly for analysis for your MSME account.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
