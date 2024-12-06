import * as fs from 'fs/promises';
import { Interpreter, Parser } from '@syuilo/aiscript';
import markdownit from 'markdown-it';
import config from './.vitepress/config/index.js';
import { describe, test } from 'vitest';
import path from 'path';

const md = markdownit();

const files = (await Promise.all(
    (await fs.readdir(config.srcDir!, { recursive: true }))
        .filter((filename) => filename.endsWith('.md'))
        .map(async (filename) => {
            const source = await fs.readFile(path.resolve(config.srcDir!, filename), 'utf-8');
            const tree = md.parse(source, {});
            const codeblocks = tree
                .filter((token) => token.type == 'fence')
                .filter(({ info }) => /aiscript\b/.test(info))
                .map(({ content, info, map }) => ({ content, info, line: map![0] + 1 }));
            return {
                name: filename,
                codeblocks,
            };
        })
)).filter(({ codeblocks }) => codeblocks.length > 0);

describe.each(files)('testing file $name', ({ name, codeblocks }) => {
    test.each(codeblocks)(`codeblock %# (${name}:$line)`, async ({ content, info }) => {
        const interpreter = new Interpreter({});
        const ast = Parser.parse(content);
        await interpreter.exec(ast);
    });
});
