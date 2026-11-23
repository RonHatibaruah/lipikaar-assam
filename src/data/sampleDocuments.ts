import { GazetteDocument } from '../types';
import { inspectDocumentText } from '../utils/assameseEngine';

const RAW_DOC_1 = `অসম ৰাজপএ
অসাধাৰণ
প্ৰকাশীত কৰ্তৃত্বৰ দ্বাৰা
নং ১৬৪, দিশপুৰ, শুকুৰবাৰ, ২০ নৱেম্বৰ, ২০২৬, ২৯ কাৰ্তিক, ১৯৪৫ শকাব্দ

অসম সৰকাৰ
কৰ্মচাৰী (ক) বিভাগ
অধিসুচনা

নং AAP.84/2026/19: অসম চৰকাৰৰ ৰাজ্যপালৰ আদেশমৰ্মে প্ৰকাশ কৰা হ'ল যে ৰাজ্যৰ প্ৰশাসনিক দক্ষতা বৃদ্ধিৰ বাবে এই নিৰ্দ্দেশ জাৰি কৰা হৈছে। সংশ্লিষ্ট বিভাগসমূহে নীতি প্ৰনয়ন আৰু আইন শৃংখলা ৰক্ষাৰ ক্ষেত্ৰত তৎকালীন পদক্ষেপ লব।

উক্ত কাৰ্য্যালয়ৰ কাম-কাজ সুচাৰুৰূপে পৰিচালনাৰ বাবে শ্ৰীযুত ভাস্কৰ শৰ্মা, ACS ক যুটীয়া সচিব হিচাপে নিযুক্তি প্ৰদান কৰা হ'ল।

ৰাজ্যপালৰ আদেশমৰ্মে,
স্বাক্ষৰ/-
(ৰাজীৱ বৰা)
প্ৰধান শচিব, অসম চৰকাৰ`;

const RAW_DOC_2 = `THE ASSAM GAZETTE
EXTRAODINARY
PUBLISHED BY AUTHORITY

No. 289, Dispur, Wednesday, 18th November, 2026, 27 Kartika, 1948 Saka

GOVERNMENT OF ASSAM
ORDERS BY THE GOVERNOR
PERSONNEL (A) DEPARMENT

NOTIFICATION

No. PER(A).112/2026/41: The Governer of Assam is please to notify that in supersession to all previous orders, the administrative reforms regarding digital document verification shall come into force with immediate effects.

All administrative heads are requested to ensure adherence to standard orthography guidelines published by Directorate of Printing & Stationery, Bamunimaidam.

By order and in the name of the Governor of Assam,
Sd/-
(K. K. Dwivedi, IAS)
Principal Secretary to the Govt. of Assam`;

const RAW_DOC_3 = `অসম ৰাজপত্ৰ (THE ASSAM GAZETTE)
বিধিবদ্ধ অধিসূচনা (STATUTORY NOTIFICATION)
ভাগ-২ক (PART-IIA)

অসম চৰকাৰৰ সাধাৰণ প্ৰশাসন বিভাগ
নং GAD.305/2026/08, তাৰিখ: ২২ নৱেম্বৰ, ২০২৬

ৰাজ্যপালৰ আদেশমৰ্মে / ORDERS BY THE GOVERNOR:

ৰাজ্যপাল মহোদয়ে এই আদেশ জাৰি কৰি সন্তোষ প্ৰকাশ কৰিছে যে সকলো চৰকাৰী প্ৰকাশনৰ বাবে লিপিকাৰ ব্যৱস্থা প্ৰৱৰ্তন কৰা হ'ল। The Governor is please to approve the adoption of digital proofreading for all official publications. 

সংশ্লিষ্ট সকলো জিলা আয়ুক্ত আৰু মুদ্ৰণালয়ে এই অধিসূচনা অনুসৰি তৎকালীন কাৰ্যব্যৱস্থা লব লাগিব।`;

export const INITIAL_DOCUMENTS: GazetteDocument[] = [
  {
    id: 'doc-asm-01',
    title: 'অসম ৰাজপত্ৰ (অসাধাৰণ) — কৰ্মচাৰী বিভাগ অধিসূচনা',
    department: 'কৰ্মচাৰী (ক) বিভাগ, অসম চৰকাৰ',
    gazetteType: 'Extraordinary',
    gazetteNumber: 'No. 164/2026',
    issueDate: '2026-11-20',
    sakaDate: '29 Kartika, 1945 Saka (Discrepancy)',
    bhaskarabdaDate: '4 Aghon, 1433 Bhaskarabda',
    language: 'assamese',
    sourceText: RAW_DOC_1,
    currentText: RAW_DOC_1,
    status: 'under_review',
    assignedTo: 'ড° অমৰজ্যোতি হাজৰিকা (মুখ্য সংশোধক / Head Reader)',
    role: 'proofreader',
    issues: inspectDocumentText(RAW_DOC_1)
  },
  {
    id: 'doc-eng-02',
    title: 'The Assam Gazette (Extraordinary) — Personnel (A) Notification',
    department: 'Personnel (A) Department, Govt of Assam',
    gazetteType: 'Extraordinary',
    gazetteNumber: 'No. 289/2026',
    issueDate: '2026-11-18',
    sakaDate: '27 Kartika, 1948 Saka',
    bhaskarabdaDate: '2 Aghon, 1433 Bhaskarabda',
    language: 'english',
    sourceText: RAW_DOC_2,
    currentText: RAW_DOC_2,
    status: 'draft',
    assignedTo: 'P. Bordoloi (Senior Reader)',
    role: 'proofreader',
    issues: inspectDocumentText(RAW_DOC_2)
  },
  {
    id: 'doc-bi-03',
    title: 'Bilingual Statutory Order — General Administration Department',
    department: 'General Administration Department, Dispur',
    gazetteType: 'Statutory Order',
    gazetteNumber: 'No. 305/2026',
    issueDate: '2026-11-22',
    sakaDate: '1 Aghon, 1948 Saka',
    bhaskarabdaDate: '6 Aghon, 1433 Bhaskarabda',
    language: 'bilingual',
    sourceText: RAW_DOC_3,
    currentText: RAW_DOC_3,
    status: 'under_review',
    assignedTo: 'M. K. Sarma (Proofreader Grade-I)',
    role: 'proofreader',
    issues: inspectDocumentText(RAW_DOC_3)
  }
];
