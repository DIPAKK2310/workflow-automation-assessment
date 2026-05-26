import { useState } from 'react';
import { BaseNode } from './baseNode';
import { Shuffle } from 'lucide-react';

export const TransformNode = ({ id, data }) => {
  const [mode, setMode] = useState(data?.mode || 'uppercase');
  return (
    <BaseNode id={id} title="Transform" icon={Shuffle} inputs={[{ id: 'input' }]} outputs={[{ id: 'output' }]}>
      <label>Mode:
        <select value={mode} onChange={e => setMode(e.target.value)}>
          <option value="uppercase">Uppercase</option>
          <option value="lowercase">Lowercase</option>
          <option value="trim">Trim</option>
        </select>
      </label>
    </BaseNode>
  );
};