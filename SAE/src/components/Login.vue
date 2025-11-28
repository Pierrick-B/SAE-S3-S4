<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user.js'
import { users as initialUsers } from '@/datasource/data_users.js'

const { t } = useI18n()
const router = useRouter()
const userStore = useUserStore()

const login = ref('')
const password = ref('')
const error = ref('')

const LS_KEY = 'userDataV2'

function _loadUsers() {
	try {
		const raw = localStorage.getItem(LS_KEY)
		if (raw) {
			const stored = JSON.parse(raw)
			if (Array.isArray(stored)) {
				// merge defaults with stored users, but keep stored as authoritative for new accounts
				const merged = [...initialUsers]
				for (const s of stored) {
					if (!merged.some(m => m.login === s.login)) merged.push(s)
				}
				return merged
			}
			// if stored is malformed, ignore it and fall back to defaults
		}
	} catch (e) {}
	return initialUsers
}

function submit() {
	error.value = ''
	const allUsers = _loadUsers()
	const found = allUsers.find(u => u.login === login.value && u.password === password.value)
	if (!found) {
		error.value = t('loginInvalid') || 'Login ou mot de passe invalide'
		return
	}

	// set current user in the store
	userStore.currentUser = found
	// persist current user id for simple session
	try { localStorage.setItem('currentUserId', String(found.id)) } catch (e) {}

	// redirect depending on role (simple logic)
	if (found.role === 'admin') {
		router.push({ name: 'accueil' })
	} else {
		router.push({ name: 'profile', params: { userId: found.id } })
	}
}
</script>

<template>
	<div class="login-page">
		<h1>{{ t('login') }}</h1>
		<form @submit.prevent="submit" class="login-form">
			<label>
				{{ t('login') }}
				<input type="text" v-model="login" placeholder="login" required />
			</label>

			<label>
				{{ t('password') }}
				<input type="password" v-model="password" placeholder="******" required />
			</label>

			<div class="actions">
				<button type="submit" class="login-btn">{{ t('login') }}</button>
			</div>

			<p class="small-link">{{ t('noAccount') || "Pas de compte ?" }} <router-link class="login-btn" :to="{ name: 'register' }">{{ t('register') || 'Inscription' }}</router-link></p>
			<p v-if="error" class="error">{{ error }}</p>
		</form>
	</div>
</template>

<style scoped>
.login-page {
	max-width: 420px;
	margin: 2rem auto;
	padding: 1.5rem;
	background: #fff;
	border-radius: 10px;
	box-shadow: 0 4px 20px rgba(0,0,0,0.05);
	/* body font consistent with site */
	font-family: Titillium, Arial, sans-serif;
	color: #2c3e50;
}
.login-form {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}
label { display: flex; flex-direction: column; font-weight: 600; text-transform: capitalize; }
input { padding: 0.6rem 0.8rem; border-radius: 6px; border: 1px solid #ddd; font-family: Titillium, Arial, sans-serif; }
.actions { display:flex; justify-content:flex-end; }
.login-btn { padding: 0.6rem 1rem; border-radius: 999px; border: none; background:#1a1a1a; color:#fff; text-transform: uppercase; }
.error { color: #b00020; margin-top: 0.6rem }

/* Title uses monospace as elsewhere */
.login-page h1 { font-family: "JetBrains Mono", "JetBrains Mono Fallback", monospace; font-size: 1.6rem; margin-bottom: 0.6rem; }

/* small inline register link - keep button look but smaller spacing */
.small-link { display:flex; align-items:center; gap:0.6rem; }
.small-link .login-btn { padding: 0.4rem 0.8rem; font-size: 0.85rem; border-radius: 999px; }
</style>
