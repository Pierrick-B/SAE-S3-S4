<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import UserService from '@/services/user.service.js'
import { useUserStore } from '@/stores/user.js'

const { t } = useI18n()
const router = useRouter()
const userStore = useUserStore()

const name = ref('')
const email = ref('')
const login = ref('')
const password = ref('')
// role is not selectable at registration: default to 'client'
const role = 'client'
const error = ref('')
const loading = ref(false)

async function submit() {
  error.value = ''
  loading.value = true
  try {
    const payload = { name: name.value, email: email.value, login: login.value, password: password.value, role: role }
    // create locally in service (localStorage)
    const res = await UserService.createUser(payload)
    if (res.error !== 0) {
      error.value = res.message || 'Erreur lors de l\'inscription'
      return
    }
    const newUser = res.data

    // attempt to persist to src/datasource/data_users.js via dev endpoint (vite)
    try {
      await fetch('/__add-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      })
    } catch (e) {
      // ignore dev-write errors
      console.warn('Dev write failed', e)
    }

    userStore.setCurrentUser(newUser)
    router.push({ name: 'profile', params: { userId: newUser.id } })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="register-page">
    <h1>{{ t('register') || 'Inscription' }}</h1>
    <form @submit.prevent="submit" class="register-form">
      <label>
        {{ t('name') || 'Nom' }}
        <input type="text" v-model="name" required />
      </label>

      <label>
        {{ t('email') || 'Email' }}
        <input type="email" v-model="email" required />
      </label>

      <label>
        {{ t('login') || 'Login' }}
        <input type="text" v-model="login" required />
      </label>

      <label>
        {{ t('password') || 'Mot de passe' }}
        <input type="password" v-model="password" required />
      </label>

      <!-- role selection removed: new accounts are clients by default -->

      <div class="actions">
        <button type="submit" class="login-btn" :disabled="loading">{{ t('register') || 'S\'inscrire' }}</button>
      </div>

      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<style scoped>
.register-page { max-width: 520px; margin: 2rem auto; padding:1.5rem; background:#fff; border-radius:10px; box-shadow:0 6px 24px rgba(0,0,0,0.04) }
.register-form { display:flex; flex-direction:column; gap:1rem }
label { display:flex; flex-direction:column; font-weight:600; text-transform: capitalize }
input, select { padding:0.6rem 0.8rem; border-radius:6px; border:1px solid #ddd; font-family: Titillium, Arial, sans-serif }
.actions { display:flex; justify-content:flex-end }
button { padding:0.6rem 1rem; border-radius:999px; border:none; background:#1a1a1a; color:#fff }
.error { color:#b00020 }

/* Title and page font consistent with site */
.register-page { font-family: Titillium, Arial, sans-serif; color: #2c3e50 }
.register-page h1 { font-family: "JetBrains Mono", "JetBrains Mono Fallback", monospace; font-size: 1.6rem; margin-bottom: 0.6rem }

/* Reuse login button styling and force uppercase */
.login-btn {
  background: #1a1a1a;
  color: #ffffff;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 50px;
  font-family: "JetBrains Mono", "JetBrains Mono Fallback", monospace;
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  text-transform: uppercase;
}
.login-btn:hover {
  background: #333;
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}
.login-btn:active {
  transform: translateY(0);
}
</style>
