import { useState } from 'react';
import { BaseNode } from './baseNode';
import { MessageSquare } from 'lucide-react';

export const PromptNode = ({ id, data }) => {
  const [prompt, setPrompt] = useState(data?.prompt || '');
  return (
    <BaseNode id={id} title="Prompt" icon={MessageSquare} outputs={[{ id: 'output' }]}>
      <textarea
        placeholder="Enter system prompt..."
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        style={{ width: '100%', height: 60, resize: 'none' }}
      />
    </BaseNode>
  );
};