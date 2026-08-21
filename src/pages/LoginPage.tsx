import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('rajesh@abcengineering.in');
  const [password, setPassword] = useState('••••••••••••');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-md">
      <div className="w-full max-w-md bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-lg">
        {/* Brand */}
        <div className="flex flex-col items-center mb-lg text-center">
          <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center text-on-primary mb-sm">
            <span className="material-symbols-outlined text-[32px]">smart_toy</span>
          </div>
          <h1 className="font-headline-md text-headline-md font-bold text-primary">MSME AI</h1>
          <p className="font-body-md text-sm text-on-surface-variant mt-1">
            Intelligent Compliance & Business Opportunity Operating System
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-md">
          <div>
            <label className="block font-label-md text-xs font-semibold text-primary mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-sm text-sm focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary-container/40"
              placeholder="name@business.com"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-label-md text-xs font-semibold text-primary">
                Password
              </label>
              <a href="#" className="text-xs font-semibold text-secondary hover:underline">
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-sm text-sm focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary-container/40"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-secondary text-on-secondary hover:bg-secondary-container font-label-md text-sm font-bold transition-colors shadow-sm"
          >
            Sign In to OS Dashboard
          </button>
        </form>

        <div className="mt-lg pt-md border-t border-outline-variant text-center">
          <p className="font-body-md text-xs text-on-surface-variant">
            Don’t have an MSME AI account?{' '}
            <Link to="/signup" className="font-bold text-secondary hover:underline">
              Register Business Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
