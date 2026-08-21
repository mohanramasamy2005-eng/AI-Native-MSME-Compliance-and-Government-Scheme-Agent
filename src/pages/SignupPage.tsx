import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    mobile: '',
    sector: 'Manufacturing',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-md">
      <div className="w-full max-w-lg bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-lg">
        <div className="flex flex-col items-center mb-md text-center">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-on-primary mb-xs">
            <span className="material-symbols-outlined text-[28px]">smart_toy</span>
          </div>
          <h1 className="font-headline-md text-headline-md font-bold text-primary">
            Create MSME Profile
          </h1>
          <p className="font-body-md text-xs text-on-surface-variant mt-1">
            Setup your AI compliance & opportunity assistant in 2 simple steps
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
            <div>
              <label className="block font-label-md text-xs font-semibold text-primary mb-1">
                Business Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. ABC Engineering Ltd"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-sm text-sm focus:outline-none focus:border-secondary"
              />
            </div>
            <div>
              <label className="block font-label-md text-xs font-semibold text-primary mb-1">
                Owner / Director Name
              </label>
              <input
                type="text"
                required
                placeholder="Rajesh Kumar"
                value={formData.ownerName}
                onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-sm text-sm focus:outline-none focus:border-secondary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
            <div>
              <label className="block font-label-md text-xs font-semibold text-primary mb-1">
                Work Email
              </label>
              <input
                type="email"
                required
                placeholder="rajesh@abcengineering.in"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-sm text-sm focus:outline-none focus:border-secondary"
              />
            </div>
            <div>
              <label className="block font-label-md text-xs font-semibold text-primary mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-sm text-sm focus:outline-none focus:border-secondary"
              />
            </div>
          </div>

          <div>
            <label className="block font-label-md text-xs font-semibold text-primary mb-1">
              Industry Sector
            </label>
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
              <option>Technology & IT Services</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-secondary text-on-secondary hover:bg-secondary-container font-label-md text-sm font-bold transition-colors shadow-sm"
          >
            Continue to Business Onboarding Wizard →
          </button>
        </form>

        <div className="mt-lg pt-md border-t border-outline-variant text-center">
          <p className="font-body-md text-xs text-on-surface-variant">
            Already registered?{' '}
            <Link to="/login" className="font-bold text-secondary hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
