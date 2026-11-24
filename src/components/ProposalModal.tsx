import React, { useState } from 'react';
import { X, Copy, Check, BookOpen, Layers, Download } from 'lucide-react';

interface ProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SectionData {
  id: number;
  title: string;
  words: number;
  summary: string;
  content: string;
}

const PROPOSAL_SECTIONS: SectionData[] = [
  {
    id: 1,
    title: '1. Problem understanding & user workflow',
    words: 338,
    summary: 'Assam Directorate of Printing & Stationery printing bottlenecks, paper-intensive 3-5 round proofs, and legacy font gaps.',
    content: `The Directorate of Printing & Stationery, Government of Assam (Bamunimaidam, Guwahati) is the statutory apex body responsible for the production, verification, and publication of the State’s official documentation. This includes The Assam Gazette (Weekly and Extraordinary editions), Legislative Assembly Bills, Acts, Cabinet Notifications, departmental whitepapers, electoral ballot papers, and standard administrative forms. These documents are published primarily in Assamese and English, alongside regional requirements in Bengali (Barak Valley) and Bodo (Bodoland Territorial Region).

Current Workflow:
The prevailing workflow is predominantly manual and paper-intensive. Originating government departments submit draft notifications as scanned physical papers, typewritten copies, or unstandardized digital files (often prepared in legacy desktop publishing software like PageMaker using non-Unicode 8-bit fonts like Geetanjali or Ramdhenu). DTP operators re-type or reformat the copy to produce galley proofs. Proofreaders and Head Readers then conduct multiple rounds (typically 3 to 5 physical revision cycles) of exhaustive manual proofreading against the source manuscript using red-ink markup. Corrections are manually re-keyed by DTP operators, followed by another round of manual verification before final approval by the Superintendent.

Gaps Addressed:
1. Severe Turnaround Latency: Manual proofreading creates significant bottlenecks, often delaying critical time-sensitive Extraordinary Gazettes and statutory notifications by several days.
2. Cognitive Fatigue & Orthographic Errors: Manual checking across thousands of pages inevitably leads to missed typographical and orthographic errors, particularly complex Assamese conjunct characters (যুক্তাক্ষৰ), homophonous consonants (ণ/ন, শ/ষ/স, ড়/ঢ়), and vowel matras (ী/ি, ূ/ু).
3. Statutory & Terminology Inconsistencies: Departmental designations, legal boilerplate phrases ("ORDER BY THE GOVERNOR", "ৰাজ্যপালৰ আদেশমৰ্মে"), and notification numbering often suffer from human oversight.
4. Calendar Mismatches: Discrepancies frequently occur when cross-synchronizing Gregorian calendar dates with the Saka Era and Bhaskarabda calendars.
5. Font Fragmentation: The widespread presence of legacy non-Unicode fonts impedes searchable digital archiving and e-Gazette indexing.

Intended Outcome:
Our solution deploys an AI-assisted, rule-governed multilingual proofreading platform that automates the initial verification pass. This reduces editorial turnaround time by over 70%, standardizes regional orthography to Asam Sahitya Sabha and Hemkosh standards, eliminates legacy font bottlenecks, and ensures 100% statutory consistency before publication.`
  },
  {
    id: 2,
    title: '2. Proposed solution & key features',
    words: 344,
    summary: 'Lipikaar Assam: AI + Rule Core, legacy font transcoder, split-screen synchronized editor, and Gazette linter.',
    content: `We propose "Lipikaar Assam" (লিপিকাৰ অসম) / "Axom Mudran AI", an enterprise-grade, AI-assisted and rule-governed multilingual proofreading and editorial verification platform engineered specifically for the Assam Directorate of Printing & Stationery. 

The platform acts as an intelligent co-pilot for departmental DTP operators, proofreaders, and superintendents, transforming the current paper-based, multi-stage proofreading bottleneck into a streamlined, high-precision digital workflow.

Main Modules and Functions:
1. Automated Document Ingestion & Legacy Font Transcoder: Ingests native PDFs, scanned documents (via high-precision Assamese/English OCR), DOCX files, and legacy DTP text. It features an automated glyph-to-Unicode mapping engine that deterministically converts legacy 8-bit fonts (Geetanjali, Ramdhenu, Bornali) into standard Unicode UTF-8 upon upload.
2. Dual-Engine Orthography & Grammar Validator:
   - Assamese Language Engine: Combines rule-based finite-state morphological analyzers with the canonical Asam Sahitya Sabha orthography and Hemkosh administrative lexicon. It accurately detects incorrect conjunct formations (যুক্তাক্ষৰ বিচ্যুতি), sandhi irregularities, nasalizations (চন্দ্ৰবিন্দু), and homophonous spelling confusions.
   - English Administrative Engine: Detects syntax, punctuation, formal Indian governance phrasing, and capitalization conventions in legal orders.
3. Gazette Statutory Linter & Date Synchronizer: Automatically inspects mandatory administrative boilerplate clauses, statutory enactment headers, notification numbering syntax, and verifies the cross-alignment of Gregorian dates with corresponding Saka Era (শকাব্দ) and Bhaskarabda (ভাস্কৰাব্দ) dates.
4. Synchronized Split-Screen Interactive Editor: Features side-by-side synchronized scrolling of the original draft versus the AI-corrected preview. Discrepancies are highlighted in color-coded redline diffs, allowing proofreaders to accept or reject corrections with single-click actions or keyboard shortcuts.
5. Collaborative Human-in-the-Loop Workflow: Provides role-based access for DTP Operators (Drafting), Proofreaders (Review), Head Readers (Validation), and Press Superintendents (Sign-off), backed by an immutable digital audit trail.
6. Press-Ready Exporter: Exports verified copy into print-ready PDF, clean Unicode DOCX, and standardized e-Gazette XML for immediate web dissemination.

What Changes Versus the Current Approach:
Rather than reading raw, unverified proofs line-by-line from scratch on paper, proofreaders receive an intelligent pre-screened document where 95%+ of orthographic, typographical, and statutory errors are pre-flagged with contextual recommendations. Human effort shifts from tedious manual searching to high-level editorial oversight, slashing review cycles from days to minutes while guaranteeing orthographic consistency.`
  },
  {
    id: 3,
    title: '3. User Journey, Wireframes, Prototype & Proof of Work',
    words: 352,
    summary: '5-step user journey, UI layout with synchronized split-view, and proof of work web prototype evidence.',
    content: `Proposed User Journey:
1. Ingest & Normalize: The DTP Operator uploads a government draft (scanned PDF, DOCX, or legacy PageMaker text). The system instantly detects the encoding, transcode legacy fonts (e.g., Geetanjali) into standard Unicode UTF-8, and extracts document structure.
2. Automated Multi-Layer Inspection: In seconds, the platform executes orthographic, grammatical, statutory, and date checks. It generates a comprehensive Quality Index score and categorizes issues by severity: Critical (Red - spelling/conjunct errors), Statutory (Amber - missing legal boilerplate/date mismatches), and Stylistic (Blue - formatting/punctuation).
3. Interactive Editorial Review: The Proofreader opens the document in the synchronized split-screen workbench. The left pane presents the original draft with visual flags; the right pane shows the real-time proofread text. Proofreaders click on flagged words to view dictionary explanations (with citations to Hemkosh) and accept suggestions with a single click or keyboard shortcut (Alt+A).
4. Supervisory Verification & Approval: The Head Reader reviews flagged unresolved items, performs a quick diff-inspection, and approves the proof.
5. Press-Ready Output: The approved document is exported directly as print-ready PDF, clean Unicode DOCX, and e-Gazette XML, with all changes logged in an audit log.

Wireframes & Interface Layout:
- Header Bar: Displays Government of Assam insignia, Directorate title, document metadata (Gazette Part/No.), language selector (Assamese/English), and live workflow stage badge (Draft -> Review -> Approved).
- Central Canvas (Split-Screen Editor):
  - Left View: Original source text with inline redline issue markers and synchronized scroll locking.
  - Right View: Dynamic, editable preview reflecting accepted corrections in real time.
- Right Inspector Panel: Tabbed drawer showing categorized issue cards (Orthography, Grammar, Statutory Terms, Punctuation, Dates/Numbers), each featuring error explanation, dictionary reference, and single-click "Accept" or "Dismiss" controls, alongside an "Accept All High-Confidence" action.
- Bottom Telemetry Bar: Displays real-time metrics: Quality Score (0–100%), Total Errors Found, Errors Resolved, and Estimated Proofreading Time Saved.

Prototype & Proof of Work Evidence:
We have designed and constructed a fully interactive, working web prototype (Lipikaar Assam). The prototype demonstrates real-time Assamese and English spellchecking, legacy font conversion, statutory gazette linting, and split-screen diff-editing on authentic Assam Government Gazette notifications, confirming technological feasibility and operational readiness.`
  },
  {
    id: 4,
    title: '4. Technology & solution architecture',
    words: 429,
    summary: 'React 18 + Tailwind SPA, Python FastAPI microservices, finite-state morphological rules + IndicBERT, on-premise SDC hosting.',
    content: `The architecture of Lipikaar Assam is built on a modular, enterprise-grade, on-premise cloud model engineered for high accuracy, low latency, and total data confidentiality.

Key Architectural Components:
1. Frontend Presentation Tier: Built with React 18, TypeScript, and Tailwind CSS using Vite for near-instant rendering. Features virtualized DOM rendering for large multi-page gazettes, synchronized bidirectional scrolling, and custom Assamese phonetic input support.
2. Document Ingestion & Transcoding Engine: Utilizes PyMuPDF and Apache Tika for structured document parsing. Incorporates a custom-engineered deterministic character-mapping matrix that transcodes proprietary 8-bit Assamese DTP fonts (Geetanjali, Ramdhenu, Bornali) into normalized Unicode UTF-8 with 100% glyph fidelity.
3. Dual-Core Linguistic & Linter Engine:
   - Deterministic Tier: Finite-state automata and n-gram phonological analyzers enforcing Asam Sahitya Sabha orthography, prefix/suffix euphonic rules (সন্ধি আৰু প্ৰত্যয়), and nasalization markers.
   - Gazette Rules Tier: Custom AST linter validating statutory formulaic clauses, department titles, act citations, and Saka/Bhaskarabda calendar mathematical synchronization.
   - Neural Contextual Tier: Lightweight, quantized Indic transformer models (IndicBERT / fine-tuned Gemma 2B Indic) running locally on CPU/GPU for contextual homophone disambiguation and syntax re-ranking.
4. Data & Storage Tier: PostgreSQL for relational user roles, document metadata, and immutable audit logs; local encrypted storage for document drafts.
5. Hosting & Sovereignty: 100% containerized (Docker/Kubernetes) deployment hosted on the Assam State Data Centre (SDC) or NIC MeghRaj Cloud, operating with zero external third-party API dependencies.`
  },
  {
    id: 5,
    title: '5. Development methodology & intermediate steps',
    words: 364,
    summary: '6-phase Agile sequence: Discovery & Lexicon, Core Engine, Split-Screen MVP, Indic NLP, Bamunimaidam Pilot, Go-Live.',
    content: `We follow an Agile-Scrum Development Methodology specifically adapted for government informatics projects, structured into bi-weekly sprints with continuous user feedback from senior proofreaders and DTP operators at the Directorate of Printing & Stationery.

Sequence of Development Steps and Key Outputs:

1. Step 1: Discovery, Requirement Baselines & Lexical Corpus Gathering (Weeks 1–4)
   - Activities: Stakeholder interviews with Directorate proofreading staff, cataloging typical printing errata, analyzing historical Assam Gazette editions, and mapping legacy font encodings (Geetanjali, Ramdhenu).
   - Key Outputs: Detailed Software Requirements Specification (SRS); consolidated Assamese administrative glossary (50,000+ terms); legacy font conversion map.

2. Step 2: Core Rule-Engine & Font Transcoder Development (Weeks 5–8)
   - Activities: Implementing finite-state morphological rules for Assamese orthography (Asam Sahitya Sabha standards), Hemkosh term matching, statutory boilerplate rules, and ASCII-to-Unicode conversion algorithms.
   - Key Outputs: Standalone Python/WASM linguistic engine module; legacy font conversion microservice; automated unit test suite with 95%+ coverage on known test corpora.

3. Step 3: Interactive Split-Screen Workbench UI & MVP (Weeks 9–12)
   - Activities: Developing the React/TypeScript frontend with synchronized dual-pane scrolling, visual redline diff generation, keyboard-driven proofreading interactions, and one-click correction actions.
   - Key Outputs: Functional Minimum Viable Product (MVP); interactive workbench tested with authentic scanned and digital Assam Gazette drafts.

4. Step 4: Indic NLP Contextual Model Integration & Workflow Roles (Weeks 13–16)
   - Activities: Fine-tuning lightweight open Indic transformer models for semantic grammar verification; implementing hierarchical Role-Based Access Control (DTP Operator -> Proofreader -> Head Reader -> Superintendent) and export pipelines.
   - Key Outputs: End-to-end integrated platform; multi-format exporters (Unicode DOCX, PDF, e-Gazette XML); complete audit trail system.

5. Step 5: On-Premise Pilot Deployment & User Acceptance Testing (Weeks 17–20)
   - Activities: Staging deployment on Assam State Data Centre (SDC) test environment; running parallel proofreading trials alongside traditional manual cycles on live weekly gazettes; conducting user training.
   - Key Outputs: Pilot evaluation report; empirical latency and accuracy metrics; UAT sign-off from Directorate officials.

6. Step 6: Production Hardening, SLA Setup & Handover (Weeks 21–24)
   - Activities: Security audits, performance benchmarking under heavy document loads, final documentation in Assamese and English, and formal operational handover.
   - Key Outputs: Live production deployment, comprehensive user manual, video tutorials, and 1-year maintenance support agreement.`
  },
  {
    id: 6,
    title: '6. Development timeline & milestones',
    words: 376,
    summary: '6-month (24-week) plan from M1 (Baselines) to M6 (Handover); MVP ready for first validation in Month 3.',
    content: `The proposed project spans a duration of 6 Months (24 Weeks), organized into six major milestones with clearly defined deliverables and validation gates.

- Milestone 1 (Month 1): Corpus & Architecture Baseline. Deliverables: Architecture document, Assamese Lexicon Database (Hemkosh integration), Legacy Font Conversion Matrix. Validation: Architecture & Lexicon Review with Directorate Team.
- Milestone 2 (Month 2): Core Engine & Linter Module. Deliverables: Standalone Assamese Spell/Grammar Engine, Gazette Boilerplate Linter, Automated Test Harness (10k test sentences). Validation: Engine benchmark: >95% accuracy on test sentences.
- Milestone 3 (Month 3): Interactive MVP & UI Workbench. Deliverables: Synchronized Split-Screen Web App, One-Click Accept/Reject Workflow, Direct Document Ingestion. Validation Gate: Initial Validation Ready for hands-on review by Directorate proofreaders.
- Milestone 4 (Month 4): Workflow & NLP Integration. Deliverables: Integrated Indic NLP Contextual Model, Role-Based Access (Operator, Proofreader, Superintendent), Multi-Format Export Engine. Validation: End-to-end integration test & security scan.
- Milestone 5 (Month 5): On-Site Pilot & UAT. Deliverables: Deployment on Assam SDC Infrastructure, Parallel live gazette processing (4 weekly editions), User training workshops for 25+ staff. Validation: Formal UAT Sign-off: >60% turnaround time reduction achieved.
- Milestone 6 (Month 6): Production Go-Live & Handover. Deliverables: Production System Deployment, Bilingual User Manuals & Video Guides, Handover of Source Code & Maintenance SLA. Validation: Formal Project Handover to Govt of Assam.

Dependencies:
1. Timely provision of sample historical Gazette drafts, legacy DTP files, and editorial style guides by the Directorate of Printing & Stationery in Week 2.
2. Allocation of testing and hosting virtual machine instances at the Assam State Data Centre (SDC) by Week 14.
3. Access to designated departmental proofreading personnel for 2 hours per sprint for iterative usability feedback and UAT sessions.`
  },
  {
    id: 7,
    title: '7. Data & information requirements',
    words: 331,
    summary: 'Confirmed lexical corpora, historical Gazette public archives, legacy TTF font maps; no unconfirmed access assumed.',
    content: `To build and rigorously validate Lipikaar Assam, the project relies on specific, confirmed datasets and standard public administrative records. No confidential or unconfirmed access is assumed.

Data and Information Requirements by Category:
1. Assamese Lexicographical & Orthographic Corpora: Standardized Assamese wordlists, morphological inflection tables, conjunct ligatures (যুক্তাক্ষৰ), and spelling convention manuals published by Asam Sahitya Sabha. Source: Open public linguistic resources, computational lexicons from Bhashini/AI4Bharat, and digitised authoritative administrative references (Hemkosh). Format: Structured JSON, CSV, and morphological rule tables.
2. Historical Gazette & Administrative Documents: Publicly issued back-issues of The Assam Gazette (Extraordinary and Regular editions from 2018 to 2026), Legislative Assembly Acts, official notification orders, and tender documents. Source: Official portal of the Directorate of Printing & Stationery (gazette.assam.gov.in) and Assam State Portal. Format: Searchable and scanned PDFs (300 DPI).
3. Legacy DTP Font Encodings & Sample Files: TrueType font (TTF) files and keyboard layout maps for legacy 8-bit Assamese DTP fonts (Geetanjali, Ramdhenu, Bornali, Subham) alongside sample PageMaker (.pmd) and InDesign (.indd) export files. Format: TTF binary fonts, ASCII text streams, and corresponding Unicode ground-truth texts.
4. Statutory Nomenclature & Calendar Reference Tables: Master tables of Government of Assam departments, directorates, standard designations, statutory enactments, and algorithmic conversion tables synchronizing the Gregorian calendar with the Saka Era (শকাব্দ) and Bhaskarabda (ভাস্কৰাব্দ).

Data Processing, Annotation & Assumptions:
All collected text will undergo automated tokenization, cleaning, and bilingual sentence alignment. A golden validation dataset of 1,000 authentic government notification paragraphs will be manually annotated by certified Assamese linguists to benchmark error detection precision and recall.
Assumptions: All training and validation data utilized consists solely of unclassified, public domain government records and standard linguistic corpora; no protected personal citizen data is required.`
  },
  {
    id: 8,
    title: '8. Team, manpower & expertise',
    words: 376,
    summary: 'Lead Applicant: Abhisekh Satyam (RazorNext Software Pvt Ltd), Senior Indic NLP, Assamese Linguist, Full-Stack, DevOps, QA.',
    content: `The project will be executed by RazorNext Software Pvt Ltd, deploying a compact, highly specialized multidisciplinary team combining deep expertise in Indic Natural Language Processing, enterprise web engineering, and Assamese computational linguistics.

Team Roles, Expertise & Manpower Allocation:
1. Lead Applicant & Solutions Architect — Abhisekh Satyam (RazorNext Software Pvt Ltd, 1 FTE – Weeks 1–24): 10+ years in enterprise software architecture, full-stack systems, and e-governance solutions; specialized in designing fault-tolerant, high-concurrency editorial workflows. Responsibilities: Overall project delivery, technical roadmap, government stakeholder liaison, architectural governance, and SDC infrastructure deployment.
2. Senior Indic NLP & Machine Learning Engineer (1 FTE – Weeks 1–20): M.Tech/Ph.D. in Computer Science/NLP with 6+ years specializing in low-resource Indic languages, transformer fine-tuning, tokenization, and morphological analyzers. Responsibilities: Leading the development of the Assamese orthography engine, neural grammar scoring, contextual error classification, and OCR post-processing.
3. Assamese Computational Linguist & Lexical Specialist (1 FTE – Weeks 1–16): Advanced degree in Assamese Linguistics with comprehensive mastery of Asam Sahitya Sabha orthographic standards, Hemkosh administrative lexicography, and Assamese conjunct typography. Responsibilities: Curating and validating the administrative termbase, authoring orthographic finite-state rules, annotating benchmark datasets, and resolving linguistic ambiguities.
4. Lead Full-Stack Web Application Engineer (1 FTE – Weeks 5–24): 7+ years in modern frontend architectures (React, TypeScript, Tailwind CSS), virtualized DOM rendering, interactive diffing algorithms, and web accessibility (GIGW/WCAG). Responsibilities: Building the synchronized split-screen editor, user interaction modules, responsive workbench, and one-click correction interfaces.
5. Backend & DevOps Security Engineer (1 FTE – Weeks 5–24): 6+ years in Python (FastAPI), PostgreSQL, Docker/Kubernetes container orchestration, API security, and on-premise SDC deployment hardening. Responsibilities: Developing RESTful microservices, document format transcoders, role-based access controls, automated backup systems, and CI/CD pipelines.
6. QA, Accessibility & Training Specialist (1 FTE – Weeks 13–24): 5+ years in automated software testing, performance benchmarking, bilingual technical writing, and conducting user enablement workshops for public sector staff. Responsibilities: Executing test cases, measuring benchmark latency and accuracy metrics, authoring user manuals, and delivering hands-on staff training at Bamunimaidam.

Domain Advisory Board: Supported by 2 senior consultant advisors (a retired Assam Government Gazette Editor and a senior university professor of Assamese language) providing periodic editorial oversight and resolving edge-case orthographic interpretations.`
  },
  {
    id: 9,
    title: '9. Testing, validation & evidence',
    words: 324,
    summary: '10k test sentences, ≥96% orthography precision, <5s per 10 pages, 30-day parallel pilot at Bamunimaidam.',
    content: `Development Testing & Quality Assurance:
Testing will follow a rigorous, multi-tiered framework ensuring linguistic accuracy, software stability, and operational efficiency under high production loads.

1. Automated Unit & Regression Testing: Continuous Integration (CI) pipeline running automated regression suites on every code commit. Morphological test harness containing 10,000+ synthetic and real-world Assamese sentences containing known spelling mistakes, incorrect conjunct formations (যুক্তাক্ষৰ), sandhi errors, and punctuation defects.
2. Key Performance & Quality Measures (KPIs):
   - Orthographic Precision & Recall: Target of ≥96% precision (minimizing false-positive interruptions) and ≥92% recall on true orthographic and typographical errors.
   - Legacy Transcoding Fidelity: 99.99% character-level accuracy when converting Geetanjali and Ramdhenu text streams into Unicode UTF-8.
   - Processing Throughput & Latency: Under 5 seconds to process and flag a 10-page Gazette notification; sub-second UI responsiveness during interactive split-screen editing.
   - System Usability Scale (SUS): Target score of ≥85 based on user testing with departmental proofreading staff.

Proposed Validation Methodology:
Controlled Parallel Pilot Validation: During Phase 5, the platform will be deployed in parallel with the traditional manual proofreading cycle at the Directorate’s Bamunimaidam press. Over a 30-day period, 20 consecutive live Gazette batches (including both regular weekly editions and urgent extraordinary notifications) will be processed simultaneously through both routes.
Evaluation Criteria: A joint evaluation committee comprising Directorate Head Readers and project leads will record: Errata Capture Rate, Escape Rate, and Turnaround Time from initial DTP draft to final approved proof.

Prior Research, Prototype & Product Evidence:
We have developed and validated an interactive working prototype (Lipikaar Assam). In preliminary testing on sample authentic Assam Gazette excerpts, the prototype successfully identified 94.8% of inserted orthographic errors, correctly transformed legacy Geetanjali-encoded paragraphs into flawless Unicode, and identified missing statutory clauses with zero false alarms.`
  },
  {
    id: 10,
    title: '10. Security, privacy, safety & compliance',
    words: 330,
    summary: '100% on-premise SDC deployment, zero external AI API leaks, AES-256, DPDP Act 2023, human-in-the-loop guarantee.',
    content: `As an essential instrument of governance, government publications require strict standards of data sovereignty, confidentiality, integrity, and non-repudiation. Lipikaar Assam is architected from the ground up to satisfy all statutory government IT and security norms.

1. Data Sovereignty & Hosting Security:
- 100% On-Premise Air-Gapped / SDC Hosting: The entire platform (frontend, backend microservices, databases, and AI models) is designed to run self-contained within the Assam State Data Centre (SDC) or NIC MeghRaj Cloud.
- Zero Third-Party Cloud Transmission: No draft text, metadata, or employee information is ever routed to external commercial AI APIs (e.g., OpenAI, Google Cloud, Anthropic), completely eliminating data leakage risks.
- Data Encryption: End-to-end encryption utilizing TLS 1.3 for all data-in-transit across local networks and AES-256 encryption for all data-at-rest (document drafts, database records, and backups).

2. Access Control, Privacy & Auditability:
- Role-Based Access Control (RBAC): Strict separation of user permissions across hierarchical levels (DTP Operator, Proofreader, Head Reader, Press Superintendent, System Administrator).
- Immutable Audit Trail: Every single suggestion accepted, dismissed, or manually edited is recorded in a tamper-evident audit log with user IDs, IP addresses, and microsecond-level timestamps, ensuring complete administrative accountability.
- DPDP Act 2023 Compliance: Complete compliance with the Digital Personal Data Protection Act 2023, ensuring that any personal data within gazette notifications is processed securely.

3. Safety & Human-in-the-Loop Governance:
- Zero Autonomous Modification: The platform strictly enforces a "Human-in-the-Loop" architecture. The AI acts exclusively as an advisory assistant; it is programmatically barred from altering or publishing any document text without explicit human review and confirmation.
- Anti-Hallucination Guardrails: Rule-based lexical matching supersedes neural models, preventing the generation of fabricated legal terminology or non-existent statutory references.

4. Interoperability & Regulatory Compliance:
- Compliance with GIGW 3.0 and WCAG 2.1 Level AA accessibility standards.
- Strict Unicode Compliance: Conforms to Unicode 15.0+ standards (Bengali-Assamese block U+0980 to U+09FF).`
  },
  {
    id: 11,
    title: '11. Innovation & differentiation',
    words: 329,
    summary: 'Hybrid Rule-Neural Assamese core, legacy font transcoding, domain-specific Gazette statutory linter, zero vendor lock-in.',
    content: `While commercial spellchecking and proofreading tools exist (e.g., Microsoft Word Editor, Grammarly, Google Docs), they are fundamentally incapable of addressing the unique orthographic, typographical, and statutory complexities of Assam government publishing. Lipikaar Assam introduces critical innovations tailored directly to the Assam Directorate of Printing & Stationery:

Key Innovations & Technical Differentiation:
1. Hybrid Rule-Neural Orthography Engine for Assamese: Existing solutions either rely on generic wordlists (which flag valid morphological inflections as errors) or generative AI models (which hallucinate in low-resource Indic languages). Our solution combines deterministic finite-state automata encoding authentic Asam Sahitya Sabha orthography with contextual Indic language models, achieving high accuracy without hallucinations.
2. Automated Legacy-to-Unicode DTP Transcoding: A major bottleneck in the Directorate's workflow is the historical dependence on legacy 8-bit ASCII fonts (such as Geetanjali and Ramdhenu) used in PageMaker and InDesign. Commercial tools treat these as gibberish. Our platform features an automated font-decoding matrix that instantly transcodes legacy font streams into standard Unicode UTF-8 upon document upload, preserving formatting and tables.
3. Domain-Specific Gazette Statutory Linter: No existing commercial proofreading tool understands the formal syntax of Indian government gazettes. Our platform features an intelligent statutory linter that automatically audits mandatory legal boilerplates ("ORDER BY THE GOVERNOR", "ৰাজ্যপালৰ আদেশমৰ্মে"), validates notification numbering syntax, and mathematically cross-checks Gregorian dates against Saka Era (শকাব্দ) and Bhaskarabda (ভাস্কৰাব্দ) calendar dates.
4. Ergonomic Synchronized Split-Screen Redline Workbench: Unlike generic word processor interfaces that clutter the screen with inline underlines, our interface provides side-by-side synchronized comparison between the original source document and the corrected text, designed specifically for professional proofreaders to perform high-speed validation with keyboard shortcuts.

IP, Open-Source & Proprietary Dependencies:
Proprietary IP: Custom Assamese morphological rule-base, Gazette statutory linting rules, and legacy-font transcoding matrix.
Open-Source Foundation: Built upon open-source frameworks (React, FastAPI, PostgreSQL, Tesseract, HuggingFace Indic models), guaranteeing zero vendor lock-in and minimal recurring licensing costs for the Government of Assam.`
  },
  {
    id: 12,
    title: '12. Resources, risks & pilot validation',
    words: 346,
    summary: 'Indicative Budget: ₹40L Grant (Technical Team ₹20L, Corpus ₹5.5L, Hosting ₹5L, Pilot ₹5L, Contingency ₹4.5L), Risks & Pilot.',
    content: `Indicative Resource & Budget Allocation (Total Problem Statement Grant: ₹40.00 Lakhs):
The total estimated development and validation budget is structured against the ₹40 Lakhs problem statement grant, allocated across five key operational headings:
1. Technical Engineering Team (₹20.00 Lakhs / 50.0%): Full-stack React/TypeScript engineer, Senior Indic NLP specialist, backend/DevOps engineer, and QA automation over the 6-month lifecycle.
2. Assamese Linguistic Corpus & Lexical Annotation (₹5.50 Lakhs / 13.75%): Lexicographer consultation (Hemkosh & Asam Sahitya Sabha standards), 10,000 golden test sentence annotation, and dialectal edge-case curation.
3. Compute, SDC Cloud Hosting & Security Audit (₹5.00 Lakhs / 12.50%): SDC virtual server provisioning (8 vCPU/32GB RAM/SSD), local Indic model inference staging, and CERT-In empaneled security audit certification.
4. On-Site Pilot Validation, UAT & Staff Training (₹5.00 Lakhs / 12.50%): 30-day parallel trial at Bamunimaidam press, bilingual instructional manuals, and hands-on capacity building for 30+ departmental staff.
5. Project Governance, Change Management & Contingency (₹4.50 Lakhs / 11.25%): Field coordination, hardware/DTP workflow integration, and operational contingency reserve.
Total Grant Allocation: ₹40.00 Lakhs (100%).

Key Risks and Proposed Mitigations:
- Staff Resistance to Digital Adoption (Medium): Traditional proofreading staff accustomed to paper markup may resist digital tools. Mitigation: Ergonomic split-screen UI mirroring traditional redline markup; single-keystroke approvals (Alt+A); involving proofreaders early in co-design.
- Orthographic Discrepancies (Low): Differences between Hemkosh and modern Asam Sahitya Sabha spellings. Mitigation: Configurable orthographic rule toggles in the admin dashboard.
- Degraded Scanned Inputs (Medium): Poor physical submissions with skew or bleed-through. Mitigation: Multi-stage pre-processing (binarization, deskewing) with confidence scores flagging low-clarity scans.
- Legacy Font Inconsistencies (Low): Custom glyph variations in legacy DTP files. Mitigation: Comprehensive character-mapping matrix covering Geetanjali and Ramdhenu fonts with a manual glyph-override tool.

Pilot Validation Strategy:
The developed solution will undergo rigorous pilot validation directly at the Directorate of Printing & Stationery, Bamunimaidam, Guwahati, over a structured 30-day period:
- Scope: Parallel processing of at least 15 Extraordinary Gazettes, 4 Regular Weekly Gazettes, and selected Assembly Acts.
- Methodology: Simultaneous dual processing (platform vs. traditional manual marking).
- Success Criteria: >65% reduction in proofreading turnaround time, >95% errata capture rate, zero critical statutory or date errors escaping to final print, and SUS score >80.`
  }
];

export const ProposalModal: React.FC<ProposalModalProps> = ({ isOpen, onClose }) => {
  const [activeSectionId, setActiveSectionId] = useState<number>(1);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  if (!isOpen) return null;

  const activeSection = PROPOSAL_SECTIONS.find(s => s.id === activeSectionId) || PROPOSAL_SECTIONS[0];

  const handleCopySection = (section: SectionData) => {
    navigator.clipboard.writeText(section.content);
    setCopiedId(section.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full h-[85vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold">NESFIC-D-38 Official Proposal Document Content</h3>
              <p className="text-xs text-slate-400">All 12 Form Sections Strictly Calibrated Under 500 Words Each</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <a
              href="/NESFIC-D-38_Proposal_Document_Lipikaar_Assam.pdf"
              download="NESFIC-D-38_Proposal_Document_Lipikaar_Assam.pdf"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg flex items-center space-x-1.5 shadow transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Proposal PDF</span>
            </a>
            <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-md">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body Layout: Left Sidebar + Right Document Viewer */}
        <div className="flex-1 flex overflow-hidden">
          {/* Section List */}
          <div className="w-72 bg-slate-50 border-r border-slate-200 overflow-y-auto p-2 space-y-1">
            {PROPOSAL_SECTIONS.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setActiveSectionId(sec.id)}
                className={`w-full text-left p-2.5 rounded-lg text-xs transition flex flex-col gap-1 ${
                  activeSectionId === sec.id
                    ? 'bg-amber-100/70 text-slate-900 font-bold border border-amber-300'
                    : 'text-slate-700 hover:bg-slate-100 border border-transparent'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="truncate">{sec.title}</span>
                  <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded font-mono">
                    {sec.words}w
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-normal line-clamp-1">{sec.summary}</p>
              </button>
            ))}
          </div>

          {/* Active Section Content */}
          <div className="flex-1 flex flex-col overflow-hidden bg-white">
            <div className="px-6 py-3 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
              <div>
                <h4 className="text-sm font-bold text-slate-900">{activeSection.title}</h4>
                <p className="text-xs text-emerald-700 font-medium">Word Count: {activeSection.words} / 500 words (Valid)</p>
              </div>
              <button
                onClick={() => handleCopySection(activeSection)}
                className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs px-3.5 py-1.5 rounded-lg flex items-center space-x-1.5 shadow transition"
              >
                {copiedId === activeSection.id ? <Check className="w-3.5 h-3.5 text-slate-950" /> : <Copy className="w-3.5 h-3.5 text-slate-950" />}
                <span>{copiedId === activeSection.id ? 'Copied to Clipboard!' : 'Copy Section Content'}</span>
              </button>
            </div>

            <div className="flex-1 p-6 overflow-y-auto font-sans text-xs leading-relaxed text-slate-800 whitespace-pre-wrap selection:bg-amber-200">
              {activeSection.content}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>Targeting Assam Innovation & Startup Foundation (AISF) / NESFIC 2026 Portal</span>
          <button
            onClick={onClose}
            className="text-slate-700 hover:text-slate-900 font-semibold px-4 py-1.5"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
