import React from 'react';
import { X, ShieldCheck, AlertTriangle, AlertCircle, Info, BookOpen } from 'lucide-react';
import { LinterAlert } from '../utils/gazetteLinter';
import { GazetteDocument } from '../types';

interface ComplianceModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: GazetteDocument;
  alerts: LinterAlert[];
}

export const ComplianceModal: React.FC<ComplianceModalProps> = ({
  isOpen,
  onClose,
  document,
  alerts
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold">Assam Gazette Statutory Compliance Audit</h3>
              <p className="text-xs text-slate-400">Verifying Boilerplates, Saka Calendar & Numbering Standards</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-md">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Document Summary Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-500">Document Title:</span>
              <span className="font-semibold text-slate-800">{document.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Classification:</span>
              <span className="font-semibold text-slate-800">{document.gazetteType} ({document.gazetteNumber})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Gregorian vs Saka Date:</span>
              <span className="font-semibold text-slate-800">{document.issueDate} / {document.sakaDate}</span>
            </div>
          </div>

          {/* Audit Results */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              Automated Statutory Linter Findings:
            </h4>

            {alerts.length === 0 ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
                <ShieldCheck className="w-8 h-8 text-emerald-600 mx-auto mb-1.5" />
                <h5 className="text-sm font-bold text-emerald-900">100% Statutory Compliance Passed</h5>
                <p className="text-xs text-emerald-700 mt-0.5">
                  Mandatory Governor formulas, notification numbering syntax, and calendar alignments adhere fully to The Assam Gazette Rules.
                </p>
              </div>
            ) : (
              alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`border rounded-xl p-3.5 space-y-1.5 text-xs ${
                    alert.level === 'error'
                      ? 'bg-rose-50 border-rose-200 text-rose-900'
                      : alert.level === 'warning'
                      ? 'bg-amber-50 border-amber-200 text-amber-900'
                      : 'bg-sky-50 border-sky-200 text-sky-900'
                  }`}
                >
                  <div className="flex items-center space-x-2 font-bold">
                    {alert.level === 'error' ? (
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    ) : alert.level === 'warning' ? (
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    ) : (
                      <Info className="w-4 h-4 text-sky-600 shrink-0" />
                    )}
                    <span>{alert.title}</span>
                  </div>
                  <p className="leading-relaxed pl-6">{alert.message}</p>
                  <div className="pl-6 pt-1 flex items-center space-x-1.5 text-[11px] opacity-80">
                    <BookOpen className="w-3 h-3" />
                    <span>Statutory Reference: {alert.ruleReference}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold px-4 py-2 rounded-lg transition"
          >
            Close Audit Report
          </button>
        </div>
      </div>
    </div>
  );
};
