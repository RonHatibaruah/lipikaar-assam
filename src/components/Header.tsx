import React from 'react';
import { GazetteDocument, UserRole } from '../types';
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  RotateCcw, 
  Download, 
  Sparkles, 
  BookOpen, 
  FileCode2,
  ShieldCheck,
  UserCheck,
  Printer,
  Lock,
  Unlock,
  Sliders,
  Building2,
  User
} from 'lucide-react';

interface HeaderProps {
  documents: GazetteDocument[];
  selectedDoc: GazetteDocument;
  onSelectDoc: (doc: GazetteDocument) => void;
  currentRole: UserRole;
  onChangeRole: (role: UserRole) => void;
  onOpenFontConverter: () => void;
  onOpenExportModal: () => void;
  onOpenProposalModal: () => void;
  onOpenProofOfWork: () => void;
  onOpenAdmin: () => void;
  isAdminAuthenticated: boolean;
  onResetDocument: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  documents,
  selectedDoc,
  onSelectDoc,
  currentRole,
  onChangeRole,
  onOpenFontConverter,
  onOpenExportModal,
  onOpenProposalModal,
  onOpenProofOfWork,
  onOpenAdmin,
  isAdminAuthenticated,
  onResetDocument
}) => {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 shadow-lg sticky top-0 z-30">
      {/* Top Banner */}
      <div className="bg-slate-950 px-4 py-1.5 text-xs text-slate-400 flex flex-wrap items-center justify-between border-b border-slate-800 gap-2">
        <div className="flex items-center space-x-2 flex-wrap">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-semibold text-slate-300">
            Directorate of Printing & Stationery, Assam (অসম চৰকাৰৰ মুদ্ৰণ আৰু লেখন-সামগ্ৰী সঞ্চালকালয়)
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-amber-400 font-medium">NESFIC-D-38 e-Gov Challenge</span>
          <span className="text-slate-600">|</span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            <User className="w-3 h-3" /> Lead Applicant: <strong>Abhisekh Satyam</strong>
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300 flex items-center gap-1">
            <Building2 className="w-3 h-3 text-amber-400" /> RazorNext Software Pvt Ltd
          </span>
        </div>
        <div className="flex items-center space-x-3 text-xs">
          <div className="flex items-center space-x-1.5">
            <UserCheck className="w-3.5 h-3.5 text-slate-400" />
            <span>Role:</span>
            <select
              value={currentRole}
              onChange={(e) => onChangeRole(e.target.value as UserRole)}
              className="bg-slate-800 text-amber-300 font-medium px-2 py-0.5 rounded border border-slate-700 text-xs focus:outline-none focus:border-amber-400"
            >
              <option value="operator">DTP Operator (অপাৰেটৰ)</option>
              <option value="proofreader">Proofreader (সংশোধক)</option>
              <option value="head_reader">Head Reader (মুখ্য পাঠক)</option>
              <option value="superintendent">Superintendent (অধীক্ষক)</option>
            </select>
          </div>
          <span className="text-slate-600">|</span>
          <button
            onClick={onOpenProofOfWork}
            className="text-emerald-400 hover:text-emerald-300 flex items-center space-x-1 font-bold underline-offset-2 hover:underline"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Proof of Work (PDF)</span>
          </button>
          <span className="text-slate-600">|</span>
          <button
            onClick={onOpenProposalModal}
            className="text-amber-300 hover:text-amber-200 flex items-center space-x-1 font-medium underline-offset-2 hover:underline"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Proposal Docs</span>
          </button>
          <span className="text-slate-600">|</span>
          <button
            onClick={onOpenAdmin}
            className={`px-2 py-0.5 rounded font-bold flex items-center space-x-1 text-xs transition border ${
              isAdminAuthenticated 
                ? 'bg-emerald-950 text-emerald-300 border-emerald-600 hover:bg-emerald-900' 
                : 'bg-amber-950 text-amber-300 border-amber-600 hover:bg-amber-900'
            }`}
          >
            {isAdminAuthenticated ? <Unlock className="w-3 h-3 text-emerald-400" /> : <Lock className="w-3 h-3 text-amber-400" />}
            <span>Admin Portal</span>
          </button>
        </div>
      </div>

      {/* Main Bar */}
      <div className="px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Logo & Platform Name */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-md border border-amber-400/40">
            <span className="text-xl font-bold font-assamese text-slate-950">লি</span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                <span className="font-assamese text-amber-400">লিপিকাৰ অসম</span>
                <span className="text-slate-400 text-sm font-normal">|</span>
                <span className="text-base text-slate-200">Lipikaar Assam</span>
              </h1>
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full">
                AI + Rule Core
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Multilingual Proofreader & Gazette Statutory Linter for Assam Government Publications &bull; By RazorNext Software Pvt Ltd
            </p>
          </div>
        </div>

        {/* Document Selector & Actions */}
        <div className="flex items-center space-x-2.5">
          {/* Document Picker */}
          <div className="relative">
            <select
              value={selectedDoc.id}
              onChange={(e) => {
                const found = documents.find(d => d.id === e.target.value);
                if (found) onSelectDoc(found);
              }}
              className="bg-slate-800 text-slate-100 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-none max-w-xs truncate"
            >
              {documents.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  📄 {doc.title} ({doc.language.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

          {/* Legacy Font Converter Button */}
          <button
            onClick={onOpenFontConverter}
            className="bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 hover:border-amber-500/50 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1.5 transition"
            title="Convert legacy 8-bit Geetanjali/Ramdhenu text to Unicode"
          >
            <FileCode2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Legacy Font Converter</span>
          </button>

          {/* Reset Button */}
          <button
            onClick={onResetDocument}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center space-x-1 transition"
            title="Reset to original draft"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          {/* Export Button */}
          <button
            onClick={onOpenExportModal}
            className="bg-amber-600 hover:bg-amber-500 text-slate-950 px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 shadow transition"
          >
            <Download className="w-3.5 h-3.5 text-slate-950" />
            <span>Export Gazette</span>
          </button>
        </div>
      </div>
    </header>
  );
};
