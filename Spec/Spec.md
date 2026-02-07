Here is the updated, high-level specification tailored for **Dedalus.AI**. You can paste this directly into your coding agent (Cursor, Replit, etc.).

This spec emphasizes **Model Context Protocol (MCP)** architecture to score maximum technical points.

---

# Project Spec: Sentinel (Powered by Dedalus.AI)

## 1. Project Identity

* **Name:** Sentinel
* **Core Concept:** An autonomous AI Compliance Officer that performs "Adverse Media Adjudication."
* **Differentiation:** Uses **Dedalus.AI** and **MCP (Model Context Protocol)** to create a deterministic, auditable agent workflow rather than a simple chatbot wrapper.

## 2. Technical Architecture

* **Orchestration:** **Dedalus SDK** (Python).
* **Brain:** GPT-4o or Claude 3.5 Sonnet (via Dedalus routing).
* **Tools (The MCP Layer):**
* `search_web`: A structured tool (wrapping Serper.dev or Brave Search) that the Dedalus Agent calls autonomously.


* **Frontend:** Streamlit.
* **Validation:** Pydantic (strictly enforced JSON output).

## 3. Data Structures

### A. The Anchor (Mock Input)

*File: `data/mock_profiles.py*`
A list of "Ground Truth" objects. The Agent uses this to **Negative Constrain** the search (e.g., "If City != Miami, ignore").

```python
[
  {
    "id": "CUST-001",
    "name": "John Smith",
    "meta": {"age": 24, "city": "Miami, FL", "occupation": "Student"},
    "risk_level": "ambiguous" # Used for demo selection logic only
  },
  # ... Add 1 safe profile and 1 high-risk profile
]

```

### B. The Output (Pydantic Schema)

*File: `models/schema.py*`
The Dedalus Agent must act as a **Structured Extractor**, not a Chatbot.

```python
class InvestigationReport(BaseModel):
    # The Decision
    risk_score: int = Field(..., description="0-100. <20 is Safe, >80 is Critical.")
    verdict: Literal["DISMISS", "ESCALATE"]
    
    # The Reasoning (The "Not a Wrapper" feature)
    entity_resolution_logic: str = Field(..., description="Explain WHY the person in the news is/is not the client. E.g., 'Mismatch: Client is 24, Suspect is 55'.")
    
    # The Evidence (The Audit Trail)
    citations: List[dict] = Field(..., description="List of {source: str, url: str, quote: str}")

```

## 4. Dedalus Agent Logic

*File: `agent_engine.py*`

**The Tool:**
Define a function `search_adverse_media(query: str)` that returns a simplified JSON string of search results. Bind this to the Dedalus Agent.

**The System Prompt:**

> "You are **Sentinel**, a strict Compliance Adjudication Engine.
> 1. **Receive** a Client Profile.
> 2. **Tool Use:** Call `search_adverse_media` for the client's name + 'fraud/arrest/crime'.
> 3. **Reasoning:** Compare every news hit against the Client Profile (Age, Location).
> * *Constraint:* If the news mentions a different city/age, you MUST label it a False Positive.
> 
> 
> 4. **Output:** Return the result strictly as `InvestigationReport` JSON."
> 
> 

## 5. Frontend Specification (Streamlit)

*File: `app.py*`

**Layout Strategy:**

1. **Sidebar:** "Case Selector." User picks a profile.
2. **Top Container:** "Ground Truth." Displays the Mock Profile in a `st.info` box.
3. **Action State:** A spinner that says *"Dedalus Agent is thinking... accessing Search Tool..."*
4. **Results Grid:**
* **Left Col:** **Risk Gauge** (Plotly chart or `st.metric`).
* **Right Col:** **Verdict Badge** (Green/Red).


5. **Audit Log (Expander):** A `st.expander("Show Agent Reasoning")` that displays the raw JSON or text explanation of *why* it matched/mismatched the identity.