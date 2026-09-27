import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { MotionConfig } from 'motion/react';
import App from './App.tsx';
import './index.css';

const app = <StrictMode><MotionConfig reducedMotion="user"><App /></MotionConfig></StrictMode>;
const rootElement = document.getElementById('root')!;
const currentPath = window.location.pathname.replace(/\/$/, '') || '/';

if (currentPath === '/' || currentPath === '/nosotros' || currentPath.startsWith('/servicios/')) {
  hydrateRoot(rootElement, app);
} else {
  rootElement.replaceChildren();
  createRoot(rootElement).render(app);
}
