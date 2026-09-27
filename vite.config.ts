import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import { defineConfig } from 'vite';

const SEO_ORIGIN = 'https://pagina-del-valle-software.vercel.app';
const serviceSeo = [
  { slug: 'desarrollo-software', title: 'Desarrollo de software a medida en Colombia | Del Valle Software', description: 'Desarrollamos software a medida para automatizar procesos, integrar información y mejorar la gestión de empresas en Colombia.' },
  { slug: 'paginas-web', title: 'Diseño y desarrollo de páginas web en Colombia | Del Valle Software', description: 'Creamos páginas web rápidas, adaptables a móviles y enfocadas en presentar tus servicios y facilitar el contacto con clientes.' },
  { slug: 'marketing-digital', title: 'Marketing digital y gestión de redes sociales | Del Valle Software', description: 'Planeamos contenido y gestionamos redes sociales para fortalecer la presencia digital de empresas y conectar con sus clientes.' },
  { slug: 'chatbots-automatizacion', title: 'Chatbots y automatización de procesos empresariales | Del Valle Software', description: 'Diseñamos flujos automatizados y chatbots para organizar consultas, reducir tareas manuales y apoyar la operación de tu empresa.' },
  { slug: 'transformacion-digital', title: 'Transformación digital para empresas en Colombia | Del Valle Software', description: 'Conectamos procesos, software y canales digitales en una ruta de transformación ajustada a las necesidades de cada empresa.' },
];

const escapeHtml = (value: string) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

const serviceHtmlPlugin = () => ({
  name: 'service-seo-pages',
  apply: 'build' as const,
  async closeBundle() {
    const dist = path.resolve(__dirname, 'dist');
    const templatePath = path.join(dist, 'index.html');
    if (!fs.existsSync(templatePath)) return;
    const template = fs.readFileSync(templatePath, 'utf8');
    const { build } = await import('esbuild');
    const result = await build({
      entryPoints: [path.resolve(__dirname, 'src/renderServicePages.tsx')],
      bundle: true,
      platform: 'node',
      format: 'esm',
      packages: 'external',
      write: false,
      logLevel: 'silent',
    });

    const rendererPath = path.join(dist, '.service-renderer.mjs');
    fs.writeFileSync(rendererPath, result.outputFiles[0].text);
    try {
      const renderer = await import(`${pathToFileURL(rendererPath).href}?build=${Date.now()}`);
      const markupBySlug = new Map(renderer.renderServicePages().map((page: { slug: string; markup: string }) => [page.slug, page.markup]));

      for (const service of serviceSeo) {
          const canonical = `${SEO_ORIGIN}/servicios/${service.slug}`;
          const title = escapeHtml(service.title);
          const description = escapeHtml(service.description);
          const schema = JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: service.title,
            description: service.description,
            url: canonical,
            areaServed: { '@type': 'Country', name: 'Colombia' },
            provider: { '@type': 'Organization', name: 'Del Valle Software', url: `${SEO_ORIGIN}/` },
          }, null, 2);
          const html = template
            .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
            .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${description}" />`)
            .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${title}" />`)
            .replace(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${description}" />`)
            .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${canonical}" />`)
            .replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${title}" />`)
            .replace(/<meta name="twitter:description" content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${description}" />`)
            .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${canonical}" />`)
            .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">\n${schema}\n    </script>`)
            .replace('<div id="root"></div>', `<div id="root">${markupBySlug.get(service.slug) || ''}</div>`);
          const routeDir = path.join(dist, 'servicios', service.slug);
          fs.mkdirSync(routeDir, { recursive: true });
          fs.writeFileSync(path.join(routeDir, 'index.html'), html);
      }
    } finally {
      fs.rmSync(rendererPath, { force: true });
    }
  },
});

export default defineConfig({
  plugins: [react(), tailwindcss(), serviceHtmlPlugin()],
  resolve: { alias: { '@': path.resolve(__dirname, '.') } },
});
