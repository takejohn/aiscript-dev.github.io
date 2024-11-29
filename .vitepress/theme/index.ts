// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import Layout from './Layout.vue'
import CodeBlockPlayground from '../components/CodeBlockPlayground.vue'
import Playground from '../pages/Playground.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    app.component('CodeBlockPlayground', CodeBlockPlayground);
    app.component('playground', Playground);
  },
} satisfies Theme
