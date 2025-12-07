<script setup>
import { computed, onMounted, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useStandsStore } from '@/stores/stands.js'
import { useUserStore } from '@/stores/user.js'

const { t } = useI18n()
const standsStore = useStandsStore()
const userStore = useUserStore()
const { currentUser } = storeToRefs(userStore)

const requestPanel = reactive({
  isOpen: false,
  standId: null,
  companyName: '',
  contactEmail: '',
  contactPhone: '',
  needsDetails: '',
  synopsis: '',
  needs: []
})

const submissionState = reactive({
  isSubmitting: false,
  feedback: null,
  isError: false
})

const logisticOptions = [
  { value: 'electricite', labelKey: 'standsPage.needElectricity' },
  { value: 'internet', labelKey: 'standsPage.needInternet' },
  { value: 'scene', labelKey: 'standsPage.needStage' },
  { value: 'eau', labelKey: 'standsPage.needWater' }
]

const isLoading = computed(() => standsStore.isLoading)
const errorMessage = computed(() => standsStore.error)
const confirmedStands = computed(() => standsStore.stands.filter((stand) => stand.status === 'occupied' && stand.occupant))
const availableStands = computed(() => standsStore.stands.filter((stand) => stand.status !== 'occupied'))
const userRole = computed(() => currentUser.value?.role || null)
const isPrestataire = computed(() => userRole.value === 'prestataire')
const selectedStand = computed(() => standsStore.stands.find((stand) => stand.id === requestPanel.standId))

function formatActivities(stand) {
  if (!stand.occupant?.activities?.length) {
    return [t('standsPage.noActivity')]
  }
  return stand.occupant.activities
}

function statusLabel(status) {
  const map = {
    available: t('standsPage.statusAvailable'),
    pending: t('standsPage.statusPending'),
    occupied: t('standsPage.statusOccupied')
  }
  return map[status] || status
}

function pendingRequests(stand) {
  return (stand.requests || []).filter((request) => request.status === 'pending')
}

function hasPendingRequestFromUser(stand) {
  if (!currentUser.value) {
    return false
  }
  return pendingRequests(stand).some((request) => request.prestataire?.id === currentUser.value.id)
}

function openRequestPanel(stand) {
  requestPanel.isOpen = true
  requestPanel.standId = stand.id
  requestPanel.companyName = currentUser.value?.name || ''
  requestPanel.contactEmail = currentUser.value?.email || ''
  requestPanel.contactPhone = ''
  requestPanel.needsDetails = ''
  requestPanel.synopsis = ''
  requestPanel.needs = []
  submissionState.feedback = null
  submissionState.isError = false
}

function closeRequestPanel() {
  requestPanel.isOpen = false
  requestPanel.standId = null
}

async function submitRequest() {
  if (!requestPanel.standId) {
    return
  }
  submissionState.isSubmitting = true
  submissionState.feedback = null
  submissionState.isError = false

  const payload = {
    prestataireId: currentUser.value?.id,
    prestataireName: currentUser.value?.name,
    companyName: requestPanel.companyName,
    category: currentUser.value?.category || 'autre',
    contactEmail: requestPanel.contactEmail,
    contactPhone: requestPanel.contactPhone,
    needsDetails: requestPanel.needsDetails,
    synopsis: requestPanel.synopsis,
    needs: [...requestPanel.needs]
  }

  const response = await standsStore.createStandRequest(requestPanel.standId, payload)
  submissionState.isSubmitting = false

  if (response.error === 0) {
    submissionState.feedback = t('standsPage.requestSuccess')
    submissionState.isError = false
    closeRequestPanel()
  } else {
    submissionState.feedback = response.message || t('standsPage.requestError')
    submissionState.isError = true
  }
}

onMounted(() => {
  standsStore.fetchStands()
})
</script>

<template>
  <section class="stands-page">
    <header class="hero">
      <div class="hero-overlay">
        <p class="kicker">{{ $t('standsPage.heroBadge') }}</p>
        <h1>{{ $t('standsPage.heroTitle') }}</h1>
        <p>{{ $t('standsPage.heroSubtitle') }}</p>
      </div>
    </header>

    <div class="content">
      <div v-if="isLoading" class="status">
        <p>{{ $t('standsPage.loading') }}</p>
      </div>

      <div v-else-if="errorMessage" class="status status-error">
        <p>{{ errorMessage }}</p>
      </div>

      <div v-else class="stands-grid">
        <article v-for="stand in confirmedStands" :key="stand.id" class="stand-card">
          <header class="card-header">
            <p class="stand-zone">{{ stand.zone }}</p>
            <h2>{{ stand.label }}</h2>
            <p class="stand-meta">{{ stand.surface_m2 }} m² — {{ stand.dimensions.largeur_m }} × {{ stand.dimensions.profondeur_m }} m</p>
          </header>

          <div class="body">
            <div class="occupant">
              <p class="label">{{ $t('standsPage.currentOccupant') }}</p>
              <p class="value">{{ stand.occupant.companyName }}</p>
              <p class="desc">{{ stand.occupant.description }}</p>
            </div>

            <div class="activities">
              <p class="label">{{ $t('standsPage.activities') }}</p>
              <div class="chips">
                <span class="chip" v-for="activity in formatActivities(stand)" :key="activity">{{ activity }}</span>
              </div>
            </div>

          </div>
        </article>
      </div>
    </div>

    <div v-if="isPrestataire && availableStands.length" class="prestataire-zone">
      <div class="content">
        <h2 class="section-title">{{ $t('standsPage.requestTitle') }}</h2>
        <div class="available-grid">
          <article v-for="stand in availableStands" :key="stand.id" class="available-card">
            <div>
              <p class="stand-zone">{{ stand.zone }}</p>
              <h3>{{ stand.label }}</h3>
              <p class="stand-meta">{{ stand.surface_m2 }} m² — {{ stand.dimensions.largeur_m }} × {{ stand.dimensions.profondeur_m }} m</p>
              <p class="subtle">{{ statusLabel(stand.status) }}</p>
            </div>

            <div class="available-actions">
              <button
                class="btn-primary"
                :disabled="hasPendingRequestFromUser(stand)"
                @click="openRequestPanel(stand)"
              >
                {{ hasPendingRequestFromUser(stand) ? $t('standsPage.requestAlreadyPending') : $t('standsPage.requestCta') }}
              </button>
              <p class="hint" v-if="pendingRequests(stand).length">
                {{ $t('standsPage.pendingCount', { count: pendingRequests(stand).length }) }}
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>

    <transition name="panel">
      <div v-if="requestPanel.isOpen" class="request-panel">
        <div class="panel-header">
          <div>
            <p class="panel-kicker">{{ $t('standsPage.requestTitle') }}</p>
            <h3>{{ selectedStand?.label || requestPanel.standId }}</h3>
          </div>
          <button class="close-button" @click="closeRequestPanel">×</button>
        </div>

        <form class="panel-form" @submit.prevent="submitRequest">
          <label>
            {{ $t('standsPage.requestCompany') }}
            <input v-model="requestPanel.companyName" type="text" required>
          </label>

          <label>
            {{ $t('standsPage.requestEmail') }}
            <input v-model="requestPanel.contactEmail" type="email" required>
          </label>

          <label>
            {{ $t('standsPage.requestPhone') }}
            <input v-model="requestPanel.contactPhone" type="text">
          </label>

          <label>
            {{ $t('standsPage.requestNeedsDetails') }}
            <textarea v-model="requestPanel.needsDetails" rows="4"></textarea>
          </label>

          <label>
            {{ $t('standsPage.requestSynopsis') }}
            <textarea v-model="requestPanel.synopsis" rows="5" required></textarea>
          </label>

          <div class="options">
            <p>{{ $t('standsPage.requestNeeds') }}</p>
            <label v-for="option in logisticOptions" :key="option.value">
              <input type="checkbox" :value="option.value" v-model="requestPanel.needs">
              {{ $t(option.labelKey) }}
            </label>
          </div>

          <button class="btn-primary" type="submit" :disabled="submissionState.isSubmitting">
            {{ submissionState.isSubmitting ? $t('standsPage.requestSubmitting') : $t('standsPage.requestSubmit') }}
          </button>

          <p v-if="submissionState.feedback" :class="['feedback', { error: submissionState.isError }]">
            {{ submissionState.feedback }}
          </p>
        </form>
      </div>
    </transition>
  </section>
</template>

<style scoped>
.stands-page {
  min-height: 100vh;
  background: #f5f7fa;
  position: relative;
}

.hero {
  width: 100%;
  min-height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 15% 20%, rgba(14, 165, 233, 0.4), transparent 55%),
    radial-gradient(circle at 85% 0%, rgba(236, 72, 153, 0.45), transparent 60%),
    linear-gradient(135deg, #020617, #0f172a);
  color: #fff;
}

.hero-overlay {
  text-align: center;
  max-width: 760px;
  padding: 2rem 3rem;
  border-radius: 24px;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(8px);
}

.hero h1 {
  font-family: "JetBrains Mono", monospace;
  font-size: clamp(2rem, 5vw, 3.3rem);
  margin-bottom: 1rem;
}

.kicker {
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-size: 0.8rem;
  margin-bottom: 0.6rem;
}

.content {
  width: min(1200px, 95%);
  margin: 2rem auto 4rem;
}

.status {
  text-align: center;
  padding: 2rem;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 15px 40px rgba(15, 23, 42, 0.08);
}

.status-error {
  color: #b91c1c;
}

.stands-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
}

.stand-card {
  background: #fff;
  border-radius: 24px;
  padding: 1.5rem 1.8rem;
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}


.card-header {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.stand-zone {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #818cf8;
  margin: 0;
}


.stand-meta {
  margin: 0;
  color: #475569;
}

.label {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #94a3b8;
  margin-bottom: 0.35rem;
}

.value {
  margin: 0;
  font-weight: 700;
  color: #0f172a;
}

.desc {
  margin: 0.3rem 0 0;
  color: #475569;
}


.subvalue {
  margin: 0.2rem 0 0;
  color: #475569;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.chip {
  background: #e0f2fe;
  color: #0369a1;
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  font-size: 0.85rem;
}

.prestataire-zone {
  background: #0f172a;
  padding: 3rem 0;
  color: white;
}

.section-title {
  margin: 0 0 1.5rem;
}

.available-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.25rem;
}

.available-card {
  background: rgba(15, 23, 42, 0.6);
  border-radius: 18px;
  padding: 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.available-actions {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.btn-primary {
  background: #2563eb;
  color: #fff;
  border: none;
  padding: 0.65rem 1.2rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.hint,
.subtle {
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
}

.request-panel {
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: min(420px, 100%);
  background: #fff;
  box-shadow: -20px 0 60px rgba(15, 23, 42, 0.2);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 30;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.panel-kicker {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.8rem;
  margin: 0;
  color: #94a3b8;
}

.panel-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.panel-form label {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-size: 0.9rem;
  font-weight: 600;
}

.panel-form input,
.panel-form textarea {
  border: 1px solid #d1d5db;
  border-radius: 10px;
  padding: 0.7rem;
  font-size: 0.95rem;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.close-button {
  border: none;
  background: transparent;
  font-size: 1.5rem;
  cursor: pointer;
}

.feedback {
  font-weight: 600;
  color: #10b981;
}

.feedback.error {
  color: #dc2626;
}

.panel-enter-from,
.panel-leave-to {
  transform: translateX(100%);
}

.panel-enter-active,
.panel-leave-active {
  transition: transform 0.3s ease;
}

@media (max-width: 768px) {
  .stands-grid {
    grid-template-columns: 1fr;
  }

}
</style>
