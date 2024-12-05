<template>
    <DefaultTheme.Layout />
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useData, inBrowser } from 'vitepress';
import DefaultTheme from 'vitepress/theme';

const data = useData();

watch(data.lang, (lang) => {
    if (inBrowser) {
        localStorage.setItem('ais:locale', lang.split('-')[0]);
    }
}, { immediate: true });
</script>
