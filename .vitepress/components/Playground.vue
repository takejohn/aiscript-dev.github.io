<template>
    <div :class="$style.playgroundRoot">
        <div :class="$style.playgroundButtons">
            <button @click="run">Run</button>
        </div>
        <div :class="$style.playgroundLogs">
            <div v-for="log in logs" :key="log" :class="$style.playgroundLogItem">{{ log }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Interpreter, Parser, utils as aisUtils } from '@syuilo/aiscript';

const props = defineProps<{
    code: string;
}>();

const logs = ref<string[]>([]);

let ParserClass: typeof Parser | null = null;
let InterpreterClass: typeof Interpreter | null = null;
let utils: typeof aisUtils | null = null;

let parser: Parser | null = null;
let interpreter: Interpreter | null = null;

async function run() {
    logs.value = ['[Playground] Loading...'];
    if (!ParserClass || !InterpreterClass || !utils) {
        const [
            { Parser, Interpreter, utils: importedUtils },
        ] = await Promise.all([
            import('@syuilo/aiscript'),
            new Promise((resolve) => setTimeout(resolve, 250)), // あまりにも高速に切り替わると実行できてるのかわかりにくいので、最低250msはロード画面を挟む
        ]);
        ParserClass = Parser;
        InterpreterClass = Interpreter;
        utils = importedUtils;
    } else {
        await new Promise((resolve) => setTimeout(resolve, 250)); // あまりにも高速に切り替わると実行できてるのかわかりにくいので、最低250msはロード画面を挟む
    }
    if (!parser) {
        parser = new ParserClass();
    }
    if (interpreter) {
        interpreter.abort();
    }
    interpreter = new InterpreterClass({}, {
        out: (value) => {
            logs.value.push(value.type === 'num' ? value.value.toString() : value.type === 'str' ? value.value : utils?.valToString(value) ?? '');
        },
    });

    logs.value = [];

    const ast = parser.parse(props.code);
    await interpreter.exec(ast);
}
</script>

<style module>
.playgroundRoot {
    border-top: 1px solid var(--vp-c-divider);
    padding: 12px 24px;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 12px;
}

.playgroundButtons button {
    background-color: var(--vp-button-brand-bg);
    color: var(--vp-button-brand-text);
    font-weight: 700;
    transition: background-color 0.25s;
    padding: 4px 16px;
    border-radius: 8px;
    cursor: pointer;
}

.playgroundButtons button:hover {
    color: var(--vp-button-brand-hover-text);
    background-color: var(--vp-button-brand-hover-bg);
}

.playgroundLogs {
    background-color: var(--vp-c-bg);
    padding: 12px;
    min-height: 120px;
    max-height: 400px;
    overflow-y: auto;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.playgroundLogItem {
    font-family: var(--vp-font-family-mono);
    white-space: pre-wrap;
    font-size: 14px;
}
</style>