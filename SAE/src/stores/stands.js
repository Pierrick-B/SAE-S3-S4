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
    },
    
    async updateStandStatus(standId, newStatus) {
      const response = await StandsService.updateStandStatus(standId, newStatus)
      if (response.error === 0) {
        await this.fetchStands()
      }
      return response
    },

    async createStandRequest(standId, payload) {
      const response = await StandsService.createStandRequest(standId, payload)
      if (response.error === 0) {
        await this.fetchStands()
      }
      return response
    },

    async approveRequest(standId, requestId, options = {}) {
      const response = await StandsService.approveRequest(standId, requestId, options)
      if (response.error === 0) {
        await this.fetchStands()
      }
      return response
    },

    async rejectRequest(standId, requestId, options = {}) {
      const response = await StandsService.rejectRequest(standId, requestId, options)
      if (response.error === 0) {
        await this.fetchStands()
      }
      return response
    },

    async releaseStand(standId) {
      const response = await StandsService.releaseStand(standId)
      if (response.error === 0) {
        await this.fetchStands()
      }
      return response
    }
  }
})
