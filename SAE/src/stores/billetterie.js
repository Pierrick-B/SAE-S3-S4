// SAE/src/stores/billetterie.js
import { defineStore } from 'pinia'
import BilletterieService from "@/services/billetterie.service.js";

export const useBilletterieStore = defineStore('billetterie', {
    state: () => ({
        billets: [],
    }),
    actions: {
        async fetchBilletterie() {
            let response = await BilletterieService.getBilletterie()
            if (response.error === 0) {
                this.billets = response.data
            }
        },
        async acheterBillet(nom) {
            let response = await BilletterieService.acheterBillet(nom)
            if (response.error === 0) {
                const billet = this.billets.find(b => b.nom === nom)
                if (billet) {
                    billet.quantite = response.data.quantite
                }
            }
        }
    },
})
