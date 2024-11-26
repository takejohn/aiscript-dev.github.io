---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "AiScript"
  text: "ブラウザで動く\nユーザースクリプト用言語"
  tagline: ユーザーが作成するプラグインやミニゲームを安全に作動
  image:
    src: /icons/aiscript_gd.svg
    alt: AiScript
  actions:
    - theme: brand
      text: はじめる
      link: /ja/guides/get-started
    - theme: alt
      text: ブラウザで試す
      link: /ja/playground

features:
  - icon: 🤗
    title: 親しみやすいシンタックス
    details: JavaScriptに似た構文を採用しており、初学者でも簡単に学べます。
  - icon: 🏝️
    title: サンドボックス環境で安全
    details: 動作はすべてAiScriptランタイム上で完結。無限ループを組まれても、ホストのJavascript環境には影響しません。
  - icon: 🧩
    title: 簡単に拡張可能
    details: AiScriptは簡単にカスタマイズ可能！定数を注入したり、関数を注入したりして、動作を拡張できます。
---

