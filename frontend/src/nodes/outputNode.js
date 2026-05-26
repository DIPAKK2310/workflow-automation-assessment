import { useState } from 'react';
import { LogOut } from 'lucide-react';
import { BaseNode, NodeInput, NodeSelect } from './baseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  return (
    <BaseNode id={id} title="Output" icon={LogOut} inputs={[{ id: 'value' }]}>
      <NodeInput label="Name" value={currName} onChange={e => setCurrName(e.target.value)} />
      <NodeSelect label="Type" value={outputType} onChange={e => setOutputType(e.target.value)}
        options={['Text', 'Image']} />
    </BaseNode>
  );
};