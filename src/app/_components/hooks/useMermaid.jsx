import { useEffect } from 'react';
import mermaid from 'mermaid';

// Initialize Mermaid with basic configuration
mermaid.initialize({
  startOnLoad: true,
});

const Mermaid = ({ chart }) => {
  useEffect(() => {
    mermaid.contentLoaded(); // Ensure Mermaid re-parses the content
  }, []);

  return <div className="mermaid">{chart}</div>; // Wrap the chart in a `div` with `mermaid` class
};

export default Mermaid;
