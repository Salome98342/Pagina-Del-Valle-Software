import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ServiceLandingPage, SERVICE_PAGES } from './components/sections/ServiceLandingPage';

export const renderServicePages = () => SERVICE_PAGES.map((page) => ({
  slug: page.slug,
  markup: renderToStaticMarkup(<ServiceLandingPage page={page} />),
}));
