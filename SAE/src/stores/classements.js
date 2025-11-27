import { defineStore } from 'pinia'
import ClassementService from '@/services/classement.service.js'

export const useClassementsStore = defineStore('classements', {
  state: () => ({
    individual: [],
    teams: [],
    leaderboard: [],
    userPoints: [],
    isLoading: false,
    error: null
  }),
  actions: {
    async fetchIndividual() {
      this.isLoading = true
      this.error = null
      try {
        this.individual = await ClassementService.getIndividualClassements()
      } catch (err) {
        this.error = 'Impossible de charger les classements individuels'
      }
      this.isLoading = false
    },
    async fetchTeams() {
      this.isLoading = true
      this.error = null
      try {
        this.teams = await ClassementService.getTeamClassements()
      } catch (err) {
        this.error = 'Impossible de charger les classements équipes'
      }
      this.isLoading = false
    },
    async fetchLeaderboard() {
      this.isLoading = true
      this.error = null
      try {
        this.leaderboard = await ClassementService.getLeaderboard()
        this.userPoints = await ClassementService.getUserPoints()
      } catch (err) {
        this.error = 'Impossible de charger le leaderboard'
      }
      this.isLoading = false
    }
  }
})
