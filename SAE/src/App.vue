<script setup>
import NavBar from '@/components/NavBar.vue';
import Footer from "@/components/Footer.vue";

import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { watch, onMounted } from 'vue'

const { t } = useI18n()
const route = useRoute()

function updateTitle() {
  const title = t(route.meta.titleKey || 'pageTitleAccueil')
  document.title = `${title} - Belfort Pop Con`
}

onMounted(() => {
  updateTitle()
})

watch(() => route.meta, updateTitle, { deep: true })
watch(() => t(route.meta.titleKey || 'pageTitleAccueil'), updateTitle)
</script>

<template>
    <div class="app-shell">
        <NavBar></NavBar>
        <main class="app-main">
            <router-view />
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
