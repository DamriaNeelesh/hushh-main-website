import React from 'react';

const CustomPre = ({ children }) => (
  <pre style={{ background: '#f4f4f4', padding: '20px', borderRadius: '8px' }}>
    {children}
  </pre>
);

export default CustomPre;
