import type { ShikiTransformer } from 'shiki';

function escapeHtml(string: string): string {
    return string.replace(/[&'`"<>]/g, (match) => {
        return {
            '&': '&amp;',
            "'": '&#x27;',
            '`': '&#x60;',
            '"': '&quot;',
            '<': '&lt;',
            '>': '&gt;',
        }[match] || match;
    });
}

export function createPlaygroundTransformer(): ShikiTransformer {
    let codeRaw: string | null = null;

    return {
        preprocess: (code, options) => {
            if (options.lang !== 'aiscript' || !options.meta?.__raw?.includes('playground')) return;
            codeRaw = code;
        },
        postprocess: (html, options) => {
            if (options.lang !== 'aiscript' || !options.meta?.__raw?.includes('playground') || codeRaw == null) return;
            return `${html}<CodeBlockPlayground code="${escapeHtml(codeRaw)}"></CodeBlockPlayground>`;
        },
    };
}
