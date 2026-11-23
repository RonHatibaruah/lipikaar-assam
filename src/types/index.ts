export type DocumentLanguage = 'assamese' | 'english' | 'bilingual';

export type IssueType = 'spelling' | 'grammar' | 'statutory' | 'calendar' | 'typography' | 'legacy_font';

export type IssueSeverity = 'critical' | 'warning' | 'info';

export type IssueStatus = 'pending' | 'accepted' | 'dismissed';

export type UserRole = 'operator' | 'proofreader' | 'head_reader' | 'superintendent';

export interface Issue {
  id: string;
  type: IssueType;
  severity: IssueSeverity;
  originalText: string;
  suggestionText: string;
  explanation: string;
  ruleCitation?: string; // e.g. "হেমকোষ / অসম সাহিত্য সভা নিয়ম ৩", "The Assam Gazette Rules 1984"
  startOffset: number;
  endOffset: number;
  status: IssueStatus;
}

export interface GazetteDocument {
  id: string;
  title: string;
  department: string;
  gazetteType: 'Extraordinary' | 'Weekly' | 'Statutory Order' | 'Assembly Act';
  gazetteNumber: string;
  issueDate: string; // e.g. "2026-11-20"
  sakaDate: string; // e.g. "29 Kartika, 1948 Saka"
  bhaskarabdaDate: string; // e.g. "4 Aghon, 1433 Bhaskarabda"
  language: DocumentLanguage;
  sourceText: string;
  currentText: string;
  status: 'draft' | 'under_review' | 'head_reader_review' | 'approved' | 'published';
  assignedTo: string;
  role: UserRole;
  issues: Issue[];
}

export interface QualityMetrics {
  totalIssues: number;
  resolvedIssues: number;
  pendingIssues: number;
  criticalIssues: number;
  warningIssues: number;
  qualityScore: number; // 0-100%
  timeSavedMinutes: number;
  wordCount: number;
}
