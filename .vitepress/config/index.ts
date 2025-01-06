import { defineConfig } from 'vitepress';
import type { LocaleConfig, DefaultTheme, HeadConfig } from 'vitepress';

import { shared } from './shared';
import { ja } from './ja';
import { en } from './en';

import { createGenI18nRedirector } from '../scripts/gen-i18n-redirector';

const locales = {
    ja: { label: '日本語', ...ja },
    en: { label: 'English', ...en },
} as const satisfies LocaleConfig<DefaultTheme.Config>;

export const mainLocale = 'ja' as const satisfies keyof typeof locales;

export const baseUrl = 'https://aiscript-dev.github.io';

const { registerRouteMeta, genI18nRedirector } = createGenI18nRedirector();

export default defineConfig({
    ...shared,
    locales,
    transformHead(context) {
        const head: HeadConfig[] = [];
        if (!context.pageData.isNotFound) {
            const localesRegex = new RegExp(`^/(${Object.keys(locales).join('|')})`);
            const canonical = '/' + context.page.replace(/index\.(md|html)$/, '').replace(/\.md$/, context.siteConfig.cleanUrls ? '' : '.html');
            const defaultLocalePath = canonical.replace(localesRegex, `/${mainLocale}`);

            if (canonical.startsWith(`/${mainLocale}`)) {
                registerRouteMeta(canonical.slice(1), {
                    title: context.title,
                    description: context.description,
                });
            }
    
            for (const locale of Object.keys(locales)) {
                const localePath = canonical.replace(localesRegex, `/${locale}`);
    
                head.push([
                    'link',
                    {
                        rel: 'alternate',
                        hreflang: locales[locale].lang || locale,
                        href: baseUrl + localePath,
                    },
                ]);
            }

            head.push([
                'link',
                {
                    rel: 'alternate',
                    hreflang: 'x-default',
                    href: baseUrl + defaultLocalePath,
                },
            ]);
    
            head.push([
                'link',
                {
                    rel: 'canonical',
                    href: baseUrl + canonical,
                }
            ]);    
        }

        return head;
    },
    buildEnd: genI18nRedirector,
});
