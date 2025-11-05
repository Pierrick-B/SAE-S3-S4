<script setup>
import NavBar from '@/components/NavBar.vue';
import Footer from "@/components/Footer.vue";

import langue from "@/datasource/lang.json"
import { useLangStore } from "@/stores/langStore.js";
let lgButton = useLangStore();
</script>

<template>
    <div class="app-shell">
        <NavBar></NavBar>
        <main class="app-main">
            <router-view />
            <h1>{{ langue.titreTest[lgButton.language] }}</h1>
        </main>
        <Footer></Footer>
    </div>
  
</template>

<style scoped>
.app-shell {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.app-main {
    flex: 1 0 auto;
    display: block;
}
</style>
