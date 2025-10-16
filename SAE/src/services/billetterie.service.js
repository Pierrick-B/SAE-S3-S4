// SAE/src/services/billetterie.service.js
import LocalSource from "@/services/localsource.service.js";

async function getBilletterieFromLocalSource() {
    return LocalSource.getBilletterie()
}

async function getBilletterie() {
    let response = null;
    try {
        response = await LocalSource.getBilletterie()
    }
    catch(err) {
        response = {error: 1, status: 404, data: 'erreur réseau, impossible de se loguer'  }
    }
    return response
}

async function acheterBillet(nom) {
    const response = await getBilletterieFromLocalSource();
    const billets = response.data;

    const billet = billets.find(b => b.nom === nom);
    if (billet && billet.quantite > 0) {
        billet.quantite--;
        localStorage.setItem('billets', JSON.stringify(billets));
        return { error: 0, data: billet };
    }
    return { error: 1, data: 'Billet épuisé ou introuvable' };
}


export default {
    getBilletterie,
    acheterBillet
}
