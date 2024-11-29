import { defineConfig } from 'vitepress';
import type { LocaleConfig, DefaultTheme, HeadConfig } from 'vitepress';
import { shared } from './shared';
import { ja } from './ja';
import { en } from './en';

const locales: LocaleConfig<DefaultTheme.Config> = {
    ja: { label: '日本語', ...ja },
    en: { label: 'English', ...en },
};

const baseUrl = 'https://aiscript-dev.github.io';

export default defineConfig({
    ...shared,
    locales,
    transformHead(context) {
        const head: HeadConfig[] = [];
        if (!context.pageData.isNotFound) {
            const localesRegex = new RegExp(`^/(${Object.keys(locales).join('|')})`);
            const canonical = '/' + context.page.replace(/\.md$/, '.html').replace(/\/index\.html$/, '/');
    
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
                    rel: 'canonical',
                    href: baseUrl + canonical,
                }
            ]);    
        }

        return head;
    },
});
