'use client';
import { SwipeProvider } from './context/SwipeContext';

export default function InvestorMatchLayout({ children }) {
  return (
    <SwipeProvider>
      <div
        style={{
          minHeight: '100vh',
          background: '#0d0d0d',
          color: '#ffffff',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {children}
      </div>
    </SwipeProvider>
  );
}
