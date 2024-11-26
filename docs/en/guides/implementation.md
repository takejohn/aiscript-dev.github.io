# Embedding into Your Application

This guide explains how to integrate AiScript into an existing web application.

## 1. Installing AiScript

First, install AiScript.

```sh
# npm
npm i @syuilo/aiscript

# yarn
yarn add @syuilo/aiscript

# pnpm
pnpm add @syuilo/aiscript
```

## 2. Loading and Configuring AiScript

This section explains the steps to execute AiScript provided as plain text.

```ts
const program = "<: \"Hello, World!\"";
```

Load AiScript.

```ts
import { Parser, Interpreter, utils } from '@syuilo/aiscript'; // [!code ++]

const program = "<: \"Hello, World!\"";
```

AiScript first converts the script into an object called AST using the `Parser`, and then executes it using the `Interpreter`.

Prepare a JavaScript function to execute AiScript.\
The execution of the AiScript interpreter is asynchronous, so use an `async function`.

```ts
import { Parser, Interpreter, utils } from '@syuilo/aiscript';

const program = "<: \"Hello, World!\"";

async function run() { // [!code ++]
    // Add processing steps here // [!code ++]
} // [!code ++]
// [!code ++]
run(); // [!code ++]
```

Next, initialize the `Parser` and `Interpreter`. While creating instances are done in the function, it is better to declare the variables for the instances outside the function for better control.

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

The `Interpreter` provides options for injecting global constants and functions into AiScript, as well as handlers for input and output.

This time, use the output handler of `Interpreter` to display output from AiScript on the console using `console.log`.

Raw JavaScript values are not used directly when interacting with the AiScript interpreter; everything is handled through an object called `Value`. For simplicity, this example uses `utils.valueToJs` to convert a `Value` into a JavaScript value.

```ts
import { Parser, Interpreter, utils } from '@syuilo/aiscript';

const program = "<: \"Hello, World!\"";

let parser: Parser;
let interpreter: Interpreter;

async function run() {
    parser = new Parser();
    interpreter = new Interpreter({}, { // [!code ++]
        out: (value) => { // [!code ++]
            console.log(utils.valueToJs(value)); // [!code ++]
        }, // [!code ++]
    }); // [!code ++]
}

run();
```

Now that the `Parser` and `Interpreter` are ready, let's execute the `program`.

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

Congratulations! The message `Hello, World!` should appear in the console.

:::warning Note
In a production environment, ensure to add error handling for both `parser.parse` and `interpreter.exec`, as well as for AiScript internal error (can be handled in handler of the `Interpreter`).
:::

## 3. Injecting Custom Values

As mentioned earlier, you can inject global constants and functions into AiScript by passing them as the first argument to the `Interpreter`.

In this example, let's inject the following functions:

- `APP_VERSION`: A constant representing the application's version.
- `App:showAlert(message: string)`: A function to display an alert.

Combine these to run a program that displays an alert including the version number.

```aiscript
App:showAlert(`You are running MyApp Version {APP_VERSION}`)
```

Below is using the same code from Step 2, change only the AiScript program:

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

Next, inject `APP_VERSION` and `App:showAlert`.

```ts
import { Parser, Interpreter, utils, values } from '@syuilo/aiscript'; // [!code ++]
import { alert } from '@/ui'; // Modify this according to your environment // [!code ++]

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

Pass the values you want to inject to the `Interpreter` as **AiScript values**. All values can be created via the `values` object. Besides strings, you can also inject numbers, arrays, objects, and more.

Function arguments are also passed as AiScript values. Use `assert*` functions included in `utils` to perform type assertions and throw errors if invalid values are passed.

:::tip Tip

To avoid conflicts with existing functions, it is recommended to use namespaces when naming your functions.

For reference, check out the [Misskey-enhanced function reference](https://misskey-hub.net/docs/for-developers/plugin/plugin-api-reference/) and the [implementation of custom functions in code](https://github.com/misskey-dev/misskey/blob/develop/packages/frontend/src/scripts/aiscript/api.ts), which include a bunch of custom functions.

:::