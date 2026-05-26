import { useState } from 'react';
import { BaseNode } from './baseNode';
import { StickyNote } from 'lucide-react';

export const NoteNode = ({ id, data }) => {
  const [note, setNote] = useState(data?.note || '');
  return (
    <BaseNode id={id} icon={StickyNote} title="Note">
      <textarea
        placeholder="Write a note..."
        value={note}
        onChange={e => setNote(e.target.value)}
        style={{ width: '100%', height: 60, resize: 'none' }}
      />
    </BaseNode>
  );
};