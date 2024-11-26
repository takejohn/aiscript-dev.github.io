---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: AiScript
  text: "Script language, \nbut it runs in the browser"
  tagline: Perfect for user-created plugins and mini-games
  image:
    src: /icons/aiscript_gd.svg
    alt: AiScript
  actions:
    - theme: brand
      text: Get Started
      link: /en/guides/get-started
    - theme: alt
      text: Try in Browser
      link: /en/playground

features:
  - icon: 🤗
    title: Friendly Syntax
    details: Adopts a syntax similar to JavaScript, making it easy for beginners to learn.
  - icon: 🏝️
    title: Safe in a Sandbox Environment
    details: All operations are completed within the AiScript runtime. Even if an infinite loop is created, it will not affect the host JavaScript environment.
  - icon: 🧩
    title: Easily Extensible
    details: AiScript is easily customizable! You can inject constants or functions to extend its functionality.
---