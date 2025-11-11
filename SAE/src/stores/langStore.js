import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

export const useLangStore = defineStore('lang', () => {
    const { locale } = useI18n()

    const language = computed(() => locale.value)

    function toggleLanguage() {
        locale.value = locale.value === 'fr' ? 'en' : 'fr'
    }

    return {
        language,
        toggleLanguage
    }
})
