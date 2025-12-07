<template>
  <div class="gerer-presta">
    <h1>Gérer les prestataires (admin)</h1>

    <!-- Section demandes (admin) -->
    <section class="requests" v-if="isAdmin">
      <h2>Demandes de devenir prestataire</h2>
      <div v-if="requestsLoading">Chargement des demandes...</div>
      <ul v-else>
        <li v-for="r in requests" :key="r.id" class="request-item">
          <div class="left">
            <strong>Demande #{{ r.id }} — Utilisateur {{ getUserName(r.userId) || r.userId }}</strong>
            <div class="meta">Services demandés: {{ r.services.join(', ') }}</div>
            <div class="meta">Description: {{ r.description }}</div>
            <div class="meta">Soumise le: {{ r.createdAt }}</div>
          </div>
          <div class="right">
            <button class="btn-approve" @click="onApprove(r.id)">Accepter</button>
            <button class="btn-reject" @click="onReject(r.id)">Refuser</button>
          </div>
        </li>
        <li v-if="requests.length === 0">Aucune demande en attente.</li>
      </ul>
    </section>

    <!-- Section création prestataire: bouton pour afficher le formulaire -->
    <section class="create">
      <h2>Créer prestataire</h2>
      <div v-if="!showCreateForm">
        <button @click="showCreateForm = true" class="btn-primary">Créer prestataire</button>
      </div>

      <div v-else>
        <div class="form-row">
          <label>Nom</label>
          <input v-model="form.name" type="text" />
        </div>
        <div class="form-row">
          <label>Email</label>
          <input v-model="form.email" type="email" />
        </div>
        <div class="form-row">
          <label>Login</label>
          <input v-model="form.login" type="text" />
        </div>
        <div class="form-row">
          <label>Mot de passe</label>
          <input v-model="form.password" type="password" />
        </div>
        <div style="margin-top:8px">
          <button @click="onCreate" class="btn-primary">Valider création</button>
          <button @click="showCreateForm = false" class="btn-cancel">Annuler</button>
        </div>
      </div>
    </section>

    <section class="list">
      <h2>Prestataires existants</h2>

      <div v-if="loading">Chargement...</div>
      <ul v-else>
        <li v-for="p in prestataires" :key="p.id" class="prestataire-item">
          <div class="left">
            <strong>{{ p.name || '(sans nom)' }}</strong>
            <div class="meta">{{ p.login }} - {{ p.email }}</div>
          </div>
          <div class="right">
            <button @click="onDelete(p.id)" class="btn-danger">Supprimer</button>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user.js'

const router = useRouter()
const userStore = useUserStore()

const prestataires = computed(() => userStore.prestataires)
const loading = computed(() => userStore.prestatairesLoading)
const requests = computed(() => userStore.prestataireRequests)
const requestsLoading = computed(() => userStore.requestsLoading)
const form = ref({ name: '', email: '', login: '', password: '' })
const showCreateForm = ref(false)

const isAdmin = computed(() => !!userStore.currentUser && userStore.currentUser.role === 'admin')

function getUserName(userId) {
  // essayer de trouver le nom dans la liste des prestataires ou parmi les users chargés
  const p = (userStore.prestataires || []).find(x => Number(x.id) === Number(userId))
  if (p) return p.name
  return null
}

async function onCreate() {
  const payload = { ...form.value }
  const res = await userStore.createPrestataire(payload)
  if (res && res.error === 0) {
    form.value = { name: '', email: '', login: '', password: '' }
    showCreateForm.value = false
    await userStore.loadPrestataires()
    alert('Prestataire créé')
  } else {
    alert(res.message || 'Erreur lors de la création')
  }
}

async function onDelete(id) {
  if (!confirm('Confirmer la suppression du prestataire ?')) return
  const res = await userStore.deletePrestataire(id)
  if (res && res.error === 0) {
    await userStore.loadPrestataires()
    alert('Prestataire supprimé')
  } else {
    alert(res.message || 'Erreur lors de la suppression')
  }
}

async function onApprove(requestId) {
  if (!confirm('Accepter cette demande ?')) return
  const res = await userStore.approvePrestataireRequest(requestId)
  if (res && res.error === 0) {
    alert('Demande acceptée. Le rôle de l\'utilisateur a été mis à jour.')
  } else {
    alert(res.message || 'Erreur lors de l\'acceptation')
  }
}

async function onReject(requestId) {
  if (!confirm('Refuser cette demande ?')) return
  const res = await userStore.rejectPrestataireRequest(requestId)
  if (res && res.error === 0) {
    alert('Demande refusée')
  } else {
    alert(res.message || 'Erreur lors du refus')
  }
}

// protection & chargement : attendre que userStore.currentUser soit initialisé
if (userStore.currentUser) {
  if (userStore.currentUser.role === 'admin') {
    userStore.loadPrestataires()
    userStore.loadPrestataireRequests()
  } else {
    router.push('/')
  }
} else {
  // watch for login
  watch(() => userStore.currentUser, (val) => {
    if (!val) return
    if (val.role === 'admin') {
      userStore.loadPrestataires()
      userStore.loadPrestataireRequests()
    } else {
      router.push('/')
    }
  })
}
</script>

<style scoped>
.gerer-presta {
  font-family: "JetBrains Mono", monospace;
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
}
.create {
  background: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  margin-bottom: 20px;
}
.requests { margin-bottom: 20px }
.request-item { display:flex; justify-content:space-between; padding:12px; border:1px solid #eee; border-radius:6px; margin-bottom:8px }
.btn-approve { background:#28a745; color:#fff; border:none; padding:6px 10px; border-radius:4px; margin-right:8px }
.btn-reject { background:#dc3545; color:#fff; border:none; padding:6px 10px; border-radius:4px }
.form-row { display:flex; flex-direction:column; margin-bottom:8px }
.form-row label { font-weight:600; margin-bottom:4px }
.form-row input { padding:8px; border:1px solid #ddd; border-radius:4px }
.btn-primary { background:#007bff; color:#fff; border:none; padding:8px 12px; border-radius:4px; cursor:pointer }
.btn-cancel { background:#6c757d; color:#fff; border:none; padding:8px 12px; border-radius:4px; margin-left:8px }
.list ul { list-style:none; padding:0 }
.prestataire-item { display:flex; justify-content:space-between; align-items:center; padding:10px 8px; border-bottom:1px solid #eee }
.btn-danger { background:#dc3545; color:#fff; border:none; padding:6px 10px; border-radius:4px; cursor:pointer }
.meta { color:#666; font-size:13px }
</style>
