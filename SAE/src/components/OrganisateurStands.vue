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

const stats = computed(() => {
  return {
    total: stands.value.length,
    available: stands.value.filter((stand) => stand.status === 'available').length,
    pending: stands.value.filter((stand) => stand.status === 'pending').length,
    occupied: stands.value.filter((stand) => stand.status === 'occupied').length
  }
})

onMounted(() => {
  standsStore.fetchStands()
})

function getStatusClass(status) {
  if (status === 'occupied') return 'status-reserved'
  if (status === 'pending') return 'status-pending'
  return 'status-empty'
}

function getStatusLabel(status) {
  if (status === 'occupied') return t('organisateur.reserved')
  if (status === 'pending') return t('organisateur.pending')
  return t('organisateur.empty')
}

function handleOpenRequests(stand) {
  router.push({ name: 'organisateur-demande', params: { standId: stand.id } })
}

async function handleRelease(stand) {
  await standsStore.releaseStand(stand.id)
}

function pendingCount(stand) {
  return (stand.requests || []).filter((request) => request.status === 'pending').length
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
        <div class="stats">
          <div class="stat">
            <span>{{ $t('organisateur.statTotal') }}</span>
            <strong>{{ stats.total }}</strong>
          </div>
          <div class="stat">
            <span>{{ $t('organisateur.statAvailable') }}</span>
            <strong>{{ stats.available }}</strong>
          </div>
          <div class="stat">
            <span>{{ $t('organisateur.statPending') }}</span>
            <strong>{{ stats.pending }}</strong>
          </div>
          <div class="stat">
            <span>{{ $t('organisateur.statOccupied') }}</span>
            <strong>{{ stats.occupied }}</strong>
          </div>
        </div>

        <div class="stands-grid">
          <div
            v-for="stand in stands"
            :key="stand.id"
            class="stand-card"
          >
            <div class="card-head">
              <div>
                <p class="stand-id">{{ stand.id }}</p>
                <h3>{{ stand.label }}</h3>
                <p class="stand-zone">{{ stand.zone }}</p>
              </div>
              <span class="status-pill" :class="getStatusClass(stand.status)">
                {{ getStatusLabel(stand.status) }}
              </span>
            </div>

            <p class="stand-details">
              {{ stand.surface_m2 }} m² · {{ stand.dimensions.largeur_m }} × {{ stand.dimensions.profondeur_m }} m · {{ stand.tarif_emplacement_eur }} €
            </p>

            <div class="occupant" v-if="stand.occupant">
              <p class="label">{{ $t('organisateur.currentOccupant') }}</p>
              <p class="value">{{ stand.occupant.companyName }}</p>
              <p class="subvalue">{{ stand.occupant.contact?.responsable }} · {{ stand.occupant.contact?.email }}</p>
            </div>

            <div class="requests">
              <p class="label">{{ $t('organisateur.pendingCount') }}</p>
              <p class="value">{{ pendingCount(stand) }}</p>
            </div>

            <div class="card-actions">
              <button class="btn" @click="handleOpenRequests(stand)">
                {{ $t('organisateur.viewRequest') }}
              </button>
              <button
                v-if="stand.status === 'occupied'"
                class="btn btn-secondary"
                @click="handleRelease(stand)"
              >
                {{ $t('organisateur.releaseStand') }}
              </button>
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
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.stat {
  background: #f8fafc;
  border-radius: 16px;
  padding: 1rem;
  text-align: center;
}

.stat span {
  display: block;
  color: #64748b;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
}

.stat strong {
  font-size: 2rem;
  color: #0f172a;
}

.stands-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.stand-card {
  padding: 1.5rem;
  border-radius: 18px;
  box-shadow: 0 15px 30px rgba(15, 23, 42, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card-head {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.stand-id {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.9rem;
  color: #818cf8;
  margin: 0;
}

.stand-zone {
  margin: 0;
  color: #475569;
}

.stand-details {
  margin: 0;
  color: #475569;
}

.status-pill {
  border-radius: 999px;
  padding: 0.4rem 1rem;
  font-weight: 600;
  color: white;
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

.label {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #94a3b8;
  margin-bottom: 0.3rem;
}

.value {
  margin: 0;
  font-weight: 700;
}

.subvalue {
  margin: 0.2rem 0 0;
  color: #475569;
}

.card-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn {
  border: none;
  border-radius: 50px;
  padding: 0.6rem 1.4rem;
  font-weight: 600;
  cursor: pointer;
  background: #1d4ed8;
  color: white;
}

.btn-secondary {
  background: #475569;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2rem;
  }

  .stands-grid {
    grid-template-columns: 1fr;
  }
}
</style>
