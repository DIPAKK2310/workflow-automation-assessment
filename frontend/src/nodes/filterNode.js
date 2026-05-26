import { useState } from 'react';
import { BaseNode } from './baseNode';
import { Filter } from 'lucide-react';

export const FilterNode = ({ id, data }) => {
  const [rule, setRule] = useState(data?.rule || '');
  return (
    <BaseNode id={id} title="Filter" icon={Filter} inputs={[{ id: 'input' }]} outputs={[{ id: 'output' }]}>
      <label>Rule: <input placeholder="e.g. length > 10" value={rule} onChange={e => setRule(e.target.value)} /></label>
    </BaseNode>
  );
};