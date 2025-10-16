<script setup>
import { onMounted } from 'vue'
import { useBilletterieStore } from '@/stores/billetterie.js'
const billetterie = useBilletterieStore()

onMounted(() => {
  billetterie.fetchBilletterie()
})

async function acheter(nom) {
  await billetterie.acheterBillet(nom)
  await billetterie.fetchBilletterie()
}
</script>

<template>
  <h1>Billetterie</h1>
  <ul>
    <li v-for="billet in billetterie.billets" :key="billet.nom">
      {{ billet.nom }} - {{ billet.prix }}€ ({{ billet.quantite }} disponibles)
      <button @click="acheter(billet.nom)" :disabled="billet.quantite === 0">
        Acheter
      </button>
    </li>
  </ul>
</template>

<style scoped>
button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
