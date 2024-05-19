// Layout.tsx
import React from 'react';

const appStyles: React.CSSProperties =  {
  backgroundColor: '#f8f8f8',
  color: '#333',
  fontFamily: 'Arial, sans-serif',
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  alignItems: 'center',
  width: '100%',
};

const headerStyles: React.CSSProperties = {
  backgroundColor: '#ff6b00',
  color: '#fff',
  padding: '1rem',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '1.5rem',
  width: '100%',
};

const contentStyles: React.CSSProperties =  {
  flex: '1',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const footerStyles: React.CSSProperties = {
  backgroundColor: '#333',
  color: '#fff',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '0.8rem',
  width: '100%',
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={appStyles}>
      <header style={headerStyles}>個人情報確認くん</header>
      <div style={contentStyles}>{children}</div>
      <footer style={footerStyles}>© 2024 個人情報確認くん. All rights reserved.</footer>
    </div>
  );
};

export default Layout;