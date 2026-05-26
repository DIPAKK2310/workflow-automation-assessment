export const SubmitButton = () => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '12px',
      borderTop: '1px solid #E5E7EB',
      background: '#fff',
    }}>
      <button
        type="button"
        style={{
          background: '#6366F1',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '9px 28px',
          fontSize: 13,
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'background 0.15s',
        }}
        onMouseEnter={e => e.target.style.background = '#4F46E5'}
        onMouseLeave={e => e.target.style.background = '#6366F1'}
      >
        ▶ Submit Pipeline
      </button>
    </div>
  );
};