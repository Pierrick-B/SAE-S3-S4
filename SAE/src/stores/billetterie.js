// SAE/src/stores/billetterie.js
import { defineStore } from 'pinia'
import BilletterieService from "@/services/billetterie.service.js";

export const useBilletterieStore = defineStore('billetterie', {
    state: () => ({
        billets: {},
    }),
    actions: {
        async fetchBilletterie() {
            let response = await BilletterieService.getBilletterie()
            if (response.error === 0) {
                this.billets = JSON.parse(JSON.stringify(response.data))
            }
        },
        async acheterBillet(nom) {
            let response = await BilletterieService.acheterBillet(nom)
            if (response.error === 0) {
                response.data.forEach(update => {
                    for (const key of Object.keys(this.billets)) {
                        const billet = this.billets[key].find(b => b.nom === update.nom)
                        if (billet) billet.quantite = update.quantite
                    }
                })
                this.billets = { ...this.billets }
            }
        }
    },
})
