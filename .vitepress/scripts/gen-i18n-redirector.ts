import fs from 'fs';
import { mainLocale, baseUrl } from '../config';
import type { SiteConfig } from 'vitepress';

async function createFile(path: string, content: string) {
    const dir = path.replace(/\/[^/]+$/, '');
    await fs.promises.writeFile(path, content).catch((err) => {
        if (err.code === 'ENOENT') {
            fs.promises.mkdir(dir, { recursive: true }).then(() => createFile(path, content));
        }
    });
}

export async function genI18nRedirector(siteConfig: SiteConfig) {
    const routes = siteConfig.pages
        .filter((page) => page.startsWith(`${mainLocale}/`))
        .map((page) => page.replace(new RegExp(`^${mainLocale}\/`), '').replace(/\.md$/, '.html'));

    const promises = routes.map((route) => {
        const localeNames = Object.keys(siteConfig.site.locales);
        const routeForRender = route.replace(/index\.html$/, '');
        const linkAlternate = localeNames.map((name) => `<link rel="alternate" hreflang="${siteConfig.site.locales[name].lang || name}" href="${baseUrl}/${name}/${routeForRender}">`).join('\n    ');
        const fallbackLinks = localeNames.map((name) => `<a href="${baseUrl}/${name}/${routeForRender}">${siteConfig.site.locales[name].label}</a>`).join(', ');
        const content = `<!DOCTYPE html>
<html lang="${siteConfig.site.locales[mainLocale].lang || 'ja-JP'}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redirecting...</title>
    ${linkAlternate}
    <link rel="alternate" hreflang="x-default" href="${baseUrl}/${mainLocale}/${routeForRender}">
    <link rel="canonical" href="${baseUrl}/${mainLocale}/${routeForRender}">
    <script type="text/javascript">const s = ${JSON.stringify(localeNames)}; const d = localStorage.getItem('ais:locale'); if (d) { location.replace('/' + d + location.pathname + location.search + location.hash); } else if (s.includes(navigator.language.split("-")[0])) { location.replace('/' + navigator.language.split("-")[0] + location.pathname + location.search + location.hash); } else { location.replace('/ja' + location.pathname + location.search + location.hash); }</script>
</head>
<body>
    <noscript>${fallbackLinks}</noscript>
</body>
</html>
`;
        return createFile(`${siteConfig.outDir}/${route}`, content);
    });

    await Promise.allSettled(promises);

    console.log('I18n redirector generated');
}
