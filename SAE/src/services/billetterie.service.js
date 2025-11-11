import { billets as initialBillets } from "@/datasource/data_billetterie.js";

const LS_KEY = 'billetterieData';
let billets = null;

function _clone(src) {
    return JSON.parse(JSON.stringify(src));
}

function _load() {
    if (billets) return billets;
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
        try {
            billets = JSON.parse(raw);
            return billets;
        } catch (e) {
        }
    }
    billets = _clone(initialBillets);
    _save();
    return billets;
}

function _save() {
    try {
        localStorage.setItem(LS_KEY, JSON.stringify(billets));
    } catch (e) {
        console.error('Impossible de sauvegarder billetterie dans localStorage', e);
    }
}

class BilletterieService {
    async getBilletterie() {
        return { error: 0, data: _load() };
    }

    async acheterBillet(nom) {
        const data = _load();
        const allBillets = Object.values(data).flat();
        const billet = allBillets.find(b => b.nom === nom);

        if (!billet) {
            return { error: 1, message: "Billet introuvable" };
        }

        const quantiteDisponible = billet.jours && billet.jours.length > 1
            ? Math.min(...billet.jours.map(jour => {
                const b1j = allBillets.find(b => b.jours.length === 1 && b.jours[0] === jour);
                return b1j ? b1j.quantite : 0;
            }))
            : (typeof billet.quantite === 'number' ? billet.quantite : 0);

        if (quantiteDisponible <= 0) {
            return { error: 1, message: "Billet épuisé" };
        }

        let billetsModifies = [];

        if (billet.jours.length === 1) {
            // billet 1 jour -> décrémente directement
            billet.quantite = (typeof billet.quantite === 'number' ? billet.quantite : 0) - 1;
            if (billet.quantite < 0) billet.quantite = 0;
            billetsModifies.push({ nom: billet.nom, quantite: billet.quantite });
        } else {
            billet.jours.forEach(jour => {
                const b1j = allBillets.find(b => b.jours.length === 1 && b.jours[0] === jour);
                if (b1j && typeof b1j.quantite === 'number' && b1j.quantite > 0) {
                    b1j.quantite--;
                    if (b1j.quantite < 0) b1j.quantite = 0;
                    billetsModifies.push({ nom: b1j.nom, quantite: b1j.quantite });
                }
            });
        }


        allBillets.forEach(b => {
            if (b.jours && b.jours.length > 1) {
                const quantiteMin = Math.min(
                    ...b.jours.map(jour => {
                        const b1j = allBillets.find(bj => bj.jours.length === 1 && bj.jours[0] === jour);
                        return b1j ? (typeof b1j.quantite === 'number' ? b1j.quantite : 0) : 0;
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

        _save();

        return { error: 0, data: billetsModifies };
    }
}

export default new BilletterieService();
