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

AiSONをパースするための関数は`@syuilo/aiscript`に内包されています。`AiSON.parse`でAiSONの文字列からJavaScript Valueへの変換が可能です。

:::tip
現時点ではパースのみ可能です。AiSONへ変換する（`AiSON.stringify`）は実装されていません。
:::

```ts
import { AiSON } from '@syuilo/aiscript';

const data = AiSON.parse('{key: "value"}');
```
