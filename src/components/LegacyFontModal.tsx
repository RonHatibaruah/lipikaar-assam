import React, { useState } from 'react';
import { X, ArrowRight, Copy, Check, Sparkles } from 'lucide-react';
import { convertLegacyToUnicode, SAMPLE_LEGACY_SNIPPETS } from '../utils/legacyFontConverter';

interface LegacyFontModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyToDocument: (convertedText: string) => void;
}

export const LegacyFontModal: React.FC<LegacyFontModalProps> = ({
  isOpen,
  onClose,
  onApplyToDocument
}) => {
  const [inputText, setInputText] = useState(SAMPLE_LEGACY_SNIPPETS[0].legacy);
  const [fontType, setFontType] = useState<'geetanjali' | 'ramdhenu' | 'auto'>('auto');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const convertedText = convertLegacyToUnicode(inputText, fontType);

  const handleCopy = () => {
    navigator.clipboard.writeText(convertedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApply = () => {
    onApplyToDocument(convertedText);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              ইউ
            </div>
            <div>
              <h3 className="text-sm font-bold">Legacy 8-Bit Font Transcoder (প্ৰাচীন ফন্ট ৰূপান্তৰক)</h3>
              <p className="text-xs text-slate-400">Convert Geetanjali, Ramdhenu & Lipi text to Standard Unicode UTF-8</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-md">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Sample Snippet Selector */}
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-600">Quick Test Samples:</span>
            <div className="flex space-x-2">
              {SAMPLE_LEGACY_SNIPPETS.map((snippet, idx) => (
                <button
                  key={idx}
                  onClick={() => setInputText(snippet.legacy)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1 rounded text-[11px] font-medium border border-slate-200 transition"
                >
                  {snippet.name}
                </button>
              ))}
            </div>
          </div>

          {/* Dual Textboxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Input Box */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex justify-between">
                <span>Legacy 8-Bit Text (Geetanjali / Ramdhenu):</span>
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={6}
                className="w-full text-xs font-mono p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-slate-50"
                placeholder="Paste legacy ASCII text here..."
              />
            </div>

            {/* Output Box */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-emerald-800 flex justify-between">
                <span>Normalized Unicode UTF-8 (অসমীয়া):</span>
                <span className="text-emerald-600 text-[11px] font-normal">100% Glyph Preserved</span>
              </label>
              <textarea
                value={convertedText}
                readOnly
                rows={6}
                className="w-full text-sm font-assamese p-3 border border-emerald-200 rounded-lg bg-emerald-50/40 text-slate-900 focus:outline-none"
              />
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-900 flex items-start space-x-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              In traditional Assam Directorate DTP shops, PageMaker and InDesign files still contain 8-bit Geetanjali or Ramdhenu encoding. Lipikaar Assam automatically converts legacy streams to Unicode UTF-8 upon document upload.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={handleCopy}
            className="text-xs text-slate-700 hover:text-slate-900 bg-white border border-slate-300 px-3 py-1.5 rounded-lg flex items-center space-x-1 font-medium transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Unicode Text'}</span>
          </button>

          <div className="flex space-x-2">
            <button
              onClick={onClose}
              className="text-xs text-slate-600 hover:text-slate-800 px-3 py-1.5 rounded-lg font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="bg-amber-600 hover:bg-amber-500 text-slate-950 text-xs font-bold px-4 py-1.5 rounded-lg shadow transition"
            >
              Apply to Document
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
