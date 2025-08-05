import { defineConfig, type DefaultTheme } from 'vitepress';

const nav: DefaultTheme.NavItem[] = [
    { text: 'ガイド', link: '/ja/guides/get-started', activeMatch: '^/ja/guides/' },
    { text: 'リファレンス', link: '/ja/references/syntax', activeMatch: '^/ja/references/' },
    { text: 'AiScriptを試す', link: '/ja/playground', activeMatch: '^/ja/playground' },
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
    {
        text: '言語仕様',
        items: [
            { text: '構文', link: 'syntax' },
            { text: '組み込みプロパティ', link: 'builtin-props' },
            { text: '予約語', link: 'keywords' },
            { text: 'リテラル式', link: 'literals' },
            { text: '組み込み関数', link: 'std' },
            { text: '組み込み関数（Math）', link: 'std-math' },
        ],
    },
    {
        text: 'JavaScript Interface',
        items: [
            { text: '基本の処理系', link: 'interface/basic' },
            { text: 'AiSON', link: 'interface/aison' },
        ],
    },
];

export const jaSearchLocale: NonNullable<DefaultTheme.LocalSearchOptions['translations']> = {
    button: {
        buttonText: '検索',
        buttonAriaLabel: '検索する',
    },
    modal: {
        displayDetails: '詳細を表示',
        resetButtonTitle: 'リセット',
        backButtonTitle: '閉じる',
        noResultsText: '該当する結果がありませんでした',
        footer: {
            selectText: 'で選択',
            selectKeyAriaLabel: 'Enterキー',
            navigateText: 'で移動',
            navigateUpKeyAriaLabel: '上矢印キー',
            navigateDownKeyAriaLabel: '下矢印キー',
            closeText: 'で閉じる',
            closeKeyAriaLabel: 'Escキー',
        },
    },
};

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

        docFooter: {
            prev: '前のページ',
            next: '次のページ',
        },
        outline: {
            label: '目次',
        },
        darkModeSwitchLabel: 'ダークモード',
        lightModeSwitchTitle: 'ライトモードに切り替え',
        darkModeSwitchTitle: 'ダークモードに切り替え',
        sidebarMenuLabel: 'メニュー',
        returnToTopLabel: 'ページの先頭に戻る',    
    },
});
