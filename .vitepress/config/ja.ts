import { defineConfig, type DefaultTheme } from 'vitepress';

const nav: DefaultTheme.NavItem[] = [
    { text: 'ガイド', link: '/ja/guides/get-started' },
    { text: 'リファレンス', link: '/ja/references/syntax' },
    { text: 'AiScriptを試す', link: '/ja/playground' },
];

const guideNav: DefaultTheme.SidebarItem[] = [
    {
        text: 'AiScriptを使ってみよう',
        items: [
            { text: 'はじめに', link: 'get-started' },
            { text: '実行方法', link: 'execution' },        
            { text: 'アプリに組み込む', link: 'implementation' },
        ],
    },
    { text: 'リファレンス', base: '/ja/references/', link: 'syntax' },
];

const referenceNav: DefaultTheme.SidebarItem[] = [
    { text: '構文', link: 'syntax' },
    { text: '組み込みプロパティ', link: 'builtin-props' },
    { text: '予約語', link: 'keywords' },
    { text: 'リテラル式', link: 'literals' },
    { text: '組み込み関数', link: 'std' },
    { text: '組み込み関数（Math）', link: 'std-math' },
];

export const ja = defineConfig({
    lang: 'ja-JP',
    description: 'ブラウザで動く、ユーザースクリプト用言語',

    themeConfig: {
        nav,

        sidebar: {
            '/ja/guides/': {
                base: '/ja/guides/',
                items: guideNav,
            },
            '/ja/references/': { base: '/ja/references/', items: referenceNav },
        },
    },
});
