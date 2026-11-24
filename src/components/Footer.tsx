import React from 'react';
import { ShieldCheck, Building2, User, Globe, MapPin, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-8 text-xs">
      {/* Top Footer: Project & Applicant Attribution */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {/* Col 1: Platform Overview */}
          <div className="space-y-2 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold font-assamese text-sm">
                লি
              </div>
              <span className="font-bold text-white text-sm">Lipikaar Assam (লিপিকাৰ অসম)</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              AI-assisted and rule-governed multilingual proofreading & statutory Gazette linter engineered for the <strong>Directorate of Printing & Stationery, Government of Assam</strong> under challenge <strong>NESFIC-D-38</strong>.
            </p>
          </div>

          {/* Col 2: Lead Applicant & Company */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span>Lead Applicant & Agency</span>
            </h4>
            <div className="text-[11px] space-y-1">
              <p className="text-slate-200 font-semibold">Abhisekh Satyam</p>
              <p className="text-slate-400">Lead Applicant & Solutions Architect</p>
              <p className="text-amber-400 font-semibold flex items-center gap-1 pt-1">
                <Building2 className="w-3 h-3" />
                <span>RazorNext Software Pvt Ltd</span>
              </p>
              <p className="text-slate-400 text-[10px]">CIN / Registered Enterprise &bull; Innovation & IT</p>
            </div>
          </div>

          {/* Col 3: Beneficiary Department & Geo Details */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Jurisdiction & Geo Reference</span>
            </h4>
            <div className="text-[11px] space-y-1">
              <p className="text-slate-300 font-medium">Directorate of Printing & Stationery</p>
              <p className="text-slate-400">Bamunimaidam, Guwahati, Kamrup Metro</p>
              <p className="text-slate-400">Assam, PIN: 781021, India</p>
              <p className="text-emerald-400 text-[10px] flex items-center gap-1 pt-1">
                <Globe className="w-3 h-3" />
                <span>Geo Coordinates: 26.1856° N, 91.7828° E</span>
              </p>
            </div>
          </div>

          {/* Col 4: Compliance & Standards */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Compliance & Security</span>
            </h4>
            <ul className="text-[11px] space-y-1 text-slate-400">
              <li className="flex items-center gap-1 text-slate-300">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                <span>Assam SDC On-Premise Hosting</span>
              </li>
              <li className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                <span>DPDP Act 2023 Data Sovereignty</span>
              </li>
              <li className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                <span>GIGW 3.0 & WCAG 2.1 AA Standards</span>
              </li>
              <li className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                <span>Zero 3rd-Party Commercial API Leaks</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Banner */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-[11px] text-slate-400 leading-relaxed mb-6 space-y-1">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold uppercase tracking-wider text-[10px]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Statutory Governance Disclaimer</span>
          </div>
          <p>
            <strong>Disclaimer:</strong> Lipikaar Assam (লিপিকাৰ অসম) is an AI-assisted and rule-governed proofreading workbench developed for the <strong>North-East Seva First Innovation Challenge 2026 (NESFIC-D-38)</strong> for the <strong>Directorate of Printing & Stationery, Government of Assam</strong>. The platform strictly enforces a <strong>Human-in-the-Loop</strong> operational paradigm and does not publish, alter, or disseminate official government documents autonomously. All gazette notifications, legislative acts, and administrative orders require authoritative editorial review and formal sign-off by competent government officials prior to public printing and digital dissemination.
          </p>
        </div>

        {/* Bottom Bar: Copyrights & SEO Friendly Links */}
        <div className="border-t border-slate-800 pt-5 flex flex-wrap items-center justify-between gap-3 text-[11px]">
          <div>
            <p className="text-slate-300 font-semibold">
              Copyright &copy; 2026 RazorNext Software Pvt Ltd. All rights reserved.
            </p>
            <p className="text-slate-500 text-[10px]">
              Developed by RazorNext Software Pvt Ltd &bull; Lead Applicant: Abhisekh Satyam &bull; NESFIC-D-38
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-slate-400 text-[11px]">
            <a 
              href="https://startup.assam.gov.in/nesfic26" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-amber-300 transition"
              title="North-East Seva First Innovation Challenge 2026"
            >
              NESFIC 2026 (Dispur, Assam)
            </a>
            <span>&bull;</span>
            <a 
              href="https://gazette.assam.gov.in" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-amber-300 transition"
              title="Official Portal of The Assam Gazette"
            >
              The Assam Gazette (Bamunimaidam, Guwahati)
            </a>
            <span>&bull;</span>
            <a 
              href="https://github.com/RonHatibaruah/lipikaar-assam" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-amber-300 transition"
              title="Open Source Code Repository on GitHub"
            >
              GitHub Repository
            </a>
            <span>&bull;</span>
            <span className="text-emerald-400 font-mono">Guwahati, Assam, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
