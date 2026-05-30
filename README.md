# VectorShift — Frontend Technical Assessment

A pipeline builder built for the VectorShift frontend technical assessment. Drag nodes onto a canvas, connect them, and submit the pipeline to a backend that validates the graph structure.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, ReactFlow |
| State management | Zustand |
| Icons | lucide-react |
| Backend | Python, FastAPI |
| Styling | Inline styles (Inter font) |

---

## Project Structure

```
/
├── frontend/
│   └── src/
│       ├── nodes/
│       │   ├── BaseNode.jsx        # Shared node abstraction
│       │   ├── inputNode.js
│       │   ├── outputNode.js
│       │   ├── llmNode.js
│       │   ├── textNode.js         # Auto-resize + {{ variable }} handles
│       │   ├── filterNode.js       # New
│       │   ├── mergeNode.js        # New
│       │   ├── transformNode.js    # New
│       │   ├── noteNode.js         # New
│       │   └── promptNode.js       # New
│       ├── App.js
│       ├── ui.js                   # ReactFlow canvas
│       ├── toolbar.js              # Draggable node palette
│       ├── draggableNode.js
│       ├── store.js                # Zustand store
│       ├── submit.js               # Submit button + fetch
│       └── index.css
└── backend/
    └── main.py                     # FastAPI + DAG check
```

---

## Getting Started

You need two terminals running simultaneously.

**Terminal 1 — Backend**
```bash
cd backend
pip install fastapi uvicorn
uvicorn main:app --reload
# Runs on http://localhost:8000
```

**Terminal 2 — Frontend**
```bash
cd frontend
npm install
npm start
# Runs on http://localhost:3000
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Features

### Part 1 — Node Abstraction

All nodes share a single `BaseNode` component that handles:
- The outer card (border, shadow, border-radius)
- Colored accent bar at the top (unique color per node type)
- Icon + title in the header
- Delete button with inline confirmation dialog
- Handle rendering (left = inputs, right = outputs), evenly spaced

Each specific node passes `title`, `icon`, `inputs`, `outputs`, and `children` as props. Adding a new node type takes ~10 lines.

**9 nodes total:**

| Node | Inputs | Outputs | Content |
|---|---|---|---|
| Input | — | value | Name field, Type dropdown |
| Output | value | — | Name field, Type dropdown |
| LLM | system, prompt | response | Model dropdown |
| Text | dynamic (see Part 3) | output | Auto-resize textarea |
| Filter | input | output | Rule text field |
| Merge | a, b | output | Label only |
| Transform | input | output | Mode dropdown |
| Note | — | — | Free text area |
| Prompt | — | output | System prompt textarea |

### Part 2 — Styling

Styled to match VectorShift's design language:

- White node cards with `1px solid #E5E7EB` border and subtle shadow
- Color-coded accent bar per node type (indigo, emerald, amber, blue, etc.)
- Light indigo (`#EEF2FF`) background on all input fields and selects
- Clean white toolbar with icon + label draggable cards
- Inter font throughout
- Hover states on toolbar items and delete button

### Part 3 — Text Node Logic

Two features added to the Text node:

**Auto-resize** — the node grows as the user types more text. Uses the standard `scrollHeight` trick:
```js
textarea.style.height = 'auto';
textarea.style.height = `${textarea.scrollHeight}px`;
```

**Variable handles** — typing `{{ variableName }}` in the textarea creates a new input Handle on the left side of the node in real time. Handles update as you type:
- Duplicate variables → single handle
- Delete the variable from text → handle disappears
- Uses regex `/\{\{\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\}\}/g` for valid JS variable names

### Part 4 — Backend Integration

**Frontend (`submit.js`):** Reads nodes and edges from the Zustand store, POSTs them to `/pipelines/parse`, and displays the result in an alert.

**Backend (`main.py`):** FastAPI endpoint that receives the pipeline and returns:
```json
{
  "num_nodes": 3,
  "num_edges": 2,
  "is_dag": true
}
```

**DAG check** uses depth-first search with a `visited` set and an `in_stack` set to detect cycles. If any node is reached while already in the active call stack, a cycle exists and `is_dag` returns `false`.

---

## Usage

1. Drag any node from the toolbar onto the canvas
2. Connect nodes by dragging from one handle (dot) to another
3. In the Text node, type `{{ variableName }}` to create dynamic input handles
4. Click **Submit Pipeline** to send to the backend
5. An alert shows the node count, edge count, and whether the graph is a valid DAG

---

## API

### `POST /pipelines/parse`

**Request body:**
```json
{
  "nodes": [{ "id": "customInput-1" }, { "id": "llm-1" }],
  "edges": [{ "source": "customInput-1", "target": "llm-1" }]
}
```

**Response:**
```json
{
  "num_nodes": 2,
  "num_edges": 1,
  "is_dag": true
}
```

Developed by DK