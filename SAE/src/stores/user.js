// SAE/src/stores/user.js
import { defineStore } from 'pinia'
import UserService from "@/services/user.service.js";

export const useUserStore = defineStore('user', {
    state: () => ({
        currentUser: null,
    }),
    actions: {
        async fetchUserProfile(userId) {
            let response = await UserService.getUserProfile(userId)
            if (response.error === 0) {
                this.currentUser = response.data
            }
        },
        async updateUserProfile(userId, updates) {
            let response = await UserService.updateUserProfile(userId, updates)
            if (response.error === 0) {
                this.currentUser = response.data
            }
        }
    },
})