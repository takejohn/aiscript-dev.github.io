# JavaScript Implementation: AiSONについて

AiSON (AiScript Object Notation) は、AiScriptの[メタデータ構文](../syntax.html#メタデータ構文)を基に作られたデータ交換用の構文です。

要素として関数を除く純粋な[リテラル](../literals.html)のみが許可されており、それ以外の式を含むと構文エラーとなります。  

JSONに比べ、オブジェクトのkeyに`"`（ダブルクォーテーション）が必要ない・最終項の末尾に`,`（カンマ）がついていても許容されるなど、より柔軟で書きやすいものとなっています。

より厳密には：

- トップレベルのオブジェクトはひとつしか許可されません。
- 動的な式（関数・オブジェクトのvalueにたいする動的なバインディングなど）は許可されません。
- 名前空間・メタデータはサポートされていません。

```aiscript
{
	name: "example"
	version: 42
	keywords: ["foo", "bar", "baz"]
}
```

## JavaScript API

AiSONをパースするための関数は`@syuilo/aiscript`に内包されています。

`AiSON.parse`でAiSONの文字列からJavaScript Valueへの変換が可能です。シンタックスエラー時は `errors.AiScriptSyntaxError` がスローされます。

```ts
import { AiSON } from '@syuilo/aiscript';

const data = AiSON.parse('{key: "value"}');
```

AiScript v1.2.0 以降では、`AiSON.stringify`でJavaScript ValueからAiSONの文字列への変換が可能です。第一引数に変換したい値を、**第三引数に**インデント幅を指定します。第二引数は`JSON.stringify`とインターフェイスの互換性を保つために未使用となっています（リプレイサー関数はサポートされていません）。

```ts
import { AiSON } from '@syuilo/aiscript';

const data = { key: "value" };

// インデントなしで整形されたAiSON文字列を生成
const str1 = AiSON.stringify(data);

// インデント幅2で整形されたAiSON文字列を生成
const str2 = AiSON.stringify(data, null, 2);

// タブでインデントされたAiSON文字列を生成
const str3 = AiSON.stringify(data, null, '\t');
```
