import { defineStore } from 'pinia'
import StandsService from '@/services/stands.service.js'

export const useStandsStore = defineStore('stands', {
  state: () => ({
    stands: [],
    isLoading: false,
    error: null
  }),
  actions: {
    async fetchStands() {
      this.isLoading = true
      this.error = null
      const response = await StandsService.getStands()
      if (response.error === 0) {
        this.stands = response.data
      } else {
        this.error = response.message || 'Impossible de récupérer les stands'
      }
      this.isLoading = false
    }
  }
})
