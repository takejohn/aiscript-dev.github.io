import { defineConfig } from 'vitepress';
import aiscriptTmLanguage from 'aiscript-vscode/aiscript/syntaxes/aiscript.tmLanguage.json' assert { type: 'json' };

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "AiScript",
  description: "ブラウザで動く、ユーザースクリプト用言語",
  srcDir: 'docs',

  markdown: {
    languages: [
      aiscriptTmLanguage as any,
    ],
  },

  locales: {
    ja: {
      label: '日本語',
      lang: 'ja',
    },
    en: {
      label: 'English',
      lang: 'en',
    },
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    i18nRouting: true,

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
