import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  return (
    <div style={{
      background: '#FFFFFF',
      borderBottom: '1px solid #E5E7EB',
      padding: '10px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      overflowX: 'auto',
    }}>
      <span style={{ fontSize: 11, fontWeight: 600, color: '#9CA3AF', marginRight: 8, whiteSpace: 'nowrap' }}>
        NODES
      </span>
      <DraggableNode type='customInput' label='Input' />
      <DraggableNode type='llm' label='LLM' />
      <DraggableNode type='customOutput' label='Output' />
      <DraggableNode type='text' label='Text' />
      <DraggableNode type='filter' label='Filter' />
      <DraggableNode type='merge' label='Merge' />
      <DraggableNode type='transform' label='Transform' />
      <DraggableNode type='note' label='Note' />
      <DraggableNode type='prompt' label='Prompt' />
    </div>
  );
};