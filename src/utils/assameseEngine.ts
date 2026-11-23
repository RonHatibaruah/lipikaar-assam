import { Issue } from '../types';

interface DictionaryEntry {
  pattern: RegExp | string;
  replacement: string;
  type: 'spelling' | 'grammar' | 'statutory' | 'typography';
  severity: 'critical' | 'warning' | 'info';
  explanation: string;
  ruleCitation: string;
}

// Knowledge base of known Assamese orthographic patterns based on Asam Sahitya Sabha & Hemkosh
export const ASSAMESE_ORTHOGRAPHY_RULES: DictionaryEntry[] = [
  {
    pattern: /অধিসুচনা/g,
    replacement: 'অধিসূচনা',
    type: 'spelling',
    severity: 'critical',
    explanation: "হেমকোষ আৰু প্ৰশাসনিক পৰিভাষা অনুসৰি 'অধিসূচনা' শব্দত দীৰ্ঘ 'ূ' কাৰ হ'ব লাগে।",
    ruleCitation: "হেমকোষ প্ৰশাসনিক শ্ৰেণী / অসম চৰকাৰ অধিসূচনা ধাৰা"
  },
  {
    pattern: /নিৰ্দ্দেশ/g,
    replacement: 'নিৰ্দেশ',
    type: 'spelling',
    severity: 'warning',
    explanation: "অসম সাহিত্য সভাৰ আধুনিক বৰ্ণাশুদ্ধি নিয়ম অনুসৰি ৰেফৰ তলত ব্যঞ্জনবৰ্ণৰ দ্বিত্ব নহয়।",
    ruleCitation: "অসম সাহিত্য সভাৰ আধুনিক অসমীয়া বৰ্ণাশুদ্ধি নিয়ম ৫"
  },
  {
    pattern: /কাৰ্য্যালয়/g,
    replacement: 'কাৰ্যালয়',
    type: 'spelling',
    severity: 'warning',
    explanation: "ৰেফৰ পিছত য-কাৰৰ দ্বিত্ব বৰ্জন কৰিব লাগে (কাৰ্য্যালয় -> কাৰ্যালয়)।",
    ruleCitation: "অসম সাহিত্য সভাৰ বৰ্ণাশুদ্ধি সংহিতা (দ্বিত্ব বৰ্জন)"
  },
  {
    pattern: /প্ৰকাশীত/g,
    replacement: 'প্ৰকাশিত',
    type: 'spelling',
    severity: 'critical',
    explanation: "'প্ৰকাশ' শব্দৰ লগত 'ইত' প্ৰত্যয় যোগ হৈ 'প্ৰকাশিত' হয় (হ্ৰস্ব ি-কাৰ)।",
    ruleCitation: "অসমীয়া ব্যাকৰণ প্ৰত্যয় বিধি"
  },
  {
    pattern: /ৰাজপএ/g,
    replacement: 'ৰাজপত্ৰ',
    type: 'spelling',
    severity: 'critical',
    explanation: "ভুল যুক্তাক্ষৰ: 'ত্ৰ' (ত+ৰ) ৰ স্থানত কেৱল 'এ' ব্যৱহাৰ কৰা হৈছে।",
    ruleCitation: "অসম প্ৰেছ যুক্তাক্ষৰ নিৰ্দেশনা"
  },
  {
    pattern: /সৰকাৰ/g,
    replacement: 'চৰকাৰ',
    type: 'spelling',
    severity: 'critical',
    explanation: "তালব্য ধ্বনি: 'চৰকাৰ' শব্দত প্ৰথম বৰ্ণ 'চ' হয়, 'স' নহয়।",
    ruleCitation: "হেমকোষ প্ৰশাসনিক অভিধান"
  },
  {
    pattern: /শচিব/g,
    replacement: 'সচিব',
    type: 'spelling',
    severity: 'critical',
    explanation: "দণ্ড্য 'স': চৰকাৰী পদবীত 'সচিব' (Secretary) লিখা হয়, 'শচিব' অশুদ্ধ।",
    ruleCitation: "অসম অসামৰিক সেৱা পদবী নিৰ্দেশিকা"
  },
  {
    pattern: /প্ৰনয়ন/g,
    replacement: 'প্ৰণয়ন',
    type: 'spelling',
    severity: 'critical',
    explanation: "ণ-ত্ব বিধি: ৰ-ৰ পৰৱৰ্তী ন-বৰ্ণ মূৰ্ধণ্য 'ণ' হ'ব লাগে (প্ৰ+নয়ন = প্ৰণয়ন)।",
    ruleCitation: "ণ-ত্ব বিধি নিয়ম ২ (ঋ, ৰ, ষ-ৰ পৰৱৰ্তী নিয়ম)"
  },
  {
    pattern: /আইন শৃংখলা/g,
    replacement: 'আইন-শৃংখলা',
    type: 'typography',
    severity: 'info',
    explanation: "যুগ্ম প্ৰশাসনিক শব্দত হাইফেন (-) প্ৰয়োগ কৰা চৰকাৰী প্ৰেছৰ মান্য ৰীতি।",
    ruleCitation: "অসম চৰকাৰী মুদ্ৰণালয় শৈলী নিৰ্দেশনা (Style Manual)"
  },
  {
    pattern: /লব/g,
    replacement: 'ল’ব',
    type: 'spelling',
    severity: 'warning',
    explanation: "ভৱিষ্যত কালৰ ক্ৰিয়াপদত ওপৰৰ উৰ্দ্ধকমা (apostrophe) 'ল’ব' দিয়াটো মান্য অসমীয়া ৰীতি।",
    ruleCitation: "অসম সাহিত্য সভা মান্য ক্ৰিয়াৰূপ"
  },
  {
    pattern: /জুটিয়া সচিব/g,
    replacement: 'যুটীয়া সচিব',
    type: 'spelling',
    severity: 'critical',
    explanation: "চৰকাৰী পদবীত 'যুটীয়া সচিব' (Joint Secretary) বুলি লিখা হয়, 'জ' বা 'ি' অশুদ্ধ।",
    ruleCitation: "অসম চৰকাৰ কৰ্মচাৰী আৰু প্ৰশাসনিক সংস্কাৰ বিধি"
  }
];

// English administrative linter rules for bilingual gazettes
export const ENGLISH_GAZETTE_RULES: DictionaryEntry[] = [
  {
    pattern: /is please to/gi,
    replacement: 'is pleased to',
    type: 'grammar',
    severity: 'critical',
    explanation: "Statutory legal syntax: Formal passive participle required ('is pleased to').",
    ruleCitation: "Standard Gazette Enactment Phraseology"
  },
  {
    pattern: /in supersession to/gi,
    replacement: 'in supersession of',
    type: 'grammar',
    severity: 'critical',
    explanation: "Prepositional syntax: Administrative notifications require 'in supersession of'.",
    ruleCitation: "Assam Secretariat Manual of Office Procedure"
  },
  {
    pattern: /with immediate effects/gi,
    replacement: 'with immediate effect',
    type: 'grammar',
    severity: 'warning',
    explanation: "Idiomatic administrative phrasing uses the singular 'effect'.",
    ruleCitation: "Indian Administrative Drafting Standard"
  },
  {
    pattern: /Extroadinary/gi,
    replacement: 'Extraordinary',
    type: 'spelling',
    severity: 'critical',
    explanation: "Typographical error in Gazette masthead title: 'Extraordinary'.",
    ruleCitation: "The Assam Gazette Masthead Specification"
  },
  {
    pattern: /Governer/gi,
    replacement: 'Governor',
    type: 'spelling',
    severity: 'critical',
    explanation: "Misspelled constitutional authority title: 'Governor'.",
    ruleCitation: "Constitution of India / Official Nomenclature"
  },
  {
    pattern: /Deparment/gi,
    replacement: 'Department',
    type: 'spelling',
    severity: 'critical',
    explanation: "Typographical error in administrative heading: 'Department'.",
    ruleCitation: "General Drafting Rules"
  }
];

export function inspectDocumentText(text: string): Issue[] {
  const issues: Issue[] = [];
  let issueId = 1;

  // Run Assamese rules
  for (const rule of ASSAMESE_ORTHOGRAPHY_RULES) {
    const regex = new RegExp(rule.pattern);
    let match;
    while ((match = regex.exec(text)) !== null) {
      issues.push({
        id: `iss-asm-${issueId++}`,
        type: rule.type,
        severity: rule.severity,
        originalText: match[0],
        suggestionText: rule.replacement,
        explanation: rule.explanation,
        ruleCitation: rule.ruleCitation,
        startOffset: match.index,
        endOffset: match.index + match[0].length,
        status: 'pending'
      });
    }
  }

  // Run English administrative rules
  for (const rule of ENGLISH_GAZETTE_RULES) {
    const regex = new RegExp(rule.pattern);
    let match;
    while ((match = regex.exec(text)) !== null) {
      issues.push({
        id: `iss-eng-${issueId++}`,
        type: rule.type,
        severity: rule.severity,
        originalText: match[0],
        suggestionText: rule.replacement,
        explanation: rule.explanation,
        ruleCitation: rule.ruleCitation,
        startOffset: match.index,
        endOffset: match.index + match[0].length,
        status: 'pending'
      });
    }
  }

  // Sort issues by start offset in the document
  return issues.sort((a, b) => a.startOffset - b.startOffset);
}
