<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useStandsStore } from '@/stores/stands.js'

const { t } = useI18n()
const router = useRouter()
const standsStore = useStandsStore()

const stands = computed(() => standsStore.stands)
const isLoading = computed(() => standsStore.isLoading)
const errorMessage = computed(() => standsStore.error)

onMounted(() => {
  standsStore.fetchStands()
})

function getStatusClass(stand) {
  if (stand.statut === 'réservé') return 'status-reserved'
  if (stand.statut === 'demande') return 'status-pending'
  return 'status-empty'
}

function getStatusLabel(stand) {
  if (stand.statut === 'réservé') return t('organisateur.reserved')
  if (stand.statut === 'demande') return t('organisateur.pending')
  return t('organisateur.empty')
}

function handleClick(stand) {
  if (stand.statut === 'demande') {
    router.push({ name: 'organisateur-demande', params: { standId: stand.id } })
  }
}
</script>

<template>
  <section class="page-container">
    <header class="hero">
      <div class="hero-overlay">
        <p class="kicker">{{ $t('organisateur.heroBadge') }}</p>
        <h1>{{ $t('organisateur.heroTitle') }}</h1>
        <p>{{ $t('organisateur.heroSubtitle') }}</p>
      </div>
    </header>

    <div class="content">
      <div v-if="isLoading" class="status">
        <p>{{ $t('organisateur.loading') }}</p>
      </div>

      <div v-else-if="errorMessage" class="status status-error">
        <p>{{ errorMessage }}</p>
      </div>

      <div v-else class="stands-container">
        <div class="legend">
          <h2>{{ $t('organisateur.legendTitle') }}</h2>
          <div class="legend-items">
            <div class="legend-item">
              <span class="legend-color status-reserved"></span>
              <span>{{ $t('organisateur.reserved') }}</span>
            </div>
            <div class="legend-item">
              <span class="legend-color status-pending"></span>
              <span>{{ $t('organisateur.pending') }}</span>
            </div>
            <div class="legend-item">
              <span class="legend-color status-empty"></span>
              <span>{{ $t('organisateur.empty') }}</span>
            </div>
          </div>
        </div>

        <div class="stands-grid">
          <div
            v-for="stand in stands"
            :key="stand.id"
            class="stand-cell"
            :class="[getStatusClass(stand), { clickable: stand.statut === 'demande' }]"
            @click="handleClick(stand)"
          >
            <div class="stand-id">{{ stand.id }}</div>
            <div class="stand-name" v-if="stand.prestataire">
              {{ stand.prestataire.nom }}
            </div>
            <div class="stand-name" v-else-if="stand.demande?.prestataire_propose">
              {{ stand.demande.prestataire_propose.nom }}
            </div>
            <div class="stand-size" v-else>
              {{ stand.surface_m2 }} m² ({{ stand.dimensions.largeur_m }}×{{ stand.dimensions.profondeur_m }}m)
            </div>
            <div class="stand-status">{{ getStatusLabel(stand) }}</div>
            <div v-if="stand.statut === 'demande'" class="stand-action">
              {{ $t('organisateur.viewRequest') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.page-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Titillium Web', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.hero {
  padding: 3rem 1.5rem;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%);
  backdrop-filter: blur(10px);
  text-align: center;
  color: white;
}

.hero-overlay {
  max-width: 1200px;
  margin: 0 auto;
}

.kicker {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.9rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 1rem;
  opacity: 0.9;
}

.hero h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  font-family: 'Titillium Web', sans-serif;
}

.hero p {
  font-size: 1.1rem;
  opacity: 0.95;
}

.content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.status {
  text-align: center;
  padding: 3rem 1.5rem;
  color: white;
  font-size: 1.2rem;
}

.status-error {
  color: #ff6b6b;
}

.stands-container {
  background: white;
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.legend {
  margin-bottom: 2rem;
}

.legend h2 {
  font-family: "JetBrains Mono", monospace;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #1a1a1a;
}

.legend-items {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
}

.legend-color {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.stands-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.stand-cell {
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stand-cell.clickable {
  cursor: pointer;
}

.stand-cell.clickable:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.status-reserved {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.status-pending {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
}

.status-empty {
  background: linear-gradient(135deg, #9ca3af 0%, #6b7280 100%);
}

.stand-id {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.85rem;
  opacity: 0.9;
  font-weight: 500;
}

.stand-name {
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.3;
}

.stand-size {
  font-size: 0.95rem;
  font-weight: 500;
  opacity: 0.95;
}

.stand-status {
  font-size: 0.9rem;
  opacity: 0.95;
  margin-top: 0.5rem;
}

.stand-action {
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 500;
  backdrop-filter: blur(5px);
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2rem;
  }

  .stands-grid {
    grid-template-columns: 1fr;
  }

  .legend-items {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
