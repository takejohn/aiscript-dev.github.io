import { defineConfig } from 'vitepress';
import aiscriptTmLanguage from 'aiscript-vscode/aiscript/syntaxes/aiscript.tmLanguage.json' assert { type: 'json' };
import { createPlaygroundTransformer } from '../scripts/playground-transformer';

// https://vitepress.dev/reference/site-config
export const shared = defineConfig({
    title: 'AiScript',
    srcDir: 'docs',

    markdown: {
        math: true,
        codeTransformers: [
            createPlaygroundTransformer(),
        ],
        languages: [
            aiscriptTmLanguage as any,
        ],
    },
})
