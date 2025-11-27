<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useStandsStore } from '@/stores/stands.js'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const standsStore = useStandsStore()

const standId = route.params.standId
const isLoading = ref(true)
const stand = ref(null)
const errorMessage = ref(null)
const isProcessing = ref(false)

onMounted(async () => {
  await standsStore.fetchStands()
  stand.value = standsStore.stands.find(s => s.id === standId)
  
  if (!stand.value) {
    errorMessage.value = t('organisateur.standNotFound')
  } else if (stand.value.statut !== 'demande') {
    errorMessage.value = t('organisateur.noRequestPending')
  }
  
  isLoading.value = false
})

async function handleApprove() {
  if (isProcessing.value) return
  
  isProcessing.value = true
  const response = await standsStore.approveRequest(standId)
  
  if (response.error === 0) {
    router.push({ name: 'organisateur' })
  } else {
    errorMessage.value = response.message
    isProcessing.value = false
  }
}

async function handleReject() {
  if (isProcessing.value) return
  
  isProcessing.value = true
  const response = await standsStore.rejectRequest(standId)
  
  if (response.error === 0) {
    router.push({ name: 'organisateur' })
  } else {
    errorMessage.value = response.message
    isProcessing.value = false
  }
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
            <span class="status-badge status-pending">{{ $t('organisateur.pending') }}</span>
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

          <div v-if="stand.demande" class="request-info">
            <h3>{{ $t('organisateur.requestDetails') }}</h3>
            
            <div class="info-row">
              <span class="label">{{ $t('organisateur.requestFrom') }}:</span>
              <span class="value">{{ stand.demande.nom_demandeur }}</span>
            </div>
            <div class="info-row">
              <span class="label">{{ $t('organisateur.requestDate') }}:</span>
              <span class="value">{{ formatDate(stand.demande.date_demande) }}</span>
            </div>
            
            <div class="message-section">
              <span class="label">{{ $t('organisateur.message') }}:</span>
              <div class="message-content">{{ stand.demande.message }}</div>
            </div>

            <div v-if="stand.demande.prestataire_propose" class="prestataire-info">
              <h4>{{ $t('organisateur.providerDetails') }}</h4>
              <div class="info-row">
                <span class="label">{{ $t('organisateur.standName') }}:</span>
                <span class="value">{{ stand.demande.prestataire_propose.nom }}</span>
              </div>
              <div class="info-row">
                <span class="label">{{ $t('organisateur.category') }}:</span>
                <span class="value">{{ stand.demande.prestataire_propose.categorie }}</span>
              </div>
              <div class="info-row">
                <span class="label">{{ $t('organisateur.description') }}:</span>
                <span class="value">{{ stand.demande.prestataire_propose.description }}</span>
              </div>
              <div class="info-row">
                <span class="label">{{ $t('organisateur.contact') }}:</span>
                <span class="value">
                  {{ stand.demande.prestataire_propose.contact.responsable }}<br>
                  {{ stand.demande.prestataire_propose.contact.email }}<br>
                  {{ stand.demande.prestataire_propose.contact.tel }}
                </span>
              </div>
            </div>
          </div>

          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>

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

.stand-info,
.request-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.request-info {
  background: #f9fafb;
  padding: 1.5rem;
  border-radius: 12px;
}

.request-info h3 {
  font-family: "JetBrains Mono", monospace;
  font-size: 1.3rem;
  color: #1a1a1a;
  margin: 0 0 1rem 0;
}

.prestataire-info {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 2px solid #e5e7eb;
}

.prestataire-info h4 {
  font-family: "JetBrains Mono", monospace;
  font-size: 1.1rem;
  color: #1a1a1a;
  margin: 0 0 1rem 0;
}

.stand-info h3 {
  font-family: "JetBrains Mono", monospace;
  font-size: 1.3rem;
  color: #1a1a1a;
  margin: 0 0 1rem 0;
}

.info-row {
  display: flex;
  gap: 1rem;
  align-items: baseline;
}

.label {
  font-weight: 600;
  color: #4b5563;
  min-width: 140px;
}

.value {
  color: #1a1a1a;
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
