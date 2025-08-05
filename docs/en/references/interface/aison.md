# JavaScript Implementation: AiSON

**AiSON** (AiScript Object Notation) is a data interchange syntax based on AiScript's [metadata syntax](../syntax.md#metadata-syntax).

Only pure [literals](../literals.md) are allowed as elements. Including functions or any other type of dynamic expression will result in a syntax error.

It's designed to be a more delightful to write compared to JSON. For example, object keys don't require `"` (double quotes), and trailing commas `,` are permitted. This makes writing simple data structures easier.

More strictly:

  * Only **one top-level object** is permitted.
  * **Dynamic expressions**, such as functions or dynamic bindings for object values, are not allowed.
  * **Namespaces and metadata** are not supported.

```aiscript
{
    name: "example"
    version: 42
    keywords: ["foo", "bar", "baz"]
    // A trailing comma is allowed on the last item
}
```

## JavaScript API

The `@syuilo/aiscript` package includes a built-in function for parsing AiSON. You can use `AiSON.parse` to convert an AiSON string directly into a JavaScript value.

:::tip
Currently, only parsing from AiSON to JavaScript is supported. A function to serialize a JavaScript object into an AiSON string (`AiSON.stringify`) has not yet been implemented.
:::

```ts
import { AiSON } from '@syuilo/aiscript';

const data = AiSON.parse('{ key: "value" }');
```
