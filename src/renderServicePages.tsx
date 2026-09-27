import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import App from './App';
import { ServiceLandingPage, SERVICE_PAGES } from './components/sections/ServiceLandingPage';
import { AboutPage } from './components/sections/AboutPage';

export const renderHomePage = () => renderToStaticMarkup(<App />);
export const renderAboutPage = () => renderToStaticMarkup(<AboutPage />);

export const renderServicePages = () => SERVICE_PAGES.map((page) => ({
  slug: page.slug,
  markup: renderToStaticMarkup(<ServiceLandingPage page={page} />),
}));
