import { Issue, GazetteDocument } from '../types';

export interface LinterAlert {
  id: string;
  category: 'statutory_boilerplate' | 'calendar_sync' | 'numbering' | 'masthead';
  level: 'error' | 'warning' | 'info';
  title: string;
  message: string;
  ruleReference: string;
}

export function auditGazetteCompliance(doc: GazetteDocument): LinterAlert[] {
  const alerts: LinterAlert[] = [];
  const text = doc.currentText;

  // 1. Mandatory Governor's Order Formula check
  const hasEnglishGovernorOrder = /ORDERS?\s+BY\s+THE\s+GOVERNOR/i.test(text);
  const hasAssameseGovernorOrder = /ৰাজ্যপালৰ\s+আদেশমৰ্মে/i.test(text);

  if (doc.language === 'english' && !hasEnglishGovernorOrder) {
    alerts.push({
      id: 'lint-gov-eng',
      category: 'statutory_boilerplate',
      level: 'error',
      title: 'Missing Mandatory Governor Formula',
      message: 'Statutory Gazettes in English require the opening heading "ORDERS BY THE GOVERNOR".',
      ruleReference: 'Assam Gazette Rules, Chapter IV, Section 12'
    });
  }

  if (doc.language === 'assamese' && !hasAssameseGovernorOrder) {
    alerts.push({
      id: 'lint-gov-asm',
      category: 'statutory_boilerplate',
      level: 'error',
      title: 'ৰাজ্যপালৰ আদেশমৰ্মে শীৰ্ষক অনুপস্থিত',
      message: 'অসম ৰাজপত্ৰৰ বিধিবদ্ধ অধিসূচনাত "ৰাজ্যপালৰ আদেশমৰ্মে" শীৰ্ষক থকাটো বাধ্যতামূলক।',
      ruleReference: 'অসম ৰাজপত্ৰ বিধিমালিকা ১৯৮৪, অনুচ্ছেদ ১২'
    });
  }

  // 2. Calendar Synchronization Check
  // In Year 2026, Saka Era is 1947 (until March) and 1948 (after Chaitra).
  // If the text contains Saka Era date, check whether it is aligned with 2026.
  const sakaMatch = text.match(/([0-9]{4})\s+Saka/i) || text.match(/শকাব্দ\s+([০-৯]{4})/);
  if (sakaMatch) {
    const sakaYear = sakaMatch[1];
    if (sakaYear.includes('1945') || sakaYear.includes('1942') || sakaYear.includes('১৯৪৫')) {
      alerts.push({
        id: 'lint-cal-saka',
        category: 'calendar_sync',
        level: 'warning',
        title: 'Saka Era Year Discrepancy',
        message: `Current Gregorian year 2026 corresponds to 1948 Saka Era (১৯৪৮ শকাব্দ). Found "${sakaYear}". Check calendar conversion.`,
        ruleReference: 'National Calendar of India (Saka Samvat) Synchronization'
      });
    }
  }

  // 3. Notification Number Syntax Check
  const hasNotificationNo = /No\.\s*[A-Z0-9_\-\.]+\/[0-9]+\/[0-9]+/i.test(text) || /নং\s*[A-Z0-9_\-\.]+/i.test(text);
  if (!hasNotificationNo) {
    alerts.push({
      id: 'lint-no-syntax',
      category: 'numbering',
      level: 'warning',
      title: 'Notification Number Format',
      message: 'Standard file/notification reference number format (e.g., No. AAP.12/2026/45) was not detected.',
      ruleReference: 'Assam Secretariat Manual of Office Procedure'
    });
  }

  // 4. Masthead & Part Designation Check
  const hasPart = /PART\s*[-–]\s*[I|V|X|A-Z]+/i.test(text) || /ভাগ\s*[-–]\s*[১-৯ক-হ]+/i.test(text);
  if (!hasPart && doc.gazetteType === 'Extraordinary') {
    alerts.push({
      id: 'lint-masthead-part',
      category: 'masthead',
      level: 'info',
      title: 'Part Designation in Extraordinary Gazette',
      message: 'Verify if Part designation (e.g. PART-IIA or ভাগ-২ক) is needed for this classification of notification.',
      ruleReference: 'Directorate of Printing & Stationery Gazette Part Guidelines'
    });
  }

  return alerts;
}
