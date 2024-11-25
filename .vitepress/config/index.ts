import { defineConfig } from 'vitepress';
import { shared } from './shared';
import { ja } from './ja';
import { en } from './en';

export default defineConfig({
    ...shared,
    locales: {
        ja: { label: '日本語', ...ja },
        en: { label: 'English', ...en },
    },
});
