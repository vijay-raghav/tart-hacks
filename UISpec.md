
---

### 📋 Master Prompt for AI Code Generator

**Role:** Expert Frontend Engineer & UI/UX Designer specialized in FinTech & Enterprise SaaS.
**Task:** Build a modern, high-density **"Financial Crime Investigation Workbench"**.
**Tech Stack:** React (Next.js), Tailwind CSS, Lucide Icons, Shadcn UI (Radix primitives).
**Visual Style:** "Linear" or "Vercel" aesthetic. Clean borders, subtle gradients, mono-spaced fonts for numbers, high information density but breathable.

---

### 1. Global Layout & Theme

* **Theme:** "Slate" Business Professional. (Background: `bg-slate-50`, Text: `text-slate-900`, Accents: `blue-600`).
* **Grid:** A **3-Column** "Holy Grail" layout, but fixed-height (viewport 100vh).
* **Left Sidebar (280px):** Case Navigation & Queue.
* **Main Stage (Flex-1):** The Investigation Workspace (Split Top/Bottom or Left/Right).
* **Right Panel (350px):** The "AI Decision Engine" & Action Bar.



---

### 2. Detailed Component Specifications

#### A. The Sidebar (The Queue)

* **Header:** Brand Logo ("Sentinel") + User Avatar (tiny).
* **Primary Nav:** Tabs for "My Queue", "Team Queue", "Closed".
* **The List Items (The Queue Cards):**
* Each item is a compact card.
* **Line 1:** Customer Name (Bold).
* **Line 2:** Alert Type (Badge: "Adverse Media" or "Sanctions").
* **Line 3:** Time Remaining (e.g., "SLA: 2h left" in red/orange).
* **State:** Active item has a `bg-blue-50` and a blue vertical border-left indicator.



#### B. The Main Stage (The "Ground Truth" & Investigation)

This area is divided vertically into two sections:

**1. The "Anchor" Header (Top 20%)**

* **Design:** A "Glassmorphism" sticky header showing the **Client Profile** (The Ground Truth).
* **Layout:** 4 Columns of Key-Value pairs.
* *Col 1:* **Entity:** Name, Customer ID (Mono font), Risk Rating (Badge).
* *Col 2:* **Demographics:** Age (24), Occupation (Student), Citizenship (India).
* *Col 3:* **Location:** Address (Miami, FL), Tax Residency.
* *Col 4:* **Relationship:** Tenure (New < 3mo), Products (Checking, Savings).


* **Visual:** White background, light gray border-bottom, subtle shadow.

**2. The Evidence Workbench (Bottom 80%)**

* **Content:** A scrollable feed of the **Search Results / Articles**.
* **The "Smart Card" Pattern:**
* Don't just show text. Wrap each search result in a **Card**.
* **Header:** Source Logo (e.g., BBC News) + Date + "Relevance Score" (AI generated).
* **Body:** The Article Snippet.
* **Interaction:**
* **Highlighting:** Crucial keywords (e.g., "arrested", "fraud", "witness") should have a `bg-yellow-100` highlight.
* **Entity Mismatch:** If the AI detects a mismatch (e.g., "Article says Age 55"), highlight that specific phrase in `bg-green-100` (indicating safety).





#### C. The Right Panel (The AI Co-Pilot & Decision)

This is the most critical part for your "Decision Support" criteria.

**1. The "Reasoning Trace" (Top Half)**

* **Visual:** Looks like a chat or log feed, but read-only.
* **Step 1:** "Running Search..." (Checkmark).
* **Step 2:** "analyzing 42 articles..." (Checkmark).
* **Step 3 (The Insight):** A **"Synthesized Narrative"** card.
* > *"I found 3 high-confidence matches. However, the subject in the news is a '60-year-old contractor'. Your client is a '24-year-old student'. This is likely a False Positive."*


* **Citations:** Small clickable footnotes `[1]` `[2]` inside the text that scroll the Main Stage to the relevant article.



**2. The "Decision Box" (Bottom Sticky Footer)**

* **Risk Gauge:** A visual semi-circle meter.
* *Value:* 15/100 (Low Risk).
* *Color:* Green.


* **Draft Note:** A text area pre-filled by the AI.
* *Text:* "Recommending closure. Name match only. Negative confirmation on age/occupation data."


* **Action Buttons (The "Kill Switch"):**
* **Button 1 (Primary):** "Quick Close (False Positive)" - Large, Green.
* **Button 2 (Secondary):** "Escalate to L2" - Outline, Red hover.



---

### 3. Interaction & Animation Specs (For the "Wow" Factor)

* **Loading State:** When a new case is clicked, the Main Stage shouldn't just "appear."
* Show a **"Skeleton Loader"** that shimmers.
* Show the "AI Reasoning" steps typing out one by one (Typewriter effect) in the Right Panel.


* **Hover Linking:**
* *Instruction:* "When the user hovers over a footnote `[1]` in the Right Panel, the corresponding Article Card in the Main Stage should glow or scroll into view."



---

### 4. Color Palette (Tailwind Classes)

* **Risk High:** `text-red-600`, `bg-red-50`, `border-red-200`
* **Risk Low (Safe):** `text-emerald-600`, `bg-emerald-50`, `border-emerald-200`
* **Risk Medium (Ambiguous):** `text-amber-600`, `bg-amber-50`, `border-amber-200`
* **Text Primary:** `text-slate-900`
* **Text Secondary:** `text-slate-500`

---

### 5. Sample Mock Data (To feed the prompt)

"Use this JSON structure to populate the UI:"

```json
{
  "client": { "name": "John Smith", "age": 24, "city": "Miami", "risk": "Low" },
  "ai_analysis": {
    "summary": "Mismatch detected on Age and Location.",
    "confidence": 98,
    "articles": [
      { "source": "Miami Herald", "date": "2023-10-12", "snippet": "Local student John Smith wins charity run...", "sentiment": "Positive" },
      { "source": "Chicago Tribune", "date": "2023-09-01", "snippet": "55-year-old John Smith arrested for wire fraud...", "sentiment": "Negative", "mismatch_highlight": "55-year-old" }
    ]
  }
}

```