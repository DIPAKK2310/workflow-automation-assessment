import { useState } from 'react';
import { LogIn } from 'lucide-react';
import { BaseNode, NodeInput, NodeSelect } from './baseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  return (
    <BaseNode id={id} title="Input" icon={LogIn} outputs={[{ id: 'value' }]}>
      <NodeInput label="Name" value={currName} onChange={e => setCurrName(e.target.value)} />
      <NodeSelect label="Type" value={inputType} onChange={e => setInputType(e.target.value)}
        options={['Text', 'File']} />
    </BaseNode>
  );
};