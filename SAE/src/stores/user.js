// SAE/src/stores/user.js
import { defineStore } from 'pinia'
import UserService from "@/services/user.service.js";

const SESSION_KEY = 'currentUserId'

export const useUserStore = defineStore('user', {
    state: () => ({
        currentUser: null,
        // état pour la gestion des prestataires via l'UI admin
        prestataires: [],
        prestatairesLoading: false,
        // état pour les demandes de prestataire
        prestataireRequests: [],
        requestsLoading: false,
        sessionHydrated: false,
    }),
    actions: {
        setCurrentUser(user, { persist = true } = {}) {
            this.currentUser = user ? { ...user } : null
            if (!persist) {
                return
            }
            if (typeof window === 'undefined' || !window.localStorage) {
                return
            }
            try {
                if (user) {
                    window.localStorage.setItem(SESSION_KEY, String(user.id))
                } else {
                    window.localStorage.removeItem(SESSION_KEY)
                }
            } catch (error) {
                console.warn('Impossible de persister la session', error)
            }
        },
        clearSession() {
            this.setCurrentUser(null)
        },
        async hydrateSession() {
            if (this.sessionHydrated) {
                return this.currentUser
            }
            this.sessionHydrated = true
            let storedId = null
            try {
                if (typeof window !== 'undefined' && window.localStorage) {
                    storedId = window.localStorage.getItem(SESSION_KEY)
                }
            } catch (error) {
                console.warn('Lecture de session impossible', error)
            }
            if (!storedId) {
                this.currentUser = null
                return null
            }
            const response = await UserService.getUserProfile(storedId)
            if (response.error === 0) {
                this.currentUser = response.data
                return response.data
            }
            this.clearSession()
            return null
        },
        async fetchUserProfile(userId) {
            let response = await UserService.getUserProfile(userId)
            if (response.error === 0) {
                const shouldPersist = this.currentUser && Number(this.currentUser.id) === Number(userId)
                this.setCurrentUser(response.data, { persist: shouldPersist })
            }
        },
        async updateUserProfile(userId, updates) {
            let response = await UserService.updateUserProfile(userId, updates)
            if (response.error === 0) {
                const shouldPersist = this.currentUser && Number(this.currentUser.id) === Number(userId)
                this.setCurrentUser(response.data, { persist: shouldPersist })
            }
        },

        // --- gestion des demandes de prestataire ---
        async loadPrestataireRequests() {
            this.requestsLoading = true
            try {
                const res = await UserService.listPrestataireRequests()
                if (res && res.error === 0) {
                    this.prestataireRequests = res.data || []
                } else {
                    this.prestataireRequests = []
                }
            } catch (e) {
                this.prestataireRequests = []
            } finally {
                this.requestsLoading = false
            }
        },

        async submitPrestataireRequest(userId, services, description) {
            try {
                const res = await UserService.submitPrestataireRequest(userId, services, description)
                if (res && res.error === 0) {
                    this.prestataireRequests.push(res.data)
                    return { error: 0, data: res.data }
                }
                return res
            } catch (e) {
                return { error: 1, message: String(e) }
            }
        },

        async approvePrestataireRequest(requestId) {
            try {
                const res = await UserService.approvePrestataireRequest(requestId)
                if (res && res.error === 0) {
                    // reload prestataires and requests
                    await this.loadPrestataires()
                    await this.loadPrestataireRequests()
                    return { error: 0, data: res.data }
                }
                return res
            } catch (e) {
                return { error: 1, message: String(e) }
            }
        },

        async rejectPrestataireRequest(requestId) {
            try {
                const res = await UserService.rejectPrestataireRequest(requestId)
                if (res && res.error === 0) {
                    // reload requests
                    await this.loadPrestataireRequests()
                    return { error: 0, data: res.data }
                }
                return res
            } catch (e) {
                return { error: 1, message: String(e) }
            }
        },

        async getRequestsForUser(userId) {
            try {
                const res = await UserService.getRequestsForUser(userId)
                if (res && res.error === 0) return { error: 0, data: res.data }
                return res
            } catch (e) {
                return { error: 1, message: String(e) }
            }
        },

        // --- nouvelles actions pour prestataires ---
        async loadPrestataires() {
            this.prestatairesLoading = true
            try {
                const res = await UserService.listPrestataires()
                if (res && res.error === 0) {
                    this.prestataires = res.data || []
                } else {
                    this.prestataires = []
                }
            } catch (e) {
                this.prestataires = []
            } finally {
                this.prestatairesLoading = false
            }
        },

        async createPrestataire(payload) {
            try {
                const res = await UserService.createUser(Object.assign({}, payload, { role: 'prestataire' }))
                if (res && res.error === 0) {
                    // mettre à jour le store
                    this.prestataires.push(res.data)
                    return { error: 0, data: res.data }
                }
                return res
            } catch (e) {
                return { error: 1, message: String(e) }
            }
        },

        async deletePrestataire(userId) {
            try {
                const res = await UserService.deleteUserById(userId)
                if (res && res.error === 0) {
                    // retirer du store
                    this.prestataires = this.prestataires.filter(p => Number(p.id) !== Number(userId))
                    return { error: 0, data: res.data }
                }
                return res
            } catch (e) {
                return { error: 1, message: String(e) }
            }
        },
    },
})