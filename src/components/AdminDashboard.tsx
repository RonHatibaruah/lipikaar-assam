import React, { useState } from 'react';
import { 
  ShieldCheck, 
  BookOpen, 
  Users, 
  FileCheck2, 
  Sliders, 
  Plus, 
  Trash2, 
  ToggleLeft, 
  ToggleRight, 
  Search, 
  Download, 
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Database,
  History
} from 'lucide-react';
import { ASSAMESE_ORTHOGRAPHY_RULES } from '../utils/assameseEngine';

interface AdminDashboardProps {
  user: { name: string; email: string; role: string };
  onBackToWorkbench: () => void;
  onLogout: () => void;
}

interface CustomRule {
  id: string;
  pattern: string;
  replacement: string;
  type: string;
  ruleCitation: string;
  enabled: boolean;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  user,
  onBackToWorkbench,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'rules' | 'statutory' | 'termbase' | 'users' | 'audit'>('rules');
  const [searchQuery, setSearchQuery] = useState('');

  // Local state for dynamic rules
  const [rules, setRules] = useState<CustomRule[]>([
    {
      id: 'r-1',
      pattern: 'অধিসুচনা',
      replacement: 'অধিসূচনা',
      type: 'spelling',
      ruleCitation: 'হেমকোষ প্ৰশাসনিক শ্ৰেণী / নিয়ম ১',
      enabled: true
    },
    {
      id: 'r-2',
      pattern: 'নিৰ্দ্দেশ',
      replacement: 'নিৰ্দেশ',
      type: 'spelling',
      ruleCitation: 'অসম সাহিত্য সভাৰ আধুনিক বৰ্ণাশুদ্ধি নিয়ম ৫ (দ্বিত্ব বৰ্জন)',
      enabled: true
    },
    {
      id: 'r-3',
      pattern: 'কাৰ্য্যালয়',
      replacement: 'কাৰ্যালয়',
      type: 'spelling',
      ruleCitation: 'অসম সাহিত্য সভাৰ বৰ্ণাশুদ্ধি সংহিতা',
      enabled: true
    },
    {
      id: 'r-4',
      pattern: 'প্ৰকাশীত',
      replacement: 'প্ৰকাশিত',
      type: 'spelling',
      ruleCitation: 'অসমীয়া ব্যাকৰণ প্ৰত্যয় বিধি (ইত প্ৰত্যয়)',
      enabled: true
    },
    {
      id: 'r-5',
      pattern: 'ৰাজপএ',
      replacement: 'ৰাজপত্ৰ',
      type: 'spelling',
      ruleCitation: 'অসম প্ৰেছ যুক্তাক্ষৰ নিৰ্দেশনা',
      enabled: true
    },
    {
      id: 'r-6',
      pattern: 'সৰকাৰ',
      replacement: 'চৰকাৰ',
      type: 'spelling',
      ruleCitation: 'হেমকোষ প্ৰশাসনিক অভিধান',
      enabled: true
    },
    {
      id: 'r-7',
      pattern: 'প্ৰনয়ন',
      replacement: 'প্ৰণয়ন',
      type: 'spelling',
      ruleCitation: 'ণ-ত্ব বিধি নিয়ম ২ (ঋ, ৰ, ষ-ৰ পৰৱৰ্তী নিয়ম)',
      enabled: true
    }
  ]);

  // New Rule inputs
  const [newPattern, setNewPattern] = useState('');
  const [newReplacement, setNewReplacement] = useState('');
  const [newCitation, setNewCitation] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleToggleRule = (id: string) => {
    setRules(prev => prev.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  };

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPattern || !newReplacement) return;
    const newRule: CustomRule = {
      id: `r-${Date.now()}`,
      pattern: newPattern,
      replacement: newReplacement,
      type: 'spelling',
      ruleCitation: newCitation || 'Custom Departmental Rule',
      enabled: true
    };
    setRules([newRule, ...rules]);
    setNewPattern('');
    setNewReplacement('');
    setNewCitation('');
    setShowAddForm(false);
  };

  const handleDeleteRule = (id: string) => {
    setRules(prev => prev.filter(r => r.id !== id));
  };

  const filteredRules = rules.filter(r => 
    r.pattern.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.replacement.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.ruleCitation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Top Admin Header */}
      <header className="bg-slate-900 text-white border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBackToWorkbench}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition border border-slate-700"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Workbench</span>
            </button>
            <div className="h-5 w-[1px] bg-slate-700"></div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <h1 className="text-sm font-bold tracking-tight">
                Lipikaar Assam — Administrative & Linguistic Control Panel
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <span className="text-slate-400">
              Logged in as: <strong className="text-amber-300">{user.name}</strong> ({user.email})
            </span>
            <button
              onClick={onLogout}
              className="bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 px-2.5 py-1 rounded text-xs font-medium transition"
            >
              Log Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 space-y-4">
        {/* Navigation Tabs */}
        <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-200 flex flex-wrap gap-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('rules')}
            className={`px-3.5 py-2 rounded-lg flex items-center space-x-1.5 transition ${
              activeTab === 'rules'
                ? 'bg-slate-900 text-white shadow'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Assamese Orthography Rules ({rules.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('statutory')}
            className={`px-3.5 py-2 rounded-lg flex items-center space-x-1.5 transition ${
              activeTab === 'statutory'
                ? 'bg-slate-900 text-white shadow'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileCheck2 className="w-4 h-4 text-amber-400" />
            <span>Gazette Statutory Boilerplates</span>
          </button>

          <button
            onClick={() => setActiveTab('termbase')}
            className={`px-3.5 py-2 rounded-lg flex items-center space-x-1.5 transition ${
              activeTab === 'termbase'
                ? 'bg-slate-900 text-white shadow'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Database className="w-4 h-4 text-amber-400" />
            <span>Official Nomenclature & Termbase</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`px-3.5 py-2 rounded-lg flex items-center space-x-1.5 transition ${
              activeTab === 'users'
                ? 'bg-slate-900 text-white shadow'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4 text-amber-400" />
            <span>Departmental Roles & Personnel</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3.5 py-2 rounded-lg flex items-center space-x-1.5 transition ${
              activeTab === 'audit'
                ? 'bg-slate-900 text-white shadow'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <History className="w-4 h-4 text-amber-400" />
            <span>Immutable Audit Trail</span>
          </button>
        </div>

        {/* Tab 1: Orthography Rules Manager */}
        {activeTab === 'rules' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-slate-800">
                  Assamese Orthography & Sandhi Linter Rule Management
                </h3>
                <p className="text-xs text-slate-500">
                  Calibrated against Asam Sahitya Sabha standards & Hemkosh Administrative Lexicon
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search rules..."
                    className="pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="bg-amber-600 hover:bg-amber-500 text-slate-950 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1 transition shadow"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Rule</span>
                </button>
              </div>
            </div>

            {/* Add New Rule Form */}
            {showAddForm && (
              <form onSubmit={handleAddRule} className="bg-amber-50/50 border border-amber-200 rounded-xl p-4 space-y-3">
                <h4 className="text-xs font-bold text-amber-900 uppercase">New Linguistic Rule Entry</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Errata Pattern (ভুল শব্দ):</label>
                    <input
                      type="text"
                      value={newPattern}
                      onChange={(e) => setNewPattern(e.target.value)}
                      placeholder="e.g. কৰ্ম্মচাৰী"
                      className="w-full text-xs font-assamese p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Standard Replacement (শুদ্ধ ৰূপ):</label>
                    <input
                      type="text"
                      value={newReplacement}
                      onChange={(e) => setNewReplacement(e.target.value)}
                      placeholder="e.g. কৰ্মচাৰী"
                      className="w-full text-xs font-assamese p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Rule Citation (ব্যাকৰণৰ সূত্ৰ):</label>
                    <input
                      type="text"
                      value={newCitation}
                      onChange={(e) => setNewCitation(e.target.value)}
                      placeholder="e.g. অসম সাহিত্য সভা বৰ্ণাশুদ্ধি নিয়ম ৫"
                      className="w-full text-xs font-assamese p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="text-xs text-slate-600 hover:text-slate-800 px-3 py-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg transition"
                  >
                    Save Rule to Engine
                  </button>
                </div>
              </form>
            )}

            {/* Rules Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="py-2.5 px-4">Pattern (ভুল)</th>
                    <th className="py-2.5 px-4">Correction (শুদ্ধ)</th>
                    <th className="py-2.5 px-4">Rule Authority / Citation</th>
                    <th className="py-2.5 px-4">Status</th>
                    <th className="py-2.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800 font-assamese">
                  {filteredRules.map((rule) => (
                    <tr key={rule.id} className="hover:bg-slate-50 transition">
                      <td className="py-3 px-4 text-rose-700 font-bold line-through">
                        {rule.pattern}
                      </td>
                      <td className="py-3 px-4 text-emerald-700 font-bold">
                        {rule.replacement}
                      </td>
                      <td className="py-3 px-4 text-slate-600 text-xs font-sans">
                        {rule.ruleCitation}
                      </td>
                      <td className="py-3 px-4 font-sans">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          rule.enabled ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                        }`}>
                          {rule.enabled ? 'Active' : 'Disabled'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-sans">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleToggleRule(rule.id)}
                            className="text-slate-500 hover:text-slate-800"
                            title={rule.enabled ? 'Disable' : 'Enable'}
                          >
                            {rule.enabled ? (
                              <ToggleRight className="w-5 h-5 text-emerald-600" />
                            ) : (
                              <ToggleLeft className="w-5 h-5 text-slate-400" />
                            )}
                          </button>
                          <button
                            onClick={() => handleDeleteRule(rule.id)}
                            className="text-slate-400 hover:text-rose-600"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Gazette Statutory Boilerplates */}
        {activeTab === 'statutory' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
            <h3 className="text-sm font-bold text-slate-800">
              Statutory Gazette Enactment Boilerplate & Calendar Configuration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-2">
                <div className="font-bold text-slate-800 flex justify-between">
                  <span>Mandatory Governor's Orders Formula:</span>
                  <span className="text-emerald-700 font-mono">Enforced</span>
                </div>
                <div className="space-y-1 text-slate-600 font-assamese">
                  <p>• Assamese: <strong>"ৰাজ্যপালৰ আদেশমৰ্মে"</strong></p>
                  <p className="font-sans">• English: <strong>"ORDERS BY THE GOVERNOR"</strong> / <strong>"ORDER BY THE GOVERNOR OF ASSAM"</strong></p>
                </div>
                <p className="text-[11px] text-slate-500 pt-1">
                  Enforces statutory authority citation as per Assam Gazette Rules 1984.
                </p>
              </div>

              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-2">
                <div className="font-bold text-slate-800 flex justify-between">
                  <span>Calendar Synchronization Baseline:</span>
                  <span className="text-emerald-700 font-mono">Active</span>
                </div>
                <div className="space-y-1 text-slate-600 font-sans">
                  <p>• Gregorian Reference: <strong>2026</strong></p>
                  <p>• Saka Samvat (শকাব্দ): <strong>1948 Saka</strong></p>
                  <p>• Bhaskarabda (ভাস্কৰাব্দ): <strong>1433 Bhaskarabda</strong></p>
                </div>
                <p className="text-[11px] text-slate-500 pt-1">
                  Flags any year discrepancy (e.g., 1942/1945 Saka) in newly submitted notifications.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Departmental Nomenclature & Termbase */}
        {activeTab === 'termbase' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
            <h3 className="text-sm font-bold text-slate-800">
              Assam Government Official Nomenclature & Designations
            </h3>
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold text-[10px] uppercase">
                  <tr>
                    <th className="py-2.5 px-4">Official Designation (English)</th>
                    <th className="py-2.5 px-4">Standard Assamese Term (অসমীয়া)</th>
                    <th className="py-2.5 px-4">Cadre / Department</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800 font-assamese">
                  <tr>
                    <td className="py-2.5 px-4 font-sans font-semibold">Chief Secretary</td>
                    <td className="py-2.5 px-4 font-bold text-slate-900">মুখ্য সচিব</td>
                    <td className="py-2.5 px-4 font-sans">IAS / Apex Scale</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans font-semibold">Principal Secretary</td>
                    <td className="py-2.5 px-4 font-bold text-slate-900">প্ৰধান সচিব</td>
                    <td className="py-2.5 px-4 font-sans">IAS / HAG Scale</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans font-semibold">Commissioner & Secretary</td>
                    <td className="py-2.5 px-4 font-bold text-slate-900">আয়ুক্ত আৰু সচিব</td>
                    <td className="py-2.5 px-4 font-sans">IAS / Super Time Scale</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans font-semibold">Joint Secretary</td>
                    <td className="py-2.5 px-4 font-bold text-slate-900">যুটীয়া সচিব (নট 'জুটিয়া')</td>
                    <td className="py-2.5 px-4 font-sans">ACS / Selection Grade</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-sans font-semibold">Deputy Commissioner / District Commissioner</td>
                    <td className="py-2.5 px-4 font-bold text-slate-900">জিলা আয়ুক্ত</td>
                    <td className="py-2.5 px-4 font-sans">General Administration</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: User Roles & Access Control */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
            <h3 className="text-sm font-bold text-slate-800">
              Departmental Staff Roster & Access Control (RBAC)
            </h3>
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold text-[10px] uppercase">
                  <tr>
                    <th className="py-2.5 px-4">Staff Name</th>
                    <th className="py-2.5 px-4">Departmental Role</th>
                    <th className="py-2.5 px-4">Security Level</th>
                    <th className="py-2.5 px-4">Assigned Section</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  <tr>
                    <td className="py-2.5 px-4 font-semibold">Dr. H. K. Nath</td>
                    <td className="py-2.5 px-4 text-amber-800 font-medium">Press Superintendent (অধীক্ষক)</td>
                    <td className="py-2.5 px-4"><span className="bg-rose-100 text-rose-800 px-2 py-0.5 rounded text-[10px] font-bold">Tier 4 - Signoff</span></td>
                    <td className="py-2.5 px-4">Directorate Executive</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold">ড° অমৰজ্যোতি হাজৰিকা</td>
                    <td className="py-2.5 px-4 text-emerald-800 font-medium">Head Reader (মুখ্য পাঠক)</td>
                    <td className="py-2.5 px-4"><span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-[10px] font-bold">Tier 3 - Approve</span></td>
                    <td className="py-2.5 px-4">Gazette Proofreading Cell</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold">P. Bordoloi</td>
                    <td className="py-2.5 px-4 text-blue-800 font-medium">Senior Proofreader (সংশোধক)</td>
                    <td className="py-2.5 px-4"><span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-[10px] font-bold">Tier 2 - Editorial</span></td>
                    <td className="py-2.5 px-4">Legislative Acts & Bills</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold">R. Kalita</td>
                    <td className="py-2.5 px-4 text-slate-700 font-medium">DTP Operator (অপাৰেটৰ)</td>
                    <td className="py-2.5 px-4"><span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-bold">Tier 1 - Drafting</span></td>
                    <td className="py-2.5 px-4">Composing Room (Bamunimaidam)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 5: Immutable Audit Trail */}
        {activeTab === 'audit' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800">
                Immutable Digital Audit Trail (DPDP Act 2023 Compliant)
              </h3>
              <span className="text-xs text-slate-500 font-mono">Logged on SDC Encrypted Ledger</span>
            </div>
            <div className="space-y-2 text-xs font-mono">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                <div>
                  <span className="text-emerald-700 font-bold">[2026-11-23 23:45:10]</span>{' '}
                  <span className="text-slate-800">DOC_SESSION_INIT: Document #AAP.84/2026/19 loaded.</span>
                </div>
                <span className="text-slate-500">User: Dr. A. Hazarika</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                <div>
                  <span className="text-blue-700 font-bold">[2026-11-23 23:46:12]</span>{' '}
                  <span className="text-slate-800">ORTHOGRAPHY_BATCH_APPLY: 6 suggestions accepted. Quality score &rarr; 100%.</span>
                </div>
                <span className="text-slate-500">Method: AI-Rule Core</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                <div>
                  <span className="text-amber-700 font-bold">[2026-11-23 23:48:30]</span>{' '}
                  <span className="text-slate-800">EXPORT_XML_GENERATED: Clean Unicode document exported for e-Gazette portal.</span>
                </div>
                <span className="text-slate-500">IP: 10.12.4.88 (SDC Internal)</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
