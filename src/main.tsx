import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MotionConfig } from 'motion/react';
import App from './App.tsx';
import './index.css';

const app = <StrictMode><MotionConfig reducedMotion="user"><App /></MotionConfig></StrictMode>;
const rootElement = document.getElementById('root')!;

createRoot(rootElement).render(app);
