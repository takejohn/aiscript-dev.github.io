# アプリに組み込む

このガイドでは、既存のWebアプリにAiScriptを組み込む方法をご紹介します。

## 1. AiScriptのインストール

まずは、AiScriptをインストールします。

```sh
# npm
npm i @syuilo/aiscript

# yarn
yarn add @syuilo/aiscript

# pnpm
pnpm add @syuilo/aiscript
```

## 2. AiScriptの読み込み・設定

今回は、このようにテキストベースで渡されたAiScriptを実行するまでの手順を説明します。

```ts
const program = "<: \"Hello, World!\"";
```

AiScriptを読み込みます。

```ts
import { Parser, Interpreter, utils } from '@syuilo/aiscript'; // [!code ++]

const program = "<: \"Hello, World!\"";
```

AiScriptは、まず`Parser`でASTと呼ばれるオブジェクトに変換し、その後`Interpreter`で実行します。

AiScriptを実行する際に呼び出すJavascript関数を用意しましょう。\
AiScriptインタプリタの実行は非同期で行われますので、`async function`を使用します。

```ts
import { Parser, Interpreter, utils } from '@syuilo/aiscript';

const program = "<: \"Hello, World!\"";

async function run() { // [!code ++]
    // 処理を追加していく // [!code ++]
} // [!code ++]
// [!code ++]
run(); // [!code ++]
```

次に、`Parser`と`Interpreter`を初期化します。それぞれは再使用が可能なので、関数の外で宣言しておくとよいでしょう。

```ts
import { Parser, Interpreter, utils } from '@syuilo/aiscript';

const program = "<: \"Hello, World!\"";

let parser: Parser; // [!code ++]
let interpreter: Interpreter; // [!code ++]

async function run() {
    parser = new Parser(); // [!code ++]
    interpreter = new Interpreter(); // [!code ++]
}

run();
```

`Interpreter`には、AiScriptにグローバル定数や関数を注入できるオプションと、入出力のためのハンドラがあります。

今回は、`Interpreter`の出力ハンドラから`console.log`を利用して、AiScriptからの出力をコンソールに表示するようにします。

AiScriptインタプリタとのやり取りでは生のJavascriptの値は使われず、すべてValueというオブジェクトを介しています。今回は簡単のために、`utils.valueToJs`を使ってValueをJavascriptの値に変換しています。

```ts
import { Parser, Interpreter, utils } from '@syuilo/aiscript';

const program = "<: \"Hello, World!\"";

let parser: Parser;
let interpreter: Interpreter;

async function run() {
    parser = new Parser();
    interpreter = new Interpreter({}, { // ←第1引数で注入する値を指定できる // [!code ++]
        out: (value) => { // [!code ++]
            console.log(utils.valueToJs(value)); // [!code ++]
        }, // [!code ++]
    }); // [!code ++]
}

run();
```

これで`Parser`と`Interpreter`の準備は完了です。実際に`program`を実行してみましょう。

```ts
import { Parser, Interpreter, utils } from '@syuilo/aiscript';

const program = "<: \"Hello, World!\"";

let parser: Parser;
let interpreter: Interpreter;

async function run() {
    parser = new Parser();
    interpreter = new Interpreter({}, {
        out: (value) => {
            console.log(utils.valueToJs(value));
        },
    });

    const ast = parser.parse(program); // [!code ++]
    await interpreter.exec(ast); // [!code ++]
}

run();
```

お疲れ様でした！コンソールに`Hello, World!`と表示されるはずです。

:::warning 注意
実際の運用では、`parser.parse`および`interpreter.exec`にエラーハンドリングを追加してください。
:::

## 3. 独自の値を注入する

先ほど説明した通り、`Interpreter`の第1引数にはAiScriptからアクセス可能なグローバル定数や関数を注入できます。

今回は、以下のような関数を注入してみましょう。

- `APP_VERSION`: アプリケーションのバージョンの定数
- `App:showAlert(message: string)`: アラートを表示する関数

そして、これらを組み合わせて、バージョン番号を含むアラートを表示するプログラムを実行してみます。

```aiscript
App:showAlert(`You are running MyApp Version {APP_VERSION}`)
```

ステップ２のコードをそのまま流用して、AiScriptプログラムだけを変更したのが以下のものです。

```ts
import { Parser, Interpreter, utils } from '@syuilo/aiscript';

const program = `App:showAlert(\`You are running MyApp Version {APP_VERSION}\`)`; // [!code ++]

let parser: Parser;
let interpreter: Interpreter;

async function run() {
    parser = new Parser();
    interpreter = new Interpreter({}, {
        out: (value) => {
            console.log(utils.valueToJs(value));
        },
    });

    const ast = parser.parse(program);
    await interpreter.exec(ast);
}

run();
```

ここで、`APP_VERSION`と`App:showAlert`を注入します。

```ts
import { Parser, Interpreter, utils, values } from '@syuilo/aiscript'; // [!code ++]
import { alert } from '@/ui'; // お使いの環境に合わせて変更してください // [!code ++]

const program = `App:showAlert(\`You are running MyApp Version {APP_VERSION}\`)`;

let parser: Parser;
let interpreter: Interpreter;

async function run() {
    parser = new Parser();
    interpreter = new Interpreter({
        APP_VERSION: values.STR('1.0.0'), // [!code ++]
        'App:showAlert': values.FN_NATIVE(([message]) => { // [!code ++]
            utils.assertString(message); // [!code ++]
            alert(message.value); // [!code ++]
            return values.NULL; // [!code ++]
        }), // [!code ++]
    }, {
        out: (value) => {
            console.log(utils.valueToJs(value));
        },
    });

    const ast = parser.parse(program);
    await interpreter.exec(ast);
}

run();
```

`Interpreter`の第1引数に、注入したい値を**AiScriptの値に変換して**渡します。すべての値は`values`オブジェクトを通じて生成できます。もちろん文字列だけでなく、数値・配列・オブジェクトなども注入することができます。

また、関数の引数もAiScriptの値として渡されます。`utils`に含まれている`assert*`系の関数を使って、型アサーションを行うとともに、不正な値が含まれていた場合はエラーを返すことができます。

:::tip ヒント

既存の関数群との衝突を避けるためにも、名前空間を意識して関数名を指定することをお勧めします。

独自関数を多数実装している[Misskeyの独自関数のリファレンス](https://misskey-hub.net/docs/for-developers/plugin/plugin-api-reference/)や、[実際に独自関数を実装している部分のコード](https://github.com/misskey-dev/misskey/blob/develop/packages/frontend/src/scripts/aiscript/api.ts)が参考になるでしょう。

:::
