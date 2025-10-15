<script setup>
import NavBar from '@/components/NavBar.vue';
import Footer from "@/components/Footer.vue";

import langue from "@/datasource/lang.json"
import { useLangStore } from "@/stores/langStore.js";
let lgButton = useLangStore();
</script>

<template>
    <NavBar title="lieu"></NavBar>
    <router-view></router-view>
    <h1>{{langue.titreTest[lgButton.language]}}</h1>
    <Footer></Footer>
</template>

<style scoped>
</style>
