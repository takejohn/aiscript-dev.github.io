<template>
    <DefaultTheme.Layout />
    <div v-if="!loaded" :class="$style.w"></div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue';
import { useData, useRoute, inBrowser } from 'vitepress';
import DefaultTheme from 'vitepress/theme';

const data = useData();
const route = useRoute();
const loaded = ref(false);

const locales = Object.keys(data.site.value.locales) as string[];
const localesRegex = new RegExp(`^/(${locales.join('|')})`);
const savedLocale = localStorage.getItem('ais:locale');

if (inBrowser && !localesRegex.test(route.path)) {
    if (savedLocale != null && locales.includes(savedLocale)) {
        location.replace('/' + savedLocale + location.pathname + location.search);
    } else if (locales.includes(navigator.language.split('-')[0])) {
        location.replace('/' + navigator.language.split('-')[0] + location.pathname + location.search);
    } else {
        location.replace('/ja' + location.pathname + location.search);
    }
}

if (inBrowser) {
    loaded.value = true;
}

watch(data.lang, (lang) => {
    if (inBrowser) {
        localStorage.setItem('ais:locale', lang.split('-')[0]);
    }
}, { immediate: true });
</script>

<style module>
.w { 
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: var(--vp-c-bg);
    z-index: 9999;
}
</style>