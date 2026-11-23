import React, { useState } from 'react';
import { Issue, IssueType } from '../types';
import { 
  Check, 
  X, 
  Sparkles, 
  AlertCircle, 
  BookOpen, 
  CheckCheck,
  ChevronRight,
  Filter
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface IssuesPanelProps {
  issues: Issue[];
  selectedIssueId: string | null;
  onSelectIssue: (issueId: string) => void;
  onAcceptIssue: (issueId: string) => void;
  onDismissIssue: (issueId: string) => void;
  onAcceptAll: () => void;
}

export const IssuesPanel: React.FC<IssuesPanelProps> = ({
  issues,
  selectedIssueId,
  onSelectIssue,
  onAcceptIssue,
  onDismissIssue,
  onAcceptAll
}) => {
  const [filterType, setFilterType] = useState<string>('all');

  const pendingIssues = issues.filter(i => i.status === 'pending');
  const resolvedIssues = issues.filter(i => i.status !== 'pending');

  const filteredIssues = issues.filter(issue => {
    if (filterType === 'all') return true;
    if (filterType === 'pending') return issue.status === 'pending';
    if (filterType === 'spelling') return issue.type === 'spelling';
    if (filterType === 'grammar') return issue.type === 'grammar';
    if (filterType === 'statutory') return issue.type === 'statutory';
    return true;
  });

  const handleAcceptAllWithConfetti = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
    onAcceptAll();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-[calc(100vh-220px)] min-h-[500px]">
      {/* Panel Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-bold text-slate-800">
              Linguistic & Statutory Review
            </h3>
            <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-0.5 rounded-full">
              {pendingIssues.length} pending
            </span>
          </div>

          {pendingIssues.length > 0 && (
            <button
              onClick={handleAcceptAllWithConfetti}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center space-x-1 shadow transition"
              title="Apply all suggested corrections at once"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Accept All ({pendingIssues.length})</span>
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 text-xs">
          {[
            { id: 'all', label: `All (${issues.length})` },
            { id: 'pending', label: `Pending (${pendingIssues.length})` },
            { id: 'spelling', label: 'Orthography / বানান' },
            { id: 'grammar', label: 'Grammar / ব্যাকৰণ' },
            { id: 'statutory', label: 'Statutory' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition ${
                filterType === tab.id
                  ? 'bg-slate-800 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Issues List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5 divide-y divide-slate-100">
        {filteredIssues.length === 0 ? (
          <div className="p-8 text-center text-slate-400">
            <CheckCheck className="w-10 h-10 mx-auto text-emerald-500 mb-2 opacity-80" />
            <p className="text-sm font-medium text-slate-600">No issues in this view.</p>
            <p className="text-xs text-slate-400 mt-1">All flagged orthographic anomalies have been resolved!</p>
          </div>
        ) : (
          filteredIssues.map((issue) => {
            const isSelected = issue.id === selectedIssueId;
            const isPending = issue.status === 'pending';

            return (
              <div
                key={issue.id}
                onClick={() => onSelectIssue(issue.id)}
                className={`pt-2.5 rounded-lg p-3 transition border cursor-pointer ${
                  isSelected
                    ? 'border-amber-400 bg-amber-50/50 shadow-sm'
                    : isPending
                    ? 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                    : 'border-slate-100 bg-slate-50/70 opacity-70'
                }`}
              >
                {/* Header: Original -> Replacement */}
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                        issue.severity === 'critical'
                          ? 'bg-rose-100 text-rose-700'
                          : issue.severity === 'warning'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-sky-100 text-sky-800'
                      }`}
                    >
                      {issue.type}
                    </span>
                    <span className="font-assamese text-sm line-through text-rose-700 font-semibold">
                      {issue.originalText}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-assamese text-sm text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      {issue.suggestionText}
                    </span>
                  </div>

                  {/* Quick Action Buttons */}
                  {isPending && (
                    <div className="flex items-center space-x-1" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => onAcceptIssue(issue.id)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white p-1 rounded-md transition shadow-xs"
                        title="Accept suggestion"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDismissIssue(issue.id)}
                        className="bg-slate-200 hover:bg-slate-300 text-slate-700 p-1 rounded-md transition"
                        title="Dismiss"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {!isPending && (
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                        issue.status === 'accepted'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {issue.status === 'accepted' ? '✓ Accepted' : '✕ Dismissed'}
                    </span>
                  )}
                </div>

                {/* Explanation */}
                <p className="text-xs text-slate-700 font-assamese leading-relaxed mb-1.5">
                  {issue.explanation}
                </p>

                {/* Rule Citation */}
                {issue.ruleCitation && (
                  <div className="flex items-center space-x-1 text-[11px] text-amber-800 font-medium">
                    <BookOpen className="w-3 h-3 text-amber-600" />
                    <span>সূত্র: {issue.ruleCitation}</span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Footer Summary */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex justify-between items-center">
        <span>Assam Sahitya Sabha & Hemkosh Rules Active</span>
        <span className="text-emerald-600 font-semibold">{resolvedIssues.length} resolved</span>
      </div>
    </div>
  );
};
