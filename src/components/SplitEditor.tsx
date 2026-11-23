import React, { useRef, useEffect } from 'react';
import { Issue } from '../types';
import { Eye, Edit3, ArrowRightLeft, Copy, Check } from 'lucide-react';

interface SplitEditorProps {
  sourceText: string;
  currentText: string;
  issues: Issue[];
  selectedIssueId: string | null;
  onSelectIssue: (issueId: string) => void;
  onTextChange: (newText: string) => void;
}

export const SplitEditor: React.FC<SplitEditorProps> = ({
  sourceText,
  currentText,
  issues,
  selectedIssueId,
  onSelectIssue,
  onTextChange
}) => {
  const leftPaneRef = useRef<HTMLDivElement>(null);
  const rightPaneRef = useRef<HTMLTextAreaElement>(null);
  const isSyncingScroll = useRef(false);
  const [copied, setCopied] = React.useState(false);

  // Synchronized scrolling between left and right panes
  const handleScroll = (source: 'left' | 'right') => {
    if (isSyncingScroll.current) return;
    isSyncingScroll.current = true;

    const left = leftPaneRef.current;
    const right = rightPaneRef.current;

    if (left && right) {
      if (source === 'left') {
        const percentage = left.scrollTop / (left.scrollHeight - left.clientHeight || 1);
        right.scrollTop = percentage * (right.scrollHeight - right.clientHeight);
      } else {
        const percentage = right.scrollTop / (right.scrollHeight - right.clientHeight || 1);
        left.scrollTop = percentage * (left.scrollHeight - left.clientHeight);
      }
    }

    setTimeout(() => {
      isSyncingScroll.current = false;
    }, 50);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Render highlighted text for left pane
  const renderHighlightedSource = () => {
    if (!issues || issues.length === 0) {
      return <span className="whitespace-pre-wrap">{sourceText}</span>;
    }

    // Sort issues by startOffset ascending
    const sortedIssues = [...issues].sort((a, b) => a.startOffset - b.startOffset);
    const elements: React.ReactNode[] = [];
    let lastIndex = 0;

    sortedIssues.forEach((issue) => {
      // Add text before this issue
      if (issue.startOffset > lastIndex) {
        elements.push(
          <span key={`text-${lastIndex}`}>
            {sourceText.substring(lastIndex, issue.startOffset)}
          </span>
        );
      }

      const isSelected = issue.id === selectedIssueId;
      const isPending = issue.status === 'pending';

      let highlightClass = '';
      if (isPending) {
        if (issue.severity === 'critical') highlightClass = 'bg-rose-100 text-rose-900 border-b-2 border-rose-500 font-semibold';
        else if (issue.severity === 'warning') highlightClass = 'bg-amber-100 text-amber-900 border-b-2 border-amber-500 font-medium';
        else highlightClass = 'bg-sky-100 text-sky-900 border-b-2 border-sky-400';
      } else if (issue.status === 'accepted') {
        highlightClass = 'bg-emerald-100 text-emerald-900 line-through opacity-75';
      } else {
        highlightClass = 'line-through text-slate-400';
      }

      if (isSelected) {
        highlightClass += ' ring-2 ring-amber-500 ring-offset-1 rounded';
      }

      elements.push(
        <mark
          key={issue.id}
          onClick={() => onSelectIssue(issue.id)}
          className={`cursor-pointer px-1 py-0.5 rounded transition ${highlightClass}`}
          title={`${issue.type.toUpperCase()}: ${issue.explanation} (Click to inspect)`}
        >
          {sourceText.substring(issue.startOffset, issue.endOffset)}
        </mark>
      );

      lastIndex = issue.endOffset;
    });

    // Add remainder
    if (lastIndex < sourceText.length) {
      elements.push(
        <span key={`text-${lastIndex}`}>
          {sourceText.substring(lastIndex)}
        </span>
      );
    }

    return elements;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-220px)] min-h-[500px]">
      {/* Left Pane: Original DTP / Draft with Redline Markup */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
        <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Eye className="w-4 h-4 text-slate-600" />
            <h2 className="text-xs font-bold text-slate-800 tracking-wide uppercase">
              Original DTP Draft (মূল পাণ্ডুলিপি / Redline View)
            </h2>
          </div>
          <div className="flex items-center space-x-2 text-[11px] text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 bg-rose-500 rounded-sm inline-block"></span> Critical Orthography
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 bg-amber-500 rounded-sm inline-block"></span> Statutory / Warning
            </span>
          </div>
        </div>

        <div
          ref={leftPaneRef}
          onScroll={() => handleScroll('left')}
          className="flex-1 p-5 overflow-y-auto font-assamese text-sm leading-relaxed text-slate-800 select-text bg-[#fdfdfc]"
        >
          <div className="whitespace-pre-wrap font-assamese leading-loose">
            {renderHighlightedSource()}
          </div>
        </div>

        <div className="bg-slate-50 px-4 py-2 border-t border-slate-200 text-xs text-slate-500 flex justify-between items-center">
          <span>Words: {sourceText.split(/\s+/).filter(Boolean).length}</span>
          <span>Click any highlighted word to inspect rules & accept fixes</span>
        </div>
      </div>

      {/* Right Pane: Live Proofread & Normalized Document */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
        <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Edit3 className="w-4 h-4 text-amber-600" />
            <h2 className="text-xs font-bold text-slate-800 tracking-wide uppercase">
              Proofread & Normalized Preview (সংশোধিত প্ৰতিলিপি)
            </h2>
          </div>
          <button
            onClick={handleCopy}
            className="text-xs text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 px-2.5 py-1 rounded flex items-center space-x-1 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Clean Text'}</span>
          </button>
        </div>

        <textarea
          ref={rightPaneRef}
          value={currentText}
          onChange={(e) => onTextChange(e.target.value)}
          onScroll={() => handleScroll('right')}
          className="flex-1 p-5 overflow-y-auto font-assamese text-sm leading-loose text-slate-900 bg-white resize-none focus:outline-none focus:ring-1 focus:ring-amber-500/30"
          placeholder="Proofread text will reflect here in real-time..."
        />

        <div className="bg-slate-50 px-4 py-2 border-t border-slate-200 text-xs text-slate-500 flex justify-between items-center">
          <span>Unicode Clean: {currentText.split(/\s+/).filter(Boolean).length} words</span>
          <span className="text-emerald-700 font-medium">Editable in real-time</span>
        </div>
      </div>
    </div>
  );
};
