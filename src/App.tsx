import React, { useState, useMemo } from 'react';
import { GazetteDocument, Issue, UserRole, QualityMetrics } from './types';
import { INITIAL_DOCUMENTS } from './data/sampleDocuments';
import { inspectDocumentText } from './utils/assameseEngine';
import { auditGazetteCompliance } from './utils/gazetteLinter';
import { Header } from './components/Header';
import { GazetteStats } from './components/GazetteStats';
import { SplitEditor } from './components/SplitEditor';
import { IssuesPanel } from './components/IssuesPanel';
import { LegacyFontModal } from './components/LegacyFontModal';
import { ComplianceModal } from './components/ComplianceModal';
import { ExportModal } from './components/ExportModal';
import { ProposalModal } from './components/ProposalModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboard } from './components/AdminDashboard';
import { ProofOfWorkModal } from './components/ProofOfWorkModal';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [documents, setDocuments] = useState<GazetteDocument[]>(INITIAL_DOCUMENTS);
  const [selectedDocId, setSelectedDocId] = useState<string>(INITIAL_DOCUMENTS[0].id);
  const [currentRole, setCurrentRole] = useState<UserRole>('proofreader');
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);

  // View mode
  const [viewMode, setViewMode] = useState<'workbench' | 'admin'>('workbench');

  // Admin authentication state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [adminUser, setAdminUser] = useState<{ name: string; email: string; role: string }>({
    name: 'State System Administrator',
    email: 'admin@assam.gov.in',
    role: 'super_admin'
  });
  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState<boolean>(false);

  // Other Modals state
  const [isFontModalOpen, setIsFontModalOpen] = useState(false);
  const [isComplianceModalOpen, setIsComplianceModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const [isProofOfWorkOpen, setIsProofOfWorkOpen] = useState(false);

  // Active document
  const currentDoc = useMemo(() => {
    return documents.find(d => d.id === selectedDocId) || documents[0];
  }, [documents, selectedDocId]);

  // Gazette Compliance Linter alerts
  const linterAlerts = useMemo(() => {
    return auditGazetteCompliance(currentDoc);
  }, [currentDoc]);

  // Compute Quality Metrics
  const metrics: QualityMetrics = useMemo(() => {
    const total = currentDoc.issues.length;
    const resolved = currentDoc.issues.filter(i => i.status !== 'pending').length;
    const pending = total - resolved;
    const critical = currentDoc.issues.filter(i => i.severity === 'critical' && i.status === 'pending').length;
    const warning = currentDoc.issues.filter(i => i.severity === 'warning' && i.status === 'pending').length;

    let score = 100 - (critical * 12) - (warning * 6);
    if (linterAlerts.some(a => a.level === 'error')) score -= 15;
    score = Math.max(25, Math.min(100, score));

    const timeSaved = Math.max(15, (resolved * 4) + (total * 2));
    const wordCount = currentDoc.currentText.split(/\s+/).filter(Boolean).length;

    return {
      totalIssues: total,
      resolvedIssues: resolved,
      pendingIssues: pending,
      criticalIssues: critical,
      warningIssues: warning,
      qualityScore: score,
      timeSavedMinutes: timeSaved,
      wordCount
    };
  }, [currentDoc, linterAlerts]);

  // Handlers
  const handleSelectDoc = (doc: GazetteDocument) => {
    setSelectedDocId(doc.id);
    setSelectedIssueId(null);
  };

  const handleTextChange = (newText: string) => {
    setDocuments(prev => prev.map(d => {
      if (d.id === currentDoc.id) {
        return {
          ...d,
          currentText: newText
        };
      }
      return d;
    }));
  };

  const handleAcceptIssue = (issueId: string) => {
    const targetIssue = currentDoc.issues.find(i => i.id === issueId);
    if (!targetIssue) return;

    const updatedText = currentDoc.currentText.replace(
      targetIssue.originalText,
      targetIssue.suggestionText
    );

    setDocuments(prev => prev.map(d => {
      if (d.id === currentDoc.id) {
        return {
          ...d,
          currentText: updatedText,
          issues: d.issues.map(iss => iss.id === issueId ? { ...iss, status: 'accepted' } : iss)
        };
      }
      return d;
    }));
  };

  const handleDismissIssue = (issueId: string) => {
    setDocuments(prev => prev.map(d => {
      if (d.id === currentDoc.id) {
        return {
          ...d,
          issues: d.issues.map(iss => iss.id === issueId ? { ...iss, status: 'dismissed' } : iss)
        };
      }
      return d;
    }));
  };

  const handleAcceptAll = () => {
    let updatedText = currentDoc.currentText;
    currentDoc.issues.forEach(issue => {
      if (issue.status === 'pending') {
        updatedText = updatedText.replace(issue.originalText, issue.suggestionText);
      }
    });

    setDocuments(prev => prev.map(d => {
      if (d.id === currentDoc.id) {
        return {
          ...d,
          currentText: updatedText,
          issues: d.issues.map(iss => ({ ...iss, status: 'accepted' }))
        };
      }
      return d;
    }));
  };

  const handleResetDocument = () => {
    const freshIssues = inspectDocumentText(currentDoc.sourceText);
    setDocuments(prev => prev.map(d => {
      if (d.id === currentDoc.id) {
        return {
          ...d,
          currentText: d.sourceText,
          issues: freshIssues
        };
      }
      return d;
    }));
    setSelectedIssueId(null);
  };

  const handleApplyLegacyConverted = (convertedText: string) => {
    const freshIssues = inspectDocumentText(convertedText);
    setDocuments(prev => prev.map(d => {
      if (d.id === currentDoc.id) {
        return {
          ...d,
          currentText: convertedText,
          sourceText: convertedText,
          issues: freshIssues
        };
      }
      return d;
    }));
  };

  const handleOpenAdmin = () => {
    if (isAdminAuthenticated) {
      setViewMode('admin');
    } else {
      setIsAdminLoginModalOpen(true);
    }
  };

  const handleAdminLoginSuccess = (user: { name: string; email: string; role: string }) => {
    setIsAdminAuthenticated(true);
    setAdminUser(user);
    setViewMode('admin');
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setViewMode('workbench');
  };

  // If in Admin Dashboard view
  if (viewMode === 'admin') {
    return (
      <AdminDashboard
        user={adminUser}
        onBackToWorkbench={() => setViewMode('workbench')}
        onLogout={handleAdminLogout}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col selection:bg-amber-200">
      {/* Global Header */}
      <Header
        documents={documents}
        selectedDoc={currentDoc}
        onSelectDoc={handleSelectDoc}
        currentRole={currentRole}
        onChangeRole={setCurrentRole}
        onOpenFontConverter={() => setIsFontModalOpen(true)}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        onOpenProposalModal={() => setIsProposalModalOpen(true)}
        onOpenProofOfWork={() => setIsProofOfWorkOpen(true)}
        onOpenAdmin={handleOpenAdmin}
        isAdminAuthenticated={isAdminAuthenticated}
        onResetDocument={handleResetDocument}
      />

      {/* Gazette Telemetry & Compliance Bar */}
      <GazetteStats
        document={currentDoc}
        metrics={metrics}
        linterAlerts={linterAlerts}
        onOpenCompliance={() => setIsComplianceModalOpen(true)}
      />

      {/* Main Workbench Layout: Split Editor on Left (8 cols) + Issues Panel on Right (4 cols) */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
          <div className="xl:col-span-8">
            <SplitEditor
              sourceText={currentDoc.sourceText}
              currentText={currentDoc.currentText}
              issues={currentDoc.issues}
              selectedIssueId={selectedIssueId}
              onSelectIssue={setSelectedIssueId}
              onTextChange={handleTextChange}
            />
          </div>

          <div className="xl:col-span-4">
            <IssuesPanel
              issues={currentDoc.issues}
              selectedIssueId={selectedIssueId}
              onSelectIssue={setSelectedIssueId}
              onAcceptIssue={handleAcceptIssue}
              onDismissIssue={handleDismissIssue}
              onAcceptAll={handleAcceptAll}
            />
          </div>
        </div>
      </main>

      {/* Global GovTech Footer with Lead Applicant, Disclaimer & Copyright */}
      <Footer />

      {/* Modals */}
      <LegacyFontModal
        isOpen={isFontModalOpen}
        onClose={() => setIsFontModalOpen(false)}
        onApplyToDocument={handleApplyLegacyConverted}
      />

      <ComplianceModal
        isOpen={isComplianceModalOpen}
        onClose={() => setIsComplianceModalOpen(false)}
        document={currentDoc}
        alerts={linterAlerts}
      />

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        document={currentDoc}
        cleanText={currentDoc.currentText}
      />

      <ProposalModal
        isOpen={isProposalModalOpen}
        onClose={() => setIsProposalModalOpen(false)}
      />

      <ProofOfWorkModal
        isOpen={isProofOfWorkOpen}
        onClose={() => setIsProofOfWorkOpen(false)}
      />

      <AdminLoginModal
        isOpen={isAdminLoginModalOpen}
        onClose={() => setIsAdminLoginModalOpen(false)}
        onLoginSuccess={handleAdminLoginSuccess}
      />
    </div>
  );
};

export default App;
