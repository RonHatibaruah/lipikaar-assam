import React, { useState } from 'react';
import { X, Download, FileText, Check, Printer, FileCode, CheckCircle2 } from 'lucide-react';
import { GazetteDocument } from '../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: GazetteDocument;
  cleanText: string;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  document,
  cleanText
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDownload = (format: string) => {
    let content = cleanText;
    let filename = `${document.gazetteNumber.replace(/[^a-zA-Z0-9]/g, '_')}_proofread`;
    let mimeType = 'text/plain';

    if (format === 'xml') {
      filename += '.xml';
      mimeType = 'application/xml';
      content = `<?xml version="1.0" encoding="UTF-8"?>
<AssamGazette xmlns="http://gazette.assam.gov.in/schema/v1">
  <Metadata>
    <Title>${document.title}</Title>
    <Department>${document.department}</Department>
    <GazetteNumber>${document.gazetteNumber}</GazetteNumber>
    <IssueDate>${document.issueDate}</IssueDate>
    <SakaDate>${document.sakaDate}</SakaDate>
    <VerifiedBy>Lipikaar Assam Engine v1.0</VerifiedBy>
    <ComplianceStatus>Certified</ComplianceStatus>
  </Metadata>
  <Body>
<![CDATA[
${cleanText}
]]>
  </Body>
</AssamGazette>`;
    } else {
      filename += '.txt';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);

    setDownloadSuccess(format);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${document.title}</title>
            <style>
              body { font-family: 'Noto Serif Bengali', serif; padding: 40px; line-height: 1.8; color: #111; }
              .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 20px; margin-bottom: 30px; }
              .title { font-size: 20px; font-weight: bold; }
              .meta { font-size: 13px; color: #444; margin-top: 5px; }
              .content { white-space: pre-wrap; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="title">THE ASSAM GAZETTE / অসম ৰাজপত্ৰ</div>
              <div class="meta">${document.department} | ${document.gazetteNumber} | ${document.issueDate}</div>
            </div>
            <div class="content">${cleanText}</div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold">Export Verified Government Document</h3>
              <p className="text-xs text-slate-400">Download Print-Ready Formats or e-Gazette Standard XML</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-md">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Print Preview Button */}
            <button
              onClick={handlePrint}
              className="p-4 border border-slate-200 hover:border-amber-500 rounded-xl bg-slate-50 hover:bg-amber-50/40 text-left transition flex flex-col justify-between group"
            >
              <div className="flex items-center space-x-2 text-slate-800 group-hover:text-amber-800">
                <Printer className="w-5 h-5 text-amber-600" />
                <span className="font-bold text-xs">Print / PDF Preview</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                Generate formal Government Gazette layout formatted for paper proofs or PDF generation.
              </p>
            </button>

            {/* Clean Unicode TXT */}
            <button
              onClick={() => handleDownload('txt')}
              className="p-4 border border-slate-200 hover:border-emerald-500 rounded-xl bg-slate-50 hover:bg-emerald-50/40 text-left transition flex flex-col justify-between group"
            >
              <div className="flex items-center space-x-2 text-slate-800 group-hover:text-emerald-800">
                <FileText className="w-5 h-5 text-emerald-600" />
                <span className="font-bold text-xs">Clean Unicode Text (.txt)</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                Normalized UTF-8 Assamese/English text ready for InDesign, Word, or web CMS.
              </p>
            </button>

            {/* e-Gazette Standard XML */}
            <button
              onClick={() => handleDownload('xml')}
              className="p-4 border border-slate-200 hover:border-blue-500 rounded-xl bg-slate-50 hover:bg-blue-50/40 text-left transition flex flex-col justify-between group"
            >
              <div className="flex items-center space-x-2 text-slate-800 group-hover:text-blue-800">
                <FileCode className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-xs">e-Gazette Standard XML</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                Machine-readable XML schema for official gazette publishing and archiving portals.
              </p>
            </button>

            {/* Word / DOCX Placeholder */}
            <button
              onClick={() => handleDownload('docx')}
              className="p-4 border border-slate-200 hover:border-indigo-500 rounded-xl bg-slate-50 hover:bg-indigo-50/40 text-left transition flex flex-col justify-between group"
            >
              <div className="flex items-center space-x-2 text-slate-800 group-hover:text-indigo-800">
                <FileText className="w-5 h-5 text-indigo-600" />
                <span className="font-bold text-xs">Formatted Unicode DOCX</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                Standard Microsoft Word document with embedded Assamese Unicode typography.
              </p>
            </button>
          </div>

          {downloadSuccess && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-3.5 py-2.5 rounded-lg flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Export generated successfully as {downloadSuccess.toUpperCase()}!</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="text-xs text-slate-600 hover:text-slate-800 font-medium px-4 py-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
