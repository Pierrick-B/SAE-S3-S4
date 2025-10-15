import { defineStore } from 'pinia'

export const useLangStore = defineStore('lang', {
    state: () => ({
        language: 'fr'
    }),
    actions: {
        toggleLanguage() {
            this.language = this.language === 'fr' ? 'en' : 'fr'
        }
    }
})
