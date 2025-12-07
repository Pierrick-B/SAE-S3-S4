<template>
  <div class="request-presta">
    <h1>Demande pour devenir prestataire</h1>
    <p>Remplissez ce formulaire pour demander à devenir prestataire. Un administrateur acceptera ou refusera la demande.</p>

    <div v-if="!isClient">Vous devez être connecté en tant que client pour soumettre une demande.</div>

    <form v-else @submit.prevent="onSubmit">
      <div class="form-row">
        <label>Types de services (cochez ce qui s'applique)</label>
        <div class="checkboxes">
          <label v-for="opt in serviceOptions" :key="opt.value" class="cb">
            <input type="checkbox" :value="opt.value" v-model="selectedServices" /> {{ opt.label }}
          </label>
        </div>
      </div>

      <div class="form-row">
        <label>Description (présentez votre activité et besoins)</label>
        <textarea v-model="description" rows="6" />
      </div>

      <div class="actions">
        <button type="submit" class="btn-primary">Envoyer la demande</button>
      </div>

      <div v-if="statusMessage" class="status">{{ statusMessage }}</div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user.js'

const router = useRouter()
const userStore = useUserStore()

const serviceOptions = [
  { value: 'vente_goodies', label: 'Vente de goodies' },
  { value: 'test_jeux', label: 'Test de jeux vidéo' },
  { value: 'concours', label: 'Concours / animation' },
  { value: 'vente_nourriture', label: 'Vente alimentaire' },
]

const selectedServices = ref([])
const description = ref('')
const statusMessage = ref('')

const isClient = computed(() => !!userStore.currentUser && String(userStore.currentUser.role) === 'client')

async function onSubmit() {
  if (!isClient.value) {
    statusMessage.value = "Vous devez être connecté en tant que client pour soumettre une demande."
    return
  }
  if (selectedServices.value.length === 0) {
    statusMessage.value = 'Veuillez sélectionner au moins un type de service.'
    return
  }
  const res = await userStore.submitPrestataireRequest(userStore.currentUser.id, selectedServices.value, description.value)
  if (res && res.error === 0) {
    statusMessage.value = 'Demande envoyée — un administrateur la traitera prochainement.'
    // reset form
    selectedServices.value = []
    description.value = ''
  } else {
    statusMessage.value = res.message || 'Erreur lors de l\'envoi de la demande.'
  }
}
</script>

<style scoped>
.request-presta { font-family: "JetBrains Mono", monospace; max-width:800px; margin:20px auto; padding:16px }
.form-row { margin-bottom:12px }
.checkboxes { display:flex; flex-direction:column; gap:8px }
.cb input { margin-right:8px }
textarea { width:100%; padding:8px; border:1px solid #ddd; border-radius:4px }
.btn-primary { background:#007bff; color:#fff; border:none; padding:8px 12px; border-radius:6px }
.status { margin-top:12px; color:#2c3e50 }
</style>
