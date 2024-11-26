import { defineConfig, type DefaultTheme } from 'vitepress';

const nav: DefaultTheme.NavItem[] = [
    { text: 'Guides', link: '/en/guides/get-started' },
    { text: 'Reference', link: '/en/references/syntax' },
    { text: 'Try AiScript', link: '/en/playground' },
];

const guideNav: DefaultTheme.SidebarItem[] = [
    {
        text: 'AiScript Basics',
        items: [
            { text: 'Get Started', link: 'get-started' },
            { text: 'Execute AiScript', link: 'execution' },        
            { text: 'Implement to Your App', link: 'implementation' },
        ],
    },
    { text: 'References', base: '/en/references/', link: 'syntax' },
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
        nav,

        sidebar: {
            '/en/guides/': { base: '/en/guides/', items: guideNav },
            '/en/references/': { base: '/en/references/', items: referenceNav },
        },
    },
});
