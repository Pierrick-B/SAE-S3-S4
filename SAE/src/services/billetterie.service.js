// SAE/src/services/billetterie.service.js
import { billets } from "@/datasource/data_billetterie.js";

class BilletterieService {
    async getBilletterie() {
        return { error: 0, data: billets };
    }

    async acheterBillet(nom) {
        const billet = billets.find(b => b.nom === nom);
        if (!billet || billet.quantite <= 0) {
            return { error: 1, message: "Billet épuisé" };
        }
        billet.quantite--;
        let billetsModifies = [{ nom: billet.nom, quantite: billet.quantite }];
        if (billet.jours && billet.jours.length > 1) {
            billets
                .filter(b => b.jours?.length === 1 && billet.jours.some(j => b.jours[0] === j))
                .forEach(b1j => {
                    if (b1j.quantite > 0) b1j.quantite--;
                    billetsModifies.push({ nom: b1j.nom, quantite: b1j.quantite });
                });
        }

        return { error: 0, data: billetsModifies };
    }
}

export default new BilletterieService();
