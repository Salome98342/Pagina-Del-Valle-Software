import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const app = <StrictMode><App /></StrictMode>;
const rootElement = document.getElementById('root')!;

if (window.location.pathname.startsWith('/servicios/')) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
