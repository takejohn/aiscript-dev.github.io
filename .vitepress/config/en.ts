import { defineConfig, type DefaultTheme } from 'vitepress';

const guideNav: DefaultTheme.SidebarItem[] = [
    { text: 'Introduction', link: 'get-started' },
    { text: 'Execution', link: 'execution' },
];

const referenceNav: DefaultTheme.SidebarItem[] = [
    { text: 'Syntax', link: 'syntax' },
    { text: 'Built-in Properties', link: 'builtin-props' },
    { text: 'Keywords', link: 'keywords' },
    { text: 'Literal Expressions', link: 'literals' },
    { text: 'Built-in Functions', link: 'std' },
    { text: 'Built-in Functions (Math)', link: 'std-math' },
];

export const en = defineConfig({
    lang: 'en-US',
    description: 'A user script language for browsers',

    themeConfig: {
        sidebar: {
            '/en/guides/': { base: '/en/guides/', items: guideNav },
            '/en/references/': { base: '/en/references/', items: referenceNav },
        },
    },
});
