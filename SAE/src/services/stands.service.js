import standsData from "@/datasource/stands.js";

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

const STORAGE_KEY = 'standsDataV1';

function loadStandsFromStorage() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Erreur lors du chargement des stands depuis le localStorage', e);
    }
  }
  return clone(standsData);
}

function saveStandsToStorage(stands) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stands));
  } catch (e) {
    console.error('Erreur lors de la sauvegarde des stands dans le localStorage', e);
  }
}

// localStorage.removeItem('standsDataV1')

class StandsService {
  async getStands() {
    return { error: 0, data: loadStandsFromStorage() };
  }

  async getStandById(id) {
    const stands = await this.getStands();
    if (stands.error !== 0) {
      return stands;
    }
    const stand = stands.data.find(item => item.id === id) || null;
    if (!stand) {
      return { error: 1, message: "Stand introuvable" };
    }
    return { error: 0, data: stand };
  }

  async updateStandStatus(standId, newStatus) {
    const stands = loadStandsFromStorage();
    const stand = stands.find(s => s.id === standId);
    
    if (!stand) {
      return { error: 1, message: "Stand introuvable" };
    }

    stand.statut = newStatus;
    saveStandsToStorage(stands);
    
    return { error: 0, data: stand };
  }

  async createStandRequest(standId, userId, userName, message) {
    const stands = loadStandsFromStorage();
    const stand = stands.find(s => s.id === standId);
    
    if (!stand) {
      return { error: 1, message: "Stand introuvable" };
    }

    if (stand.statut === "réservé") {
      return { error: 1, message: "Ce stand est déjà réservé" };
    }

    if (stand.statut === "demande") {
      return { error: 1, message: "Une demande est déjà en cours pour ce stand" };
    }

    stand.statut = "demande";
    stand.demande = {
      id_demandeur: userId,
      nom_demandeur: userName,
      date_demande: new Date().toISOString(),
      message: message
    };

    saveStandsToStorage(stands);
    
    return { error: 0, data: stand };
  }

  async approveRequest(standId) {
    const stands = loadStandsFromStorage();
    const stand = stands.find(s => s.id === standId);
    
    if (!stand) {
      return { error: 1, message: "Stand introuvable" };
    }

    if (stand.statut !== "demande") {
      return { error: 1, message: "Aucune demande en attente pour ce stand" };
    }

    stand.statut = "réservé";
    
    // Transférer le prestataire proposé vers le prestataire officiel
    if (stand.demande?.prestataire_propose) {
      stand.prestataire = stand.demande.prestataire_propose;
    }
    
    delete stand.demande;

    saveStandsToStorage(stands);
    
    return { error: 0, data: stand };
  }

  async rejectRequest(standId) {
    const stands = loadStandsFromStorage();
    const stand = stands.find(s => s.id === standId);
    
    if (!stand) {
      return { error: 1, message: "Stand introuvable" };
    }

    if (stand.statut !== "demande") {
      return { error: 1, message: "Aucune demande en attente pour ce stand" };
    }

    stand.statut = "vide";
    delete stand.demande;

    saveStandsToStorage(stands);
    
    return { error: 0, data: stand };
  }
}

export default new StandsService();
