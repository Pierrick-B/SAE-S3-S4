<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useStandsStore } from '@/stores/stands.js'
import { useUserStore } from '@/stores/user.js'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const standsStore = useStandsStore()
const userStore = useUserStore()
const { currentUser } = storeToRefs(userStore)

const standId = route.params.standId
const isLoading = ref(true)
const stand = ref(null)
const errorMessage = ref(null)
const isProcessing = ref(false)
const selectedRequestId = ref(null)
const rejectReason = ref('')

const requests = computed(() => stand.value?.requests || [])
const selectedRequest = computed(() => requests.value.find((request) => request.requestId === selectedRequestId.value) || null)
const hasPendingRequest = computed(() => requests.value.some((request) => request.status === 'pending'))
const isPendingSelection = computed(() => selectedRequest.value?.status === 'pending')
const requestNeedsDetails = computed(() => selectedRequest.value?.needsDetails || selectedRequest.value?.message || '')
const requestSynopsis = computed(() => selectedRequest.value?.synopsis || selectedRequest.value?.message || '')

function hydrateStand() {
  stand.value = standsStore.stands.find((s) => s.id === standId)
  if (!stand.value) {
    errorMessage.value = t('organisateur.standNotFound')
    return
  }
  if (!stand.value.requests?.length) {
    errorMessage.value = t('organisateur.noRequestPending')
  }
  const defaultRequest = stand.value.requests?.find((request) => request.status === 'pending')
    || stand.value.requests?.[0]
  selectedRequestId.value = defaultRequest?.requestId || null
}

onMounted(async () => {
  await standsStore.fetchStands()
  hydrateStand()
  isLoading.value = false
})

watch(
  () => standsStore.stands,
  () => {
    hydrateStand()
  }
)

async function handleApprove() {
  if (!selectedRequest.value || !isPendingSelection.value) {
    return
  }
  isProcessing.value = true
  const response = await standsStore.approveRequest(standId, selectedRequest.value.requestId, {
    adminId: currentUser.value?.id
  })

  if (response.error === 0) {
    router.push({ name: 'organisateur' })
  } else {
    errorMessage.value = response.message
    isProcessing.value = false
  }
}

async function handleReject() {
  if (!selectedRequest.value || !isPendingSelection.value) {
    return
  }
  isProcessing.value = true
  const response = await standsStore.rejectRequest(standId, selectedRequest.value.requestId, {
    reason: rejectReason.value
  })

  if (response.error === 0) {
    rejectReason.value = ''
    router.push({ name: 'organisateur' })
  } else {
    errorMessage.value = response.message
    isProcessing.value = false
  }
}

function selectRequest(requestId) {
  selectedRequestId.value = requestId
  errorMessage.value = null
}

function goBack() {
  router.push({ name: 'organisateur' })
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function requestStatusLabel(status) {
  const mapping = {
    pending: t('organisateur.requestStatus.pending'),
    approved: t('organisateur.requestStatus.approved'),
    rejected: t('organisateur.requestStatus.rejected')
  }
  return mapping[status] || status
}
</script>

<template>
  <section class="page-container">
    <header class="hero">
      <div class="hero-overlay">
        <p class="kicker">{{ $t('organisateur.heroBadge') }}</p>
        <h1>{{ $t('organisateur.requestManagement') }}</h1>
        <p>{{ $t('organisateur.requestSubtitle') }}</p>
      </div>
    </header>

    <div class="content">
      <div v-if="isLoading" class="status">
        <p>{{ $t('organisateur.loading') }}</p>
      </div>

      <div v-else-if="errorMessage && !stand" class="status status-error">
        <p>{{ errorMessage }}</p>
        <button class="btn btn-secondary" @click="goBack">
          {{ $t('organisateur.backToList') }}
        </button>
      </div>

      <div v-else-if="stand" class="request-container">
        <button class="back-button" @click="goBack">
          ← {{ $t('organisateur.backToList') }}
        </button>

        <div class="request-card">
          <div class="card-header">
            <h2>{{ $t('organisateur.standDetails') }}</h2>
            <span class="status-badge" :class="hasPendingRequest ? 'status-pending' : 'status-reserved'">
              {{ hasPendingRequest ? $t('organisateur.pending') : $t('organisateur.reserved') }}
            </span>
          </div>

          <div class="stand-info">
            <h3>{{ $t('organisateur.emplacementDetails') }}</h3>
            <div class="info-row">
              <span class="label">{{ $t('organisateur.emplacementId') }}:</span>
              <span class="value">{{ stand.id }}</span>
            </div>
            <div class="info-row">
              <span class="label">{{ $t('organisateur.surface') }}:</span>
              <span class="value">{{ stand.surface_m2 }} m² ({{ stand.dimensions.largeur_m }}×{{ stand.dimensions.profondeur_m }}m)</span>
            </div>
            <div class="info-row">
              <span class="label">{{ $t('organisateur.price') }}:</span>
              <span class="value">{{ stand.tarif_emplacement_eur }} €</span>
            </div>
          </div>

          <div class="requests-wrapper">
            <div class="requests-list">
              <h3>{{ $t('organisateur.requestList') }}</h3>
              <p v-if="!requests.length" class="empty">{{ $t('organisateur.noRequestPending') }}</p>
              <ul v-else>
                <li
                  v-for="request in requests"
                  :key="request.requestId"
                  :class="['request-item', { active: request.requestId === selectedRequestId }]"
                  @click="selectRequest(request.requestId)"
                >
                  <div>
                    <strong>{{ request.prestataire?.companyName }}</strong>
                    <p>{{ formatDate(request.submittedAt) }}</p>
                  </div>
                  <span class="status-chip" :class="request.status">
                    {{ requestStatusLabel(request.status) }}
                  </span>
                </li>
              </ul>
            </div>

            <div class="request-detail" v-if="selectedRequest">
              <h3>{{ $t('organisateur.requestDetails') }}</h3>

              <div class="info-row">
                <span class="label">{{ $t('organisateur.requestFrom') }}:</span>
                <span class="value">{{ selectedRequest.prestataire?.companyName }}</span>
              </div>
              <div class="info-row">
                <span class="label">{{ $t('organisateur.requestDate') }}:</span>
                <span class="value">{{ formatDate(selectedRequest.submittedAt) }}</span>
              </div>

              <div class="info-row">
                <span class="label">{{ $t('organisateur.contact') }}:</span>
                <span class="value">
                  {{ selectedRequest.contact?.email }} · {{ selectedRequest.contact?.phone }}
                </span>
              </div>

              <div class="message-section" v-if="requestNeedsDetails">
                <span class="label">{{ $t('organisateur.needsDetails') }}:</span>
                <div class="message-content">{{ requestNeedsDetails }}</div>
              </div>

              <div class="message-section" v-if="requestSynopsis">
                <span class="label">{{ $t('organisateur.synopsis') }}:</span>
                <div class="message-content">{{ requestSynopsis }}</div>
              </div>

              <div class="info-row" v-if="selectedRequest.needs?.length">
                <span class="label">{{ $t('organisateur.needs') }}:</span>
                <span class="value">{{ selectedRequest.needs.join(', ') }}</span>
              </div>

              <div v-if="selectedRequest.status === 'rejected'" class="decision-info">
                <p>{{ selectedRequest.decisionReason }}</p>
              </div>

              <div v-if="selectedRequest.status === 'approved'" class="decision-info">
                <p>{{ $t('organisateur.decisionApproved') }}</p>
              </div>

              <div v-if="isPendingSelection" class="decision-form">
                <label>
                  {{ $t('organisateur.rejectReason') }}
                  <input v-model="rejectReason" type="text" :placeholder="$t('organisateur.rejectPlaceholder')">
                </label>

                <div class="actions">
                  <button 
                    class="btn btn-approve" 
                    @click="handleApprove"
                    :disabled="isProcessing"
                  >
                    {{ isProcessing ? $t('organisateur.processing') : $t('organisateur.approve') }}
                  </button>
                  <button 
                    class="btn btn-reject" 
                    @click="handleReject"
                    :disabled="isProcessing"
                  >
                    {{ isProcessing ? $t('organisateur.processing') : $t('organisateur.reject') }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
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
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.status {
  text-align: center;
  padding: 3rem 1.5rem;
  color: white;
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
}

.status-error {
  color: #ff6b6b;
}

.request-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.back-button {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  font-family: "JetBrains Mono", monospace;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  align-self: flex-start;
}

.back-button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateX(-4px);
}

.request-card {
  background: white;
  border-radius: 24px;
  padding: 2.5rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.card-header h2 {
  font-family: "JetBrains Mono", monospace;
  font-size: 1.8rem;
  color: #1a1a1a;
  margin: 0;
}

.status-badge {
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 500;
  color: white;
}

.status-pending {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
}

.status-reserved {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.stand-info,
.request-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.request-info {
  .requests-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
  }

  .requests-list ul {
    list-style: none;
    padding: 0;
    margin: 1rem 0 0;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .request-item {
    padding: 0.8rem 1rem;
    border-radius: 12px;
    background: #f8fafc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    border: 1px solid transparent;
  }

  .request-item.active {
    border-color: #3b82f6;
    box-shadow: 0 5px 20px rgba(59, 130, 246, 0.15);
  }

  .status-chip {
    padding: 0.3rem 0.8rem;
    border-radius: 999px;
    font-size: 0.8rem;
    color: white;
  }

  .status-chip.pending {
    background: #2563eb;
  }

  .status-chip.approved {
    background: #059669;
  }

  .status-chip.rejected {
    background: #dc2626;
  }

  .request-detail {
    background: #f9fafb;
    border-radius: 16px;
    padding: 1.5rem;
  }

  .decision-info {
    padding: 0.8rem 1rem;
    border-radius: 8px;
    background: #ecfccb;
    color: #365314;
  }

  .decision-form {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .decision-form input {
    border: 1px solid #d1d5db;
    border-radius: 10px;
    padding: 0.6rem;
  }

  .actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .btn {
    padding: 1rem 2.5rem;
    border: none;
    border-radius: 50px;
    font-family: "JetBrains Mono", monospace;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    min-width: 180px;
  }

  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .btn-approve {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
  }

  .btn-reject {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    color: white;
  }

  .btn-secondary {
    background: #6b7280;
    color: white;
  }
  flex: 1;
}

.message-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.message-content {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #3b82f6;
  color: #1a1a1a;
  line-height: 1.6;
}

.error-message {
  padding: 1rem;
  background: #fee2e2;
  color: #dc2626;
  border-radius: 8px;
  text-align: center;
  font-weight: 500;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 50px;
  font-family: "JetBrains Mono", monospace;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  min-width: 180px;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-approve {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
}

.btn-approve:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
}

.btn-reject {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
}

.btn-reject:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4);
}

.btn-secondary {
  background: #6b7280;
  color: white;
}

.btn-secondary:hover {
  background: #4b5563;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2rem;
  }

  .request-card {
    padding: 1.5rem;
  }

  .card-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .info-row {
    flex-direction: column;
    gap: 0.25rem;
  }

  .label {
    min-width: auto;
  }

  .actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
</style>
