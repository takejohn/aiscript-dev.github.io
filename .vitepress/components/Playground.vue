<template>
    <div :class="$style.playgroundRoot">
        <div :class="$style.playgroundButtons">
            <button :class="[$style.playgroundButton, $style.playgroundButtonPrimary]" @click="run">Run</button>
            <button :class="[$style.playgroundButton]" :disabled="loading" @click="stop">Abort</button>
            <button :class="[$style.playgroundButton]" :disabled="loading" @click="clearLog">Clear</button>
        </div>
        <div :class="$style.playgroundLogs">
            <div
                v-for="log in logs"
                :key="log.text"
                :class="[
                    $style.playgroundLogItem,
                    {
                        [$style.error]: log.type === 'error',
                        [$style.info]: log.type === 'info',
                    }
                ]"
            >{{ log.text }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { utils, errors } from '@syuilo/aiscript';
import type { Interpreter, Parser } from '@syuilo/aiscript';

const props = defineProps<{
    code: string;
}>();

const logs = ref<{
    text: string;
    type?: 'error' | 'info';
}[]>([]);
const loading = ref(false);

let ParserClass: typeof Parser | null = null;
let InterpreterClass: typeof Interpreter | null = null;

let parser: Parser | null = null;
let interpreter: Interpreter | null = null;

async function run() {
    loading.value = true;

    if (logs.value.length > 0) {
        logs.value = [];
        await new Promise((resolve) => setTimeout(resolve, 100));
    }

    logs.value = [{
        text: `[Playground] Loading...`,
        type: 'info',
    }];

    if (!ParserClass || !InterpreterClass) {
        const [
            { Parser, Interpreter },
        ] = await Promise.all([
            import('@syuilo/aiscript'),
            new Promise((resolve) => setTimeout(resolve, 250)), // あまりにも高速に切り替わると実行できてるのかわかりにくいので、最低250msはロード画面を挟む
        ]);
        ParserClass = Parser;
        InterpreterClass = Interpreter;
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
            logs.value.push({
                text: value.type === 'num' ? value.value.toString() : value.type === 'str' ? `"${value.value}"` : JSON.stringify(utils.valToJs(value), null, 2) ?? '',
            });
        },
    });

    loading.value = false;

    try {
        const ast = parser.parse(props.code);
        await interpreter.exec(ast);
    } catch (err) {
        if (err instanceof errors.AiScriptError) {
            let errorName = 'AiScriptError';

            if (err instanceof errors.AiScriptSyntaxError) {
                errorName = 'SyntaxError';
            } else if (err instanceof errors.AiScriptTypeError) {
                errorName = 'TypeError';
            } else if (err instanceof errors.AiScriptRuntimeError) {
                errorName = 'RuntimeError';
            } else if (err instanceof errors.AiScriptIndexOutOfRangeError) {
                errorName = 'IndexOutOfRangeError';
            } else if (err instanceof errors.AiScriptUserError) {
                errorName = 'UserError';
            }

            logs.value.push({
                text: `[${errorName}] ${err.name}: ${err.message}`,
                type: 'error',
            });
        } else {
            logs.value.push({
                text: `[Error] ${err}`,
                type: 'error',
            });
        }
    }
}

function stop() {
    if (interpreter) {
        interpreter.abort();
    }
}

function clearLog() {
    logs.value = [];
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

.playgroundButtons {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.playgroundButton {
    transition: background-color 0.25s;
    padding: 4px 16px;
    border-radius: 8px;
}

.playgroundButton:disabled {
    opacity: 0.5;
}

.playgroundButton:hover {
    background-color: var(--vp-button-alt-hover-bg);
}

.playgroundButton:not(.playgroundButtonPrimary) {
    font-size: 80%;
    line-height: 1.5;
}

.playgroundButtonPrimary {
    background-color: var(--vp-button-brand-bg);
    color: var(--vp-button-brand-text);
    font-weight: 700;
}

.playgroundButtonPrimary:hover {
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
    padding: 0 8px;
    border-radius: 4px;
}

.playgroundLogItem.error {
    background-color: var(--vp-c-danger-soft);
    color: var(--vp-c-danger-1);
}

.playgroundLogItem.info {
    background-color: var(--vp-c-tip-soft);
    color: var(--vp-c-tip-2);
    font-style: italic;
}
</style>