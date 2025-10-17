// SAE/src/services/billetterie.service.js
import { billets } from "@/datasource/data_billetterie.js";

class BilletterieService {
    async getBilletterie() {
        return { error: 0, data: billets };
    }

    async acheterBillet(nom) {
        const allBillets = Object.values(billets).flat();
        const billet = allBillets.find(b => b.nom === nom);

        if (!billet || billet.quantite <= 0) {
            return { error: 1, message: "Billet épuisé" };
        }

        let billetsModifies = [];

        // Décrémentation du billet acheté
        if (billet.jours.length === 1) {
            billet.quantite--;
            billetsModifies.push({ nom: billet.nom, quantite: billet.quantite });
        } else {
            // Décrémenter les billets 1 jour correspondants
            billet.jours.forEach(jour => {
                const b1j = allBillets.find(b => b.jours.length === 1 && b.jours[0] === jour);
                if (b1j && b1j.quantite > 0) {
                    b1j.quantite--;
                    billetsModifies.push({ nom: b1j.nom, quantite: b1j.quantite });
                }
            });
        }

        allBillets.forEach(b => {
            if (b.jours.length > 1) {
                const quantiteMin = Math.min(
                    ...b.jours.map(jour => {
                        const b1j = allBillets.find(bj => bj.jours.length === 1 && bj.jours[0] === jour);
                        return b1j ? b1j.quantite : 0;
                    })
                );
                b.quantite = quantiteMin;
                billetsModifies.push({ nom: b.nom, quantite: b.quantite });
            }
        });

        billetsModifies = Object.values(
            billetsModifies.reduce((acc, curr) => {
                acc[curr.nom] = curr;
                return acc;
            }, {})
        );

        return { error: 0, data: billetsModifies };
    }
}

export default new BilletterieService();
