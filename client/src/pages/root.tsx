import React from 'react';
import App from '../App.tsx'
import { CookiesProvider } from 'react-cookie';

export default function Root(): React.ReactElement {
  return (
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <App />
    </CookiesProvider>
  );
}