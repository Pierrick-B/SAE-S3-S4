<script setup>
import { useI18n } from 'vue-i18n'
import { onMounted, computed, onUnmounted } from 'vue'
import { useBilletterieStore } from '@/stores/billetterie.js'
import billetterieService from '@/services/billetterie.service.js'
import panierService from '@/services/panier.service.js'
import { useRoute, useRouter } from 'vue-router'

const { t } = useI18n()
const billetterie = useBilletterieStore()
const route = useRoute()
const router = useRouter()

// selectedType est lu depuis la query `type` : ex. ?type=billets1Jour
const selectedType = computed(() => route.query.type || '')

// charger les données au chargement du composant
onMounted(() => {
  billetterie.fetchBilletterie()
})

// rafraîchir quand le panier modifie le stock ailleurs
const _onBilletterieUpdated = () => {
  billetterie.fetchBilletterie()
}
window.addEventListener('billetterie-updated', _onBilletterieUpdated)
onUnmounted(() => window.removeEventListener('billetterie-updated', _onBilletterieUpdated))

function setFilter(type) {
  try {
    router.push({ name: 'billetterie', query: { type } })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (e) { console.error(e) }
}

function clearFilter() {
  try { router.push({ name: 'billetterie' }); window.scrollTo({ top: 0, behavior: 'smooth' }) } catch(e) {}
}
</script>

<template>
  <h1>{{ $t('billetterieTitle') }}</h1>
  <div v-if="selectedType" class="filter-info">
    <small>{{ $t('filtre') || 'Filtre' }} : <strong>{{ $t(selectedType) || selectedType }}</strong></small>
    <button class="clear-filter" @click="clearFilter">{{ $t('voir_tous') || 'Voir tous' }}</button>
  </div>
  <section v-if="!selectedType || selectedType === 'billets1Jour'">
    <h2><button class="section-btn" @click.prevent="setFilter('billets1Jour')">{{ $t('billets1Jour') }}</button></h2>
    <ul>
      <li v-for="billet in (billetterie.billets.billets1Jour || [])" :key="billet.nom">
        {{ billet.nom }} - {{ billet.prix }}€ ({{ billetterieService.getQuantiteRestante(billet) }} {{ $t('disponibles') }})
        <button @click="billetterieService.acheter(billet.nom).then(response => {
          if (response.error === 0)
          { billetterie.fetchBilletterie();
          panierService.ajouterItem({ id: billet.nom, nom: billet.nom, prix: billet.prix, quantite: 1 }); }
          else
          { alert(response.message || 'Erreur lors de l\'achat') } }).catch(() => alert('Erreur réseau'))" :disabled="billetterieService.getQuantiteRestante(billet) === 0">{{ $t('acheter') }}</button>
      </li>
    </ul>
  </section>
  <section v-if="!selectedType || selectedType === 'billets2Jours'">
    <h2><button class="section-btn" @click.prevent="setFilter('billets2Jours')">{{ $t('billets2Jours') }}</button></h2>
    <ul>
      <li v-for="billet in (billetterie.billets.billets2Jours || [])" :key="billet.nom">
        {{ billet.nom }} - {{ billet.prix }}€ ({{ billetterieService.getQuantiteRestante(billet) }} {{ $t('disponibles') }})
        <button @click="billetterieService.acheter(billet.nom).then(response => { if (response.error === 0) { billetterie.fetchBilletterie(); panierService.ajouterItem({ id: billet.nom, nom: billet.nom, prix: billet.prix, quantite: 1 }); } else { alert(response.message || 'Erreur lors de l\'achat') } }).catch(() => alert('Erreur réseau'))" :disabled="billetterieService.getQuantiteRestante(billet) === 0">{{ $t('acheter') }}</button>
      </li>
    </ul>
  </section>
  <section v-if="!selectedType || selectedType === 'billets3Jours'">
    <h2><button class="section-btn" @click.prevent="setFilter('billets3Jours')">{{ $t('billets3Jours') }}</button></h2>
    <ul>
      <li v-for="billet in (billetterie.billets.billets3Jours || [])" :key="billet.nom">
        {{ billet.nom }} - {{ billet.prix }}€ ({{ billetterieService.getQuantiteRestante(billet) }} {{ $t('disponibles') }})
        <button @click="billetterieService.acheter(billet.nom).then(response => { if (response.error === 0) { billetterie.fetchBilletterie(); panierService.ajouterItem({ id: billet.nom, nom: billet.nom, prix: billet.prix, quantite: 1 }); } else { alert(response.message || 'Erreur lors de l\'achat') } }).catch(() => alert('Erreur réseau'))" :disabled="billetterieService.getQuantiteRestante(billet) === 0">{{ $t('acheter') }}</button>
      </li>
    </ul>
  </section>
  <section v-if="!selectedType || selectedType === 'billets4Jours'">
    <h2><button class="section-btn" @click.prevent="setFilter('billets4Jours')">{{ $t('billets4Jours') }}</button></h2>
    <ul>
      <li v-for="billet in (billetterie.billets.billets4Jours || [])" :key="billet.nom">
        {{ billet.nom }} - {{ billet.prix }}€ ({{ billetterieService.getQuantiteRestante(billet) }} {{ $t('disponibles') }})
        <button @click="billetterieService.acheter(billet.nom).then(response => { if (response.error === 0) { billetterie.fetchBilletterie(); panierService.ajouterItem({ id: billet.nom, nom: billet.nom, prix: billet.prix, quantite: 1 }); } else { alert(response.message || 'Erreur lors de l\'achat') } }).catch(() => alert('Erreur réseau'))" :disabled="billetterieService.getQuantiteRestante(billet) === 0">{{ $t('acheter') }}</button>
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

.filter-info {
  display:flex;
  justify-content:center;
  align-items:center;
  gap:0.75rem;
  margin-bottom:12px;
}
.clear-filter {
  background: transparent;
  border: 1px solid rgba(26,26,26,0.08);
  padding: 6px 10px;
  border-radius: 8px;
  cursor: pointer;
}
.section-btn {
  background: transparent;
  border: none;
  font-family: "JetBrains Mono", monospace;
  font-weight: 700;
  font-size: 1.2rem;
  color: #34495e;
  cursor: pointer;
}
.section-btn:hover { color: #111; text-decoration: underline; }

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
