// SAE/src/services/gerer_presta.service.js
import { ref, watch } from 'vue'
import UserService from '@/services/user.service.js'

// fonctions bas-niveau qui délèguent à UserService
export async function listPrestataires() {
  try {
    return await UserService.listPrestataires()
  } catch (e) {
    return { error: 1, message: String(e) }
  }
}

export async function createPrestataire(payload) {
  try {
    const p = Object.assign({}, payload, { role: 'prestataire' })
    return await UserService.createUser(p)
  } catch (e) {
    return { error: 1, message: String(e) }
  }
}

export async function deletePrestataire(id) {
  try {
    return await UserService.deleteUserById(id)
  } catch (e) {
    return { error: 1, message: String(e) }
  }
}

// Hook réutilisable pour être appelé depuis le composant
export function useGererPresta(store, router) {
  const prestataires = ref([])
  const loading = ref(false)
  const form = ref({ name: '', email: '', login: '', password: '' })

  async function loadPrestataires() {
    loading.value = true
    const res = await listPrestataires()
    if (res && res.error === 0) {
      prestataires.value = res.data
    } else {
      prestataires.value = []
    }
    loading.value = false
  }

  async function onCreate() {
    const payload = { ...form.value }
    const res = await createPrestataire(payload)
    if (res && res.error === 0) {
      form.value = { name: '', email: '', login: '', password: '' }
      await loadPrestataires()
      alert('Prestataire créé')
    } else {
      alert(res.message || 'Erreur lors de la création')
    }
  }

  async function onDelete(id) {
    if (!confirm('Confirmer la suppression du prestataire ?')) return
    const res = await deletePrestataire(id)
    if (res && res.error === 0) {
      await loadPrestataires()
      alert('Prestataire supprimé')
    } else {
      alert(res.message || 'Erreur lors de la suppression')
    }
  }

  // protection plus robuste : si on appelle le hook et que l'utilisateur n'est pas encore chargé,
  // on observe `store.currentUser` et on agit lorsque la valeur est disponible.
  if (!store || !router) {
    // si pas de store/router fournis, l'appelant devra gérer la sécurité
    // ne lance pas de load automatique
    return { prestataires, loading, form, loadPrestataires, onCreate, onDelete }
  }

  // si currentUser est déjà disponible
  if (store.currentUser) {
    if (store.currentUser.role === 'admin') {
      loadPrestataires()
    } else {
      try { router.push('/') } catch (e) {}
    }
    return { prestataires, loading, form, loadPrestataires, onCreate, onDelete }
  }

  // si currentUser n'est pas encore défini, on attend son initialisation
  try {
    const stop = watch(() => store.currentUser, (val) => {
      if (!val) return
      // dès que l'utilisateur est disponible, on stoppe l'observer
      try { stop() } catch (e) {}
      if (val.role === 'admin') {
        loadPrestataires()
      } else {
        try { router.push('/') } catch (e) {}
      }
    }, { immediate: false })
  } catch (e) {
    // si le watch échoue pour une raison quelconque, on redirige par sécurité
    try { router.push('/') } catch (e) {}
  }

  return { prestataires, loading, form, loadPrestataires, onCreate, onDelete }
}
