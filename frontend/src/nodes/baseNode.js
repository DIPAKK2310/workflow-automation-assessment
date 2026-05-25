import { Handle, Position } from 'reactflow';

export const BaseNode = ({ id, title, inputs = [], outputs = [], children }) => {
  return (
    <div style={{
      width: 200,
      border: '1px solid black',
      borderRadius: 8,
      padding: '10px 12px',
      background: '#fff',
      fontSize: 13,
    }}>

      {/* Title */}
      <div style={{ fontWeight: 600, marginBottom: 8 }}>
        {title}
      </div>

      {/* Node-specific content goes here */}
      {children}

      {/* Input handles — left side */}
      {inputs.map((input, i) => (
        <Handle
          key={input.id}
          type="target"
          position={Position.Left}
          id={`${id}-${input.id}`}
          style={{ top: `${((i + 1) / (inputs.length + 1)) * 100}%` }}
        />
      ))}

      {/* Output handles — right side */}
      {outputs.map((output, i) => (
        <Handle
          key={output.id}
          type="source"
          position={Position.Right}
          id={`${id}-${output.id}`}
          style={{ top: `${((i + 1) / (outputs.length + 1)) * 100}%` }}
        />
      ))}

    </div>
  );
};