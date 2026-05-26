import { Handle, Position } from 'reactflow';
import { useStore } from '../store';
import { X } from 'lucide-react';
import { useState } from 'react';

const NODE_COLORS = {
  Input:     '#6366F1',
  Output:    '#10B981',
  LLM:       '#F59E0B',
  Text:      '#3B82F6',
  Filter:    '#EF4444',
  Merge:     '#8B5CF6',
  Transform: '#EC4899',
  Note:      '#EAB308',
  Prompt:    '#14B8A6',
};

export const BaseNode = ({ id, title, icon: Icon, inputs = [], outputs = [], children }) => {
  const accentColor = NODE_COLORS[title] || '#6366F1';
  const [showConfirm, setShowConfirm] = useState(false);

  // Delete node from Zustand store
  const deleteNode = useStore(state => state.onNodesChange);

  const handleDelete = () => {
    // onNodesChange accepts a "remove" change object — this is the ReactFlow way
    deleteNode([{ id, type: 'remove' }]);
    setShowConfirm(false);
  };

  return (
    <div style={{
      background: '#FFFFFF',
      border: '1px solid #E5E7EB',
      borderRadius: 10,
      minWidth: 220,
      boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
      position: 'relative',
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>

      {/* Top accent bar */}
      <div style={{
        height: 4,
        background: accentColor,
        borderRadius: '10px 10px 0 0',
      }} />

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '10px 12px 8px',
        borderBottom: '1px solid #F3F4F6',
      }}>

        {/* Icon bubble */}
        {Icon && (
          <div style={{
            width: 26,
            height: 26,
            borderRadius: 6,
            background: accentColor + '20',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Icon size={14} color={accentColor} />
          </div>
        )}

        {/* Title */}
        <span style={{ fontWeight: 600, fontSize: 13, color: '#111827', flex: 1 }}>
          {title}
        </span>

        {/* Delete button */}
        <button
          onClick={() => setShowConfirm(true)}
          title="Delete node"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 2,
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            color: '#9CA3AF',
            transition: 'color 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#EF4444'}
          onMouseLeave={e => e.currentTarget.style.color = '#9CA3AF'}
        >
          <X size={14} />
        </button>
      </div>

      {/* Body */}
      <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {children}
      </div>

      {/* Confirmation dialog */}
      {showConfirm && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(255,255,255,0.95)',
          borderRadius: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          zIndex: 10,
          padding: 16,
        }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#111827', textAlign: 'center' }}>
            Delete this node?
          </span>
          <span style={{ fontSize: 12, color: '#6B7280', textAlign: 'center' }}>
            This will also remove all connected edges.
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => setShowConfirm(false)}
              style={{
                padding: '6px 16px',
                borderRadius: 6,
                border: '1px solid #E5E7EB',
                background: '#F9FAFB',
                fontSize: 12,
                cursor: 'pointer',
                fontWeight: 500,
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              style={{
                padding: '6px 16px',
                borderRadius: 6,
                border: 'none',
                background: '#EF4444',
                color: '#fff',
                fontSize: 12,
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )}

      {/* Input handles */}
      {inputs.map((input, i) => (
        <Handle
          key={input.id}
          type="target"
          position={Position.Left}
          id={`${id}-${input.id}`}
          style={{
            top: `${((i + 1) / (inputs.length + 1)) * 100}%`,
            width: 10, height: 10,
            background: '#fff',
            border: `2px solid ${accentColor}`,
          }}
        />
      ))}

      {/* Output handles */}
      {outputs.map((output, i) => (
        <Handle
          key={output.id}
          type="source"
          position={Position.Right}
          id={`${id}-${output.id}`}
          style={{
            top: `${((i + 1) / (outputs.length + 1)) * 100}%`,
            width: 10, height: 10,
            background: '#fff',
            border: `2px solid ${accentColor}`,
          }}
        />
      ))}
    </div>
  );
};

// Styled input — reusable across nodes
export const NodeInput = ({ label, value, onChange, placeholder }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
    {label && <span style={{ fontSize: 11, color: '#6B7280', fontWeight: 500 }}>{label}</span>}
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        background: '#EEF2FF', border: '1px solid #C7D2FE',
        borderRadius: 6, padding: '5px 8px',
        fontSize: 12, color: '#374151', outline: 'none', width: '100%',
      }}
    />
  </div>
);

// Styled select — reusable across nodes
export const NodeSelect = ({ label, value, onChange, options }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
    {label && <span style={{ fontSize: 11, color: '#6B7280', fontWeight: 500 }}>{label}</span>}
    <select
      value={value}
      onChange={onChange}
      style={{
        background: '#EEF2FF', border: '1px solid #C7D2FE',
        borderRadius: 6, padding: '5px 8px',
        fontSize: 12, color: '#374151', outline: 'none',
        width: '100%', cursor: 'pointer',
      }}
    >
      {options.map(opt => (
        <option key={opt.value ?? opt} value={opt.value ?? opt}>
          {opt.label ?? opt}
        </option>
      ))}
    </select>
  </div>
);