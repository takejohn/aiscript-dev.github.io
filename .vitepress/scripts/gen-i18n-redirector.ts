// @ts-expect-error Node
import fs from 'fs';
import { mainLocale, baseUrl } from '../config';
import type { SiteConfig } from 'vitepress';

type RouteMeta = {
    title: string;
    description?: string;
};

async function createFile(path: string, content: string) {
    const dir = path.replace(/\/[^/]+$/, '');
    await fs.promises.writeFile(path, content).catch((err) => {
        if (err.code === 'ENOENT') {
            fs.promises.mkdir(dir, { recursive: true }).then(() => createFile(path, content));
        }
    });
}

export function createGenI18nRedirector() {
    const routeMeta = new Map<string, RouteMeta>();

    function registerRouteMeta(route: string, meta: RouteMeta) {
        routeMeta.set(route, meta);
    }
    
    async function genI18nRedirector(siteConfig: SiteConfig) {
        const genStartedAt = performance.now();

        const routes = siteConfig.pages
            .filter((page) => page.startsWith(`${mainLocale}/`));
    
        const promises = routes.map(async (route) => {
            const routePath = route.replace(new RegExp(`^${mainLocale}\/`), '');
            const routePathForWrite = routePath.replace(/\.md$/, '.html');
            const routePathForRender = routePath.replace(/index\.(md|html)$/, '').replace(/\.md$/, siteConfig.cleanUrls ? '' : '.html');

            let title = 'Redirecting...';
            let description: string | null = null;
            if (routeMeta.has(`${mainLocale}/${routePathForRender}`)) {
                title = routeMeta.get(`${mainLocale}/${routePathForRender}`)?.title ?? title;
                description = routeMeta.get(`${mainLocale}/${routePathForRender}`)?.description ?? null;
            }
    
            const localeNames = Object.keys(siteConfig.site.locales);
            const linkAlternate = localeNames.map((name) => `<link rel="alternate" hreflang="${siteConfig.site.locales[name].lang || name}" href="${baseUrl}/${name}/${routePathForRender}">`).join('\n    ');
            const fallbackLinks = localeNames.map((name) => `<a href="${baseUrl}/${name}/${routePathForRender}">${siteConfig.site.locales[name].label}</a>`).join(', ');
            const content = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>${description ? `\n    <meta name="description" content="${description}">\n` : ''}
    ${linkAlternate}
    <link rel="alternate" hreflang="x-default" href="${baseUrl}/${mainLocale}/${routePathForRender}">
    <link rel="canonical" href="${baseUrl}/${mainLocale}/${routePathForRender}">
    <script type="text/javascript">const s = ${JSON.stringify(localeNames)}; const d = localStorage.getItem('ais:locale'); if (d) { location.replace('/' + d + location.pathname + location.search + location.hash); } else if (s.includes(navigator.language.split("-")[0])) { location.replace('/' + navigator.language.split("-")[0] + location.pathname + location.search + location.hash); } else { location.replace('/ja' + location.pathname + location.search + location.hash); }</script>
</head>
<body>
    <noscript>${fallbackLinks}</noscript>
</body>
</html>
`;
            await createFile(`${siteConfig.outDir}/${routePathForWrite}`, content);
        });
    
        await Promise.allSettled(promises);
    
        const genFinishedAt = performance.now();
        console.log(`I18n redirector generated in ${Math.round((genFinishedAt - genStartedAt) / 10) / 100}s`);
    }

    return {
        registerRouteMeta,
        genI18nRedirector,
    };
}
