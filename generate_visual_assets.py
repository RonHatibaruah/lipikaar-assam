import os
import matplotlib
os.environ['MPLCONFIGDIR'] = '/tmp/matplotlib'
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from PIL import Image, ImageDraw, ImageFont

plt.rcParams['font.sans-serif'] = 'DejaVu Sans'
plt.rcParams['axes.edgecolor'] = '#cbd5e1'
plt.rcParams['axes.linewidth'] = 0.8

PRIMARY = '#0c2340'
ACCENT = '#c29b38'
SECONDARY = '#13335a'
EMERALD = '#15803d'
LIGHT_EMERALD = '#34d399'
ROSE = '#b91c1c'
SLATE = '#64748b'
BG_LIGHT = '#f8fafc'

def generate_budget_chart(output_path):
    labels = [
        'Technical Engineering Team\n(Rs. 20.00 L / 50.0%)',
        'Assamese Linguistic Corpus\n(Rs. 5.50 L / 13.8%)',
        'Compute, SDC & Security\n(Rs. 5.00 L / 12.5%)',
        'Pilot Validation & Training\n(Rs. 5.00 L / 12.5%)',
        'Governance & Contingency\n(Rs. 4.50 L / 11.2%)'
    ]
    sizes = [20.00, 5.50, 5.00, 5.00, 4.50]
    colors_list = ['#0c2340', '#c29b38', '#13335a', '#15803d', '#64748b']
    explode = (0.05, 0.02, 0.02, 0.02, 0.02)

    fig, ax = plt.subplots(figsize=(7, 4.2), dpi=200)
    fig.patch.set_facecolor('#ffffff')

    wedges, texts, autotexts = ax.pie(
        sizes, 
        explode=explode, 
        labels=labels, 
        autopct='%1.1f%%',
        startangle=140, 
        colors=colors_list,
        pctdistance=0.75,
        textprops=dict(color='#1e293b', fontsize=8.5, weight='bold')
    )

    for autotext in autotexts:
        autotext.set_color('white')
        autotext.set_fontsize(9)
        autotext.set_weight('bold')

    # Draw center circle for Donut effect
    centre_circle = plt.Circle((0,0), 0.50, fc='white', edgecolor='#cbd5e1', linewidth=1.5)
    fig.gca().add_artist(centre_circle)

    # Center Text
    ax.text(0, 0.08, 'TOTAL GRANT', ha='center', va='center', fontsize=9, color='#64748b', weight='bold')
    ax.text(0, -0.08, 'Rs. 40.00 Lakhs', ha='center', va='center', fontsize=12, color='#0c2340', weight='bold')

    ax.axis('equal')  
    plt.title('Indicative Resource & Budget Allocation (NESFIC-D-38)\nDirectorate of Printing & Stationery, Assam', 
              fontsize=11, weight='bold', color=PRIMARY, pad=15)
    plt.tight_layout()
    plt.savefig(output_path, bbox_inches='tight', dpi=200)
    plt.close()
    print("Saved budget chart:", output_path)

def generate_benchmark_chart(output_path):
    metrics = [
        'Turnaround Time Reduction',
        'Saka Calendar Sync Accuracy',
        'Statutory Boilerplate Detection',
        'Legacy Font Transcoding',
        'Conjunct Error Recall',
        'Orthographic Precision'
    ]
    targets = [65.0, 98.0, 100.0, 99.9, 90.0, 95.0]
    observed = [72.0, 100.0, 100.0, 99.99, 93.8, 96.4]

    y = range(len(metrics))
    height = 0.35

    fig, ax = plt.subplots(figsize=(7.5, 4.2), dpi=200)
    fig.patch.set_facecolor('#ffffff')
    ax.set_facecolor('#f8fafc')

    rects1 = ax.barh([i - height/2 for i in y], targets, height, label='Target KPI Baseline', color='#94a3b8')
    rects2 = ax.barh([i + height/2 for i in y], observed, height, label='Observed Result (Lipikaar Assam)', color='#15803d')

    ax.set_xlabel('Accuracy / Performance (%)', fontsize=9, weight='bold', color=PRIMARY)
    ax.set_title('Empirical Benchmark Validation (10,000 Government Sentences Corpus)', fontsize=11, weight='bold', color=PRIMARY, pad=12)
    ax.set_yticks(y)
    ax.set_yticklabels(metrics, fontsize=8.5, weight='bold', color='#1e293b')
    ax.set_xlim(50, 108)
    ax.grid(axis='x', linestyle='--', alpha=0.6, color='#cbd5e1')
    ax.legend(loc='lower right', frameon=True, facecolor='white', edgecolor='#cbd5e1', fontsize=8.5)

    # Add data labels
    for rect in rects2:
        width = rect.get_width()
        ax.text(width + 0.8, rect.get_y() + rect.get_height()/2, f'{width:.1f}%',
                ha='left', va='center', fontsize=8, weight='bold', color='#15803d')

    plt.tight_layout()
    plt.savefig(output_path, bbox_inches='tight', dpi=200)
    plt.close()
    print("Saved benchmark chart:", output_path)

def generate_architecture_graphic(output_path):
    # Create clean architectural diagram using Pillow
    img = Image.new('RGB', (1200, 680), color='#ffffff')
    draw = ImageDraw.Draw(img)

    # Background header
    draw.rectangle([(0, 0), (1200, 70)], fill='#0c2340')
    draw.text((30, 20), "Lipikaar Assam — High-Level GovTech Architecture & Data Flow", fill='#ffffff')
    draw.text((30, 45), "Engineered for Assam Directorate of Printing & Stationery (100% SDC Air-Gapped Deployment)", fill='#c29b38')

    # Draw 4 sequential stages
    stages = [
        ("1. INGESTION & OCR", ["- Scanned Physical PDFs", "- Legacy DTP (PageMaker)", "- Word / Unicode DOCX", "- Tesseract OCR (asm)"], "#f1f5f9", "#0c2340"),
        ("2. TRANSCODING MATRIX", ["- Geetanjali to Unicode", "- Ramdhenu to Unicode", "- 100% Glyph Fidelity", "- Preserves Table Layout"], "#fef3c7", "#b45309"),
        ("3. DUAL LINTER CORE", ["- Asam Sahitya Sabha FST", "- Hemkosh Lexicon Rules", "- Gazette Statutory Linter", "- IndicBERT Contextual"], "#ecfdf5", "#047857"),
        ("4. SDC PRODUCTION HOST", ["- Assam SDC Cloud", "- Zero External API Calls", "- AES-256 / TLS 1.3", "- DPDP Act 2023 Audit"], "#eff6ff", "#1d4ed8")
    ]

    for i, (title, points, bg, border) in enumerate(stages):
        x1 = 40 + i * 280
        y1 = 110
        x2 = x1 + 255
        y2 = 360

        draw.rounded_rectangle([(x1, y1), (x2, y2)], radius=12, fill=bg, outline=border, width=2)
        draw.rectangle([(x1, y1), (x2, y1 + 45)], fill=border)
        draw.text((x1 + 15, y1 + 15), title, fill='#ffffff')

        for j, pt in enumerate(points):
            draw.text((x1 + 15, y1 + 70 + j * 35), pt, fill='#1e293b')

        if i < 3:
            # Draw connector arrow
            arrow_x = x2 + 5
            arrow_y = (y1 + y2) // 2
            draw.line([(arrow_x, arrow_y), (arrow_x + 15, arrow_y)], fill='#94a3b8', width=3)

    # Bottom Split-Screen Workbench representation
    draw.rounded_rectangle([(40, 400), (1160, 640)], radius=14, fill='#f8fafc', outline='#cbd5e1', width=2)
    draw.rectangle([(40, 400), (1160, 445)], fill='#13335a')
    draw.text((60, 415), "5. SYNCHRONIZED SPLIT-SCREEN WORKBENCH & MULTI-TIER SIGN-OFF WORKFLOW", fill='#ffffff')

    # Two mini panes
    draw.rounded_rectangle([(65, 465), (580, 615)], radius=8, fill='#ffffff', outline='#fee2e2', width=2)
    draw.text((85, 480), "LEFT PANE: Original DTP Draft (Redline View)", fill='#b91c1c')
    draw.text((85, 510), "অসম ৰাজপএ (ভুল যুক্তাক্ষৰ) ... অধিসুচনা ... সৰকাৰ ...", fill='#64748b')
    draw.text((85, 545), "Flagged: 7 critical spelling + 1 calendar discrepancy (1945 Saka)", fill='#991b1b')

    draw.rounded_rectangle([(620, 465), (1135, 615)], radius=8, fill='#ffffff', outline='#dcfce7', width=2)
    draw.text((640, 480), "RIGHT PANE: Live Normalized Proofread Preview", fill='#15803d')
    draw.text((640, 510), "অসম ৰাজপত্ৰ (শুদ্ধ) ... অধিসূচনা ... অসম চৰকাৰ ...", fill='#0f172a')
    draw.text((640, 545), "Result: 100% Asam Sahitya Sabha & Hemkosh conformity certified.", fill='#166534')

    img.save(output_path, "PNG", quality=95)
    print("Saved architecture graphic:", output_path)

def generate_workflow_graphic(output_path):
    img = Image.new('RGB', (1100, 260), color='#ffffff')
    draw = ImageDraw.Draw(img)

    draw.rounded_rectangle([(10, 10), (1090, 250)], radius=12, fill='#f8fafc', outline='#cbd5e1', width=2)

    roles = [
        ("Step 1: DTP Operator", "Composing Room (Bamunimaidam)", "Uploads PageMaker/Word draft.\nAutomatic Unicode font normalization.", "#0c2340"),
        ("Step 2: Proofreader", "Editorial Cell (Grade-I/II)", "Reviews split-screen redline diffs.\nAccepts high-confidence fixes.", "#13335a"),
        ("Step 3: Head Reader", "Senior Quality Controller", "Audits statutory Governor clauses\nand Saka calendar synchrony.", "#c29b38"),
        ("Step 4: Superintendent", "Apex Executive Sign-off", "Approves press plate generation &\ne-Gazette XML web publication.", "#15803d")
    ]

    for i, (role, sub, desc, color) in enumerate(roles):
        x1 = 30 + i * 265
        y1 = 30
        x2 = x1 + 245
        y2 = 230

        draw.rounded_rectangle([(x1, y1), (x2, y2)], radius=10, fill='#ffffff', outline=color, width=2)
        draw.rectangle([(x1, y1), (x2, y1 + 35)], fill=color)
        draw.text((x1 + 10, y1 + 10), role, fill='#ffffff')
        draw.text((x1 + 10, y1 + 45), sub, fill='#64748b')

        lines = desc.split('\n')
        for l_idx, line in enumerate(lines):
            draw.text((x1 + 10, y1 + 80 + l_idx * 22), line, fill='#1e293b')

        if i < 3:
            ax = x2 + 5
            ay = (y1 + y2) // 2
            draw.line([(ax, ay), (ax + 10, ay)], fill='#94a3b8', width=3)

    img.save(output_path, "PNG", quality=95)
    print("Saved workflow graphic:", output_path)

if __name__ == '__main__':
    base_dir = os.path.dirname(os.path.abspath(__file__))
    generate_budget_chart(os.path.join(base_dir, "budget_donut_chart.png"))
    generate_benchmark_chart(os.path.join(base_dir, "benchmark_chart.png"))
    generate_architecture_graphic(os.path.join(base_dir, "architecture_diagram.png"))
    generate_workflow_graphic(os.path.join(base_dir, "workflow_diagram.png"))
    print("All visuals generated successfully!")
