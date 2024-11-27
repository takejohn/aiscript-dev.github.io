# 実行方法

まずは、AiScriptリポジトリをGitHubからダウンロードしてください。

```sh
# 1. リポジトリをクローン（ダウンロード）
git clone https://github.com/aiscript-dev/aiscript

# 2. AiScriptリポジトリのフォルダに入る
cd aiscript

# 3. 依存関係のインストール
npm i
```

## 1. Playgroundから実行
自分でホストする場合は、以下のコマンドを実行し表示されたリンクをブラウザで開きます。
```sh
# 1. 内臓のPlaygroundフォルダに入る
cd playground

# 2. Playgroundをビルドする
npm run build

# 3. Playgroundを起動する
npm run serve
```

:::tip ヒント
Playgroundは本サイト内にもあります。[AiScriptを試す](../playground.md)
:::

## 2. スクリプトファイルから実行
ファイルの内容を解析して実行します。

プロジェクトルートに`main.ais`を作成し、以下の内容を記述しファイルに保存します。
```aiscript
<: "Hello world!"
```

以下のコマンドを実行します。
```sh
npm run start
```

## 3. スクリプトファイルを解析する (パーサーのデバッグ向け)
ファイルの内容を解析してASTを表示することができます。
主にパーサーのデバッグ向けで、インタプリタの実装状況に関わらずASTの内容を表示することができます。

プロジェクトルートに`main.ais`を作成し、以下の内容を記述しファイルに保存します。
```aiscript
<: "Hello world!"
```

以下のコマンドを実行します。
```sh
npm run parse
```

## 4. REPL上で実行
コマンドライン上で対話的にコードを実行します。
以下のコマンドを実行し、コードを入力します。

```sh
npm run repl
```
