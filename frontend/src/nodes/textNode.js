import { useState, useRef, useEffect } from "react";
import { Handle, Position } from "reactflow";
import { Type } from 'lucide-react';

// We use Handle directly here (not BaseNode) because
// handles are dynamic — BaseNode only does fixed handles

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  // --- Sub-task B: extract {{ variable }} names from text ---
  const extractVariables = (text) => {
    const regex = /\{\{\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\}\}/g;
    const matches = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      matches.push(match[1]); // match[1] is the captured name inside {{ }}
    }
    // De-duplicate using Set
    return [...new Set(matches)];
  };

  // --- Sub-task A: auto resize the textarea on every change ---
  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // reset first
      textarea.style.height = `${textarea.scrollHeight}px`; // then grow
    }
  };

  // Run once on mount to handle initial value
  useEffect(() => {
    resizeTextarea();
    setVariables(extractVariables(currText));
  }, []);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCurrText(newText);
    setVariables(extractVariables(newText)); // update handles
    resizeTextarea(); // resize node
  };

  return (
    <div
      style={{
        border: "1px solid black",
        borderRadius: 8,
        padding: "10px 12px",
        background: "#fff",
        minWidth: 200,
        position: "relative",
      }}
    >
      {/* Title */}
      <div style={{ fontWeight: 600, marginBottom: 8 }}>
        <span>Text</span>
      </div>

      {/* Textarea — grows with content */}
      <textarea
        ref={textareaRef}
        value={currText}
        onChange={handleTextChange}
        style={{
          width: "100%",
          minHeight: 48,
          resize: "none",
          overflow: "hidden",
          boxSizing: "border-box",
          background: "#EEF2FF",
          border: "1px solid #C7D2FE",
          borderRadius: 6,
          padding: "5px 8px",
          fontSize: 12,
          color: "#374151",
          fontFamily: "Inter, system-ui, sans-serif",
          outline: "none",
        }}
      />

      {/* Dynamic input handles — one per {{ variable }} */}
      {variables.map((varName, i) => (
        <Handle
          key={varName}
          type="target"
          position={Position.Left}
          id={`${id}-${varName}`}
          style={{ top: `${((i + 1) / (variables.length + 1)) * 100}%` }}
        >
          {/* Label next to handle */}
          <span
            style={{
              position: "absolute",
              left: 10,
              fontSize: 10,
              color: "#555",
              whiteSpace: "nowrap",
              pointerEvents: "none",
            }}
          >
            {varName}
          </span>
        </Handle>
      ))}

      {/* Fixed output handle */}
      <Handle type="source" position={Position.Right}  icon={Type}  id={`${id}-output`} />
    </div>
  );
};
