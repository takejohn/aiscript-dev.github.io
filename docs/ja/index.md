---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "AiScript"
  text: "ブラウザで動く\nユーザースクリプト用言語"
  tagline: ユーザーが作成するプラグインやミニゲームを安全に動作
  image:
    src: /aiscript.webp
    alt: AiScript
  actions:
    - theme: brand
      text: Markdown Examples
      link: /markdown-examples
    - theme: alt
      text: API Examples
      link: /api-examples

features:
  - title: 親しみやすいシンタックス
    details: JavaScriptに似た構文を採用しており、初学者でも簡単に学べます。
  - title: サンドボックス環境で安全
    details: 動作はすべてAiScriptランタイム上で完結。無限ループを組まれても、ホストのJavascript環境には影響しません。
  - title: 簡単に拡張可能
    details: AiScriptは簡単にカスタマイズ可能！定数を注入したり、関数を注入したりして、動作を拡張できます。
---

