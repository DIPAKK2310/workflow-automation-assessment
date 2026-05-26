import { BaseNode } from './baseNode';
import { Merge } from 'lucide-react';

export const MergeNode = ({ id, data }) => {
  return (
    <BaseNode id={id} title="Merge" icon={Merge} inputs={[{ id: 'a' }, { id: 'b' }]} outputs={[{ id: 'output' }]}>
      <span>Merges two inputs into one</span>
    </BaseNode>
  );
};