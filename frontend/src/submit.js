import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { useState } from 'react';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nodes: nodes.map(n => ({ id: n.id })),
          edges: edges.map(e => ({ source: e.source, target: e.target })),
        }),
      });

      const data = await response.json();

      // User-friendly alert
      alert(
        `Pipeline Analysis\n\n` +
        `Nodes:  ${data.num_nodes}\n` +
        `Edges:  ${data.num_edges}\n` +
        `Valid DAG:  ${data.is_dag ? '✅ Yes' : '❌ No (has a cycle)'}`
      );

    } catch (err) {
      alert('Could not reach the backend. Make sure FastAPI is running on port 8000.');
    } finally {
      setLoading(false);
    }
  };

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
        onClick={handleSubmit}
        disabled={loading}
        style={{
          background: loading ? '#A5B4FC' : '#6366F1',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '9px 28px',
          fontSize: 13,
          fontWeight: 600,
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'background 0.15s',
        }}
        onMouseEnter={e => { if (!loading) e.target.style.background = '#4F46E5' }}
        onMouseLeave={e => { if (!loading) e.target.style.background = '#6366F1' }}
      >
        {loading ? 'Analysing...' : '▶ Submit Pipeline'}
      </button>
    </div>
  );
}