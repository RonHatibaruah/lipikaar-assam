import React, { useState } from 'react';
import { X, Lock, ShieldCheck, KeyRound, User, CheckCircle2, AlertCircle } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { name: string; email: string; role: string }) => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate credentials
    if (
      (email === 'admin@assam.gov.in' && password === 'Admin@Assam2026') ||
      (email === 'superintendent@assam.gov.in' && password === 'AssamGov#2026') ||
      (email === 'superintendent' && password === 'AssamGov#2026')
    ) {
      setError('');
      onLoginSuccess({
        name: email.includes('superintendent') ? 'Dr. H. K. Nath (Press Superintendent)' : 'State System Administrator',
        email,
        role: email.includes('superintendent') ? 'superintendent' : 'super_admin'
      });
      onClose();
    } else {
      setError('Invalid administrative credentials. Use the Demo Account buttons below.');
    }
  };

  const fillDemoCredentials = (type: 'admin' | 'superintendent') => {
    if (type === 'admin') {
      setEmail('admin@assam.gov.in');
      setPassword('Admin@Assam2026');
    } else {
      setEmail('superintendent@assam.gov.in');
      setPassword('AssamGov#2026');
    }
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Government Admin Access</h3>
              <p className="text-xs text-slate-400">Directorate of Printing & Stationery Portal</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-md">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleLogin} className="p-6 space-y-4">
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs px-3.5 py-2.5 rounded-lg flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Official Email / Username:
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@assam.gov.in"
                className="w-full text-xs pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Secure Password:
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full text-xs pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs py-2.5 rounded-lg shadow transition flex items-center justify-center space-x-1.5"
          >
            <Lock className="w-3.5 h-3.5 text-slate-950" />
            <span>Sign In to Admin Console</span>
          </button>

          {/* Quick Demo Credentials Autofill */}
          <div className="pt-2 border-t border-slate-100">
            <p className="text-[11px] font-semibold text-slate-500 mb-2">
              Click to autofill Demo Credentials for testing:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => fillDemoCredentials('admin')}
                className="text-left p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-amber-50/70 hover:border-amber-300 text-xs transition"
              >
                <div className="font-bold text-slate-800">Admin Account</div>
                <div className="text-[10px] text-slate-500 font-mono">admin@assam.gov.in</div>
                <div className="text-[10px] text-amber-700 font-mono">Pass: Admin@Assam2026</div>
              </button>

              <button
                type="button"
                onClick={() => fillDemoCredentials('superintendent')}
                className="text-left p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-emerald-50/70 hover:border-emerald-300 text-xs transition"
              >
                <div className="font-bold text-slate-800">Superintendent</div>
                <div className="text-[10px] text-slate-500 font-mono">superintendent</div>
                <div className="text-[10px] text-emerald-700 font-mono">Pass: AssamGov#2026</div>
              </button>
            </div>
          </div>
        </form>

        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 text-center text-[11px] text-slate-500">
          Protected by SDC Assam Role-Based Authentication & DPDP Compliance
        </div>
      </div>
    </div>
  );
};
