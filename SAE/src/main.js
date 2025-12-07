import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

import App from './App.vue'
import router from './router'

import fr from './locales/fr.json'
import en from './locales/en.json'

import OpenLayersMap from "vue3-openlayers";
import './styles/global.css'
import { useUserStore } from '@/stores/user.js'

const messages = {
  fr,
  en
}

const i18n = createI18n({
  locale: 'fr', // langue par défaut
  fallbackLocale: 'en',
  messages
})

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)

const userStore = useUserStore(pinia)
userStore.hydrateSession()

app.use(router)
app.use(i18n)
app.use(OpenLayersMap);

app.mount('#app')
