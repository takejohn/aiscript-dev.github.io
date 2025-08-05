# JavaScript Implementation: 基本の処理系

:::tip
基本的な使用方法は[ガイド「アプリに組み込む」](/ja/guides/implementation)をご覧ください。
:::

## Parser

### `Parser.parse(script: string)`

AiScriptが記述された文字列をASTに変換します。

```ts
import { Parser } from '@syuilo/aiscript';

const program = "<: \"Hello, World!\"";

let parser: Parser;

async function run() {
    parser = new Parser();
    const ast = parser.parse(program); 
}

run();
```

### `Parser.addPlugin(type: PluginType, plugin: ParserPlugin)`

現在のインスタンスに、ASTを受け取りバリデーション（`validate`）や変更（`transform`）を行うプラグインを追加します。

## Interpreter

AiScript Value は適宜JavaScriptのプリミティブ型に変換する必要があります。

### Constructor

`Interpreter(consts: Record<string, Value>, opts: ...)`

#### `consts`

実行時に注入するプロパティを指定します。プロパティ名をkey、注入するAiScript値をvalueとするオブジェクトを指定します。

#### `opts`

実行のオプションを指定します。すべて任意です。

- `in(q: string): Promise<string>`: 入力を受け付ける際にこの関数を呼び出します。`q`はプロンプトに表示する値、返り値はユーザーからの入力の文字列を返すPromiseです。
- `out(value: Value): void`: 出力する際にこの関数を呼び出します。`value`は出力されるAiScript Valueです。
- `err(e: AiScriptError): void`: AiScript実行中に問題が発生した場合はこの関数を呼び出します。`e`はJavaScriptのErrorクラスを継承するAiScriptErrorです。
- `log(type: string, params: LogObject): void`: ランタイムからのログがある場合はこの関数を呼び出します。
- `maxStep: number`: 実行の深さを制限する場合はここにその最大ステップ数を入力します。
- `abortOnError: boolean`: 実行中にエラーが発生した際に、インタプリタが担うその他の実行（今後の実行）も含めてすべてを停止するかどうか。
- `irqRate: number`: IRQレートを指定できます。
- `irqSleep() => Promise<void>`: IRQの待ちを定義できます。

### `Interpreter.exec(script?: Ast.Node[])`

`script`に指定されたAiScript ASTを非同期で実行します。**通常はこちらを使用してください。**

### `Interpreter.execSync(script?: Ast.Node[])`

`script`に指定されたAiScript ASTを同期的に実行します。

:::danger 警告
- 同期的に実行する場合は最大ステップ数などの制限を調整することを強くお勧めします。非同期の`exec`に対し、`execSync`は悪意のあるスクリプト（無限ループなど）が実行された場合ホストのJavascript環境に重大な影響を与えます。
- 同期的に実行する場合、`consts`で注入した関数にてPromiseを返すもの（非同期な関数）は実行できず、エラーとなります。
:::

### `Interpreter.execFn(fn: VFn, args: Value[])`

`fn`に渡されたAiScript関数を非同期で実行します。`args`には関数の引数を渡します。同期的に実行する場合は`Interpreter.execFnSync`を使用します。

### `Interpreter.execFnSimple(fn: VFn, args: Value[])`

`fn`に渡されたAiScript関数を非同期で実行します。`execFn`は関数内でエラーが発生するとInterpreterのコールバック（`opts.err`）がある場合はそちらを呼ぶのに対し、`execFnSimple`は常にErrorをthrowします。

### `Interpreter.collectMetadata(script?: Ast.Node[])`

[メタデータ構文](../syntax.html#メタデータ構文)の中身をJavaScriptの値として取得します。
