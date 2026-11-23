import React from 'react';
import { GazetteDocument, QualityMetrics } from '../types';
import { LinterAlert } from '../utils/gazetteLinter';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  Calendar,
  Layers,
  FileCheck
} from 'lucide-react';

interface GazetteStatsProps {
  document: GazetteDocument;
  metrics: QualityMetrics;
  linterAlerts: LinterAlert[];
  onOpenCompliance: () => void;
}

export const GazetteStats: React.FC<GazetteStatsProps> = ({
  document,
  metrics,
  linterAlerts,
  onOpenCompliance
}) => {
  const hasComplianceErrors = linterAlerts.some(a => a.level === 'error');

  return (
    <div className="bg-white border-b border-slate-200 px-4 py-2.5 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Document Metadata Badges */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium flex items-center gap-1 border border-slate-200">
            <Layers className="w-3.5 h-3.5 text-slate-500" />
            <span>Type: <strong className="text-slate-900">{document.gazetteType}</strong></span>
          </span>
          <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium border border-slate-200">
            Gazette: <strong className="text-slate-900">{document.gazetteNumber}</strong>
          </span>
          <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium flex items-center gap-1 border border-slate-200">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>{document.issueDate}</span>
            <span className="text-slate-400">|</span>
            <span className="text-amber-800 font-semibold">{document.sakaDate}</span>
          </span>
          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[11px] font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Assigned: {document.assignedTo}</span>
          </span>
        </div>

        {/* Live Quality Telemetry & Compliance Pill */}
        <div className="flex items-center space-x-3 text-xs">
          {/* Statutory Compliance Indicator */}
          <button
            onClick={onOpenCompliance}
            className={`px-3 py-1 rounded-md font-semibold flex items-center gap-1.5 border transition ${
              hasComplianceErrors
                ? 'bg-rose-50 text-rose-700 border-rose-300 hover:bg-rose-100'
                : linterAlerts.length > 0
                ? 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
                : 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>
              Gazette Compliance: {linterAlerts.length === 0 ? 'Verified ✓' : `${linterAlerts.length} Note(s)`}
            </span>
          </button>

          {/* Time Saved Pill */}
          <div className="bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-md flex items-center gap-1.5 font-medium">
            <Clock className="w-3.5 h-3.5 text-blue-500" />
            <span>Time Saved: <strong>~{metrics.timeSavedMinutes} mins</strong></span>
          </div>

          {/* Error Progress */}
          <div className="bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-md flex items-center gap-1.5 font-medium">
            <FileCheck className="w-3.5 h-3.5 text-slate-500" />
            <span>
              Resolved: <strong className="text-emerald-600">{metrics.resolvedIssues}</strong>/{metrics.totalIssues}
            </span>
          </div>

          {/* Quality Score Meter */}
          <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
            <span className="text-slate-500 font-medium">Quality Index:</span>
            <div className="flex items-center space-x-1.5">
              <div className="w-24 bg-slate-200 rounded-full h-2.5 overflow-hidden">
                <div
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    metrics.qualityScore >= 90
                      ? 'bg-emerald-500'
                      : metrics.qualityScore >= 70
                      ? 'bg-amber-500'
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${metrics.qualityScore}%` }}
                ></div>
              </div>
              <span className="font-bold text-slate-900 w-9 text-right">
                {metrics.qualityScore}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
