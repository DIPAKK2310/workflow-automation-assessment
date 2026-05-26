import {
  LogIn, LogOut, Bot, Type,
  Filter, Merge, Shuffle, StickyNote, MessageSquare
} from 'lucide-react';

const ICONS = {
  customInput:  LogIn,
  customOutput: LogOut,
  llm:          Bot,
  text:         Type,
  filter:       Filter,
  merge:        Merge,
  transform:    Shuffle,
  note:         StickyNote,
  prompt:       MessageSquare,
};

export const DraggableNode = ({ type, label }) => {
  const Icon = ICONS[type];

  const onDragStart = (event) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType: type }));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      onDragStart={onDragStart}
      draggable
      style={{
        cursor: 'grab',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        padding: '8px 14px',
        border: '1px solid #E5E7EB',
        borderRadius: 8,
        background: '#F9FAFB',
        minWidth: 64,
        userSelect: 'none',
        transition: 'all 0.15s',
      }}
      onMouseEnter={e => e.currentTarget.style.background = '#EEF2FF'}
      onMouseLeave={e => e.currentTarget.style.background = '#F9FAFB'}
    >
      {Icon && <Icon size={18} color="#6366F1" />}
      <span style={{ fontSize: 11, fontWeight: 500, color: '#374151' }}>{label}</span>
    </div>
  );
};