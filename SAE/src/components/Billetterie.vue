<script setup>
import { onMounted } from 'vue'
import { useBilletterieStore } from '@/stores/billetterie.js'
const billetterie = useBilletterieStore()

onMounted(() => {
  billetterie.fetchBilletterie()
})

async function acheter(nom) {
  await billetterie.acheterBillet(nom)
}

function getQuantiteRestante(billet) {
  if (!billet.jours || billet.jours.length === 1) return billet.quantite;
  const billets1Jour = billetterie.billets.filter(b => b.jours?.length === 1 && billet.jours.includes(b.jours[0]));
  const quantites = billets1Jour.map(b => b.quantite);
  return quantites.length ? Math.min(...quantites) : billet.quantite;
}
</script>

<template>
  <h1>Billetterie</h1>
  <ul>
    <li v-for="billet in billetterie.billets" :key="billet.nom">
      {{ billet.nom }} - {{ billet.prix }}€ ({{getQuantiteRestante(billet) }} disponibles)
      <button @click="acheter(billet.nom)" :disabled="getQuantiteRestante(billet) === 0">
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
