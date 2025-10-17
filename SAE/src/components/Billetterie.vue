<script setup>
import { onMounted, computed } from 'vue'
import { useBilletterieStore } from '@/stores/billetterie.js'
const billetterie = useBilletterieStore()

onMounted(() => {
  billetterie.fetchBilletterie()
})

function acheter(nom) {
  billetterie.acheterBillet(nom)
}

function getQuantiteRestante(billet) {
  return billet.quantite
}

// Catégories calculées
const billets1Jour = computed(() => billetterie.billets.billets1Jour || [])
const billets2Jours = computed(() => billetterie.billets.billets2Jours || [])
const billets3Jours = computed(() => billetterie.billets.billets3Jours || [])
const billets4Jours = computed(() => billetterie.billets.billets4Jours || [])
</script>


<template>
  <h1>Billetterie</h1>
  <section>
    <h2>Billets 1 jour</h2>
    <ul>
      <li v-for="billet in billets1Jour" :key="billet.nom">
        {{ billet.nom }} - {{ billet.prix }}€ ({{ getQuantiteRestante(billet) }} disponibles)
        <button @click="acheter(billet.nom)" :disabled="getQuantiteRestante(billet) === 0">Acheter</button>
      </li>
    </ul>
  </section>
  <section>
    <h2>Billets 2 jours</h2>
    <ul>
      <li v-for="billet in billets2Jours" :key="billet.nom">
        {{ billet.nom }} - {{ billet.prix }}€ ({{ getQuantiteRestante(billet) }} disponibles)
        <button @click="acheter(billet.nom)" :disabled="getQuantiteRestante(billet) === 0">Acheter</button>
      </li>
    </ul>
  </section>
  <section>
    <h2>Billets 3 jours</h2>
    <ul>
      <li v-for="billet in billets3Jours" :key="billet.nom">
        {{ billet.nom }} - {{ billet.prix }}€ ({{ getQuantiteRestante(billet) }} disponibles)
        <button @click="acheter(billet.nom)" :disabled="getQuantiteRestante(billet) === 0">Acheter</button>
      </li>
    </ul>
  </section>
  <section>
    <h2>Billets 4 jours</h2>
    <ul>
      <li v-for="billet in billets4Jours" :key="billet.nom">
        {{ billet.nom }} - {{ billet.prix }}€ ({{ getQuantiteRestante(billet) }} disponibles)
        <button @click="acheter(billet.nom)" :disabled="getQuantiteRestante(billet) === 0">Acheter</button>
      </li>
    </ul>
  </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');

h1 {
  font-family: "JetBrains Mono", "JetBrains Mono Fallback", monospace;
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 2.5rem;
  text-align: center;
}

section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2.5rem;
}

h2 {
  font-family: "JetBrains Mono", "JetBrains Mono Fallback", monospace;
  font-size: 1.4rem;
  color: #34495e;
  margin-bottom: 1.2rem;
  text-align: center;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  max-width: 600px;
  width: 100%;
}

li {
  font-family: "JetBrains Mono", "JetBrains Mono Fallback", monospace;
  background: #f5f7fa;
  color: #2c3e50;
  margin-bottom: 1rem;
  padding: 1rem 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(44, 62, 80, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

button {
  font-family: "JetBrains Mono", "JetBrains Mono Fallback", monospace;
  background: #2c3e50;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover:not([disabled]) {
  background: #34495e;
}

button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>



