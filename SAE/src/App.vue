<script setup>
import NavBar from '@/components/NavBar.vue';
import Footer from "@/components/Footer.vue";

import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { watch, onMounted, computed } from 'vue'
import panierService from '@/services/panier.service.js'

const { t } = useI18n()
const route = useRoute()

// nombre d'items dans le panier (réactif)
const itemsCount = computed(() => (panierService.panier.items || []).length)

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

        <!-- bouton panier flottant : n'apparaît que s'il y a des éléments -->
        <router-link v-if="itemsCount > 0" class="floating-cart" :to="{ name: 'panier' }" aria-label="Aller au panier">
          <div class="cart-button">
            <span class="count">{{ itemsCount }}</span>
            <!-- icône SVG blanche (remplace emoji) -->
            <span class="icon" aria-hidden="true">
              <!-- Nouvel icône panier (outline, stroke-based) -->
              <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden="true">
                <g fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6">
                  <path d="M3 3h2l1.4 6.5a2 2 0 0 0 2 1.5h8.2a2 2 0 0 0 1.9-1.4L21 6H6" />
                  <circle cx="10" cy="19" r="1.4" />
                  <circle cx="18" cy="19" r="1.4" />
                </g>
              </svg>
            </span>
          </div>
        </router-link>

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

/* Styles pour le bouton panier flottant en haut à droite */
.floating-cart {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 9999;
  text-decoration: none;
}

.cart-button {
  display: flex;
  align-items: center;
  gap: .5rem;
  /* fond remplacé par noir uni */
  background: #111827;
  color: white;
  padding: .5rem .75rem;
  border-radius: 999px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.25);
  font-weight: 700;
  font-family: inherit;
  transform: translateZ(0);
}

.cart-button .count {
  background: rgba(255,255,255,0.15);
  padding: .1rem .4rem;
  border-radius: 999px;
}

/* Forcer l'icône SVG à être blanche et non grisée */
.cart-button .icon svg {
  display: block;
  width: 1.2rem;
  height: 1.2rem;
  fill: white;    /* pour les icônes remplis */
  stroke: white;  /* pour les icônes stroke/outline */
}

.cart-button .icon { line-height: 0; }

@media (max-width: 600px) {
  .cart-button { padding: .45rem .6rem; font-size: .95rem; }
}
</style>
