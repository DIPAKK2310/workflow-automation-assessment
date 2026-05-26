import { useState } from 'react';
import { Bot } from 'lucide-react';
import { BaseNode, NodeSelect } from './baseNode';

export const LLMNode = ({ id, data }) => {
  const [model, setModel] = useState(data?.model || 'gpt-4o');
  return (
    <BaseNode id={id} title="LLM" icon={Bot}
      inputs={[{ id: 'system' }, { id: 'prompt' }]}
      outputs={[{ id: 'response' }]}
    >
      <NodeSelect label="Model" value={model} onChange={e => setModel(e.target.value)}
        options={['gpt-4o', 'gpt-4-turbo', 'claude-3-5-sonnet']} />
    </BaseNode>
  );
};