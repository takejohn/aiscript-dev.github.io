# How to Execute

First, download the AiScript repository from GitHub.

```sh
# 1. Clone (download) the repository
git clone https://github.com/aiscript-dev/aiscript

# 2. Navigate to the AiScript repository folder
cd aiscript

# 3. Install dependencies
npm i
```

## 1. Running from the Playground

If you want to host it locally, run the following commands and open the displayed link in your browser:

```sh
# 1. Navigate to the built-in Playground folder
cd playground

# 2. Build the Playground
npm run build

# 3. Start the Playground
npm run serve
```

:::tip
Playground is also available on this site. [Try AiScript](../playground.md)
:::

## 2. Running a Script File

You can parse and execute the content of a file.  

Create a file named `main.ais` in the project root, and save it with the following content:  

```aiscript
<: "Hello world!"
```

Run the following command:  
```sh
npm run start
```

## 3. Parsing a Script File (For Debugging the Parser)

You can parse the content of a file and display its AST (Abstract Syntax Tree). This is mainly for debugging the parser and works regardless of the interpreter's implementation status.

Create a file named `main.ais` in the project root, and save it with the following content:

```aiscript
<: "Hello world!"
```

Run the following command:  
```sh
npm run parse
```

## 4. Running Code in REPL

You can interactively execute code on the command line. Run the following command and start entering code:

```sh
npm run repl
```
