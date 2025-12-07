import standsData from "@/datasource/stands.js";

const clone = (value) => JSON.parse(JSON.stringify(value));
const STORAGE_KEY = "stands.dataset.v2";

let inMemorySnapshot = clone(standsData);

function getStorage() {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      return window.localStorage;
    }
  } catch (error) {
    console.error("Accès localStorage impossible", error);
  }
  return null;
}

function loadStandsFromStorage() {
  const storage = getStorage();
  if (!storage) {
    return clone(inMemorySnapshot);
  }

  const raw = storage.getItem(STORAGE_KEY);
  if (!raw) {
    storage.setItem(STORAGE_KEY, JSON.stringify(inMemorySnapshot));
    return clone(inMemorySnapshot);
  }

  try {
    const parsed = JSON.parse(raw);
    inMemorySnapshot = parsed;
    return clone(parsed);
  } catch (error) {
    console.error("Impossible de parser les stands, réinitialisation", error);
    storage.removeItem(STORAGE_KEY);
    storage.setItem(STORAGE_KEY, JSON.stringify(inMemorySnapshot));
    return clone(inMemorySnapshot);
  }
}

function saveStandsToStorage(stands) {
  const storage = getStorage();
  inMemorySnapshot = clone(stands);
  if (!storage) {
    return;
  }

  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(stands));
  } catch (error) {
    console.error("Erreur de sauvegarde des stands", error);
  }
}

function findStand(stands, standId) {
  return stands.find((stand) => stand.id === standId) || null;
}

function generateRequestId(standId) {
  const suffix = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `REQ-${standId}-${Date.now()}-${suffix}`;
}

class StandsService {
  async getStands() {
    return { error: 0, data: loadStandsFromStorage() };
  }

  async getStandById(id) {
    const stands = loadStandsFromStorage();
    const stand = findStand(stands, id);
    if (!stand) {
      return { error: 1, message: "Stand introuvable" };
    }
    return { error: 0, data: stand };
  }

  async updateStandStatus(standId, newStatus) {
    const stands = loadStandsFromStorage();
    const stand = findStand(stands, standId);

    if (!stand) {
      return { error: 1, message: "Stand introuvable" };
    }

    if (newStatus === "available") {
      stand.status = "available";
      stand.occupant = null;
    } else if (["pending", "occupied"].includes(newStatus)) {
      stand.status = newStatus;
    } else {
      return { error: 1, message: "Statut non supporté" };
    }

    saveStandsToStorage(stands);
    return { error: 0, data: stand };
  }

  async createStandRequest(standId, payload) {
    const stands = loadStandsFromStorage();
    const stand = findStand(stands, standId);

    if (!stand) {
      return { error: 1, message: "Stand introuvable" };
    }

    if (stand.status === "occupied") {
      return { error: 1, message: "Ce stand est déjà attribué" };
    }

    const {
      prestataireId,
      prestataireName,
      companyName,
      category,
      contactEmail,
      contactPhone,
      needsDetails,
      synopsis,
      message,
      needs = []
    } = payload || {};

    if (!prestataireId || !companyName) {
      return { error: 1, message: "Informations prestataire manquantes" };
    }

    const alreadyPending = (stand.requests || []).some(
      (request) =>
        request.status === "pending" && request.prestataire?.id === prestataireId
    );

    if (alreadyPending) {
      return { error: 1, message: "Vous avez déjà une demande en attente pour ce stand" };
    }

    const detailsText = needsDetails ?? '';
    const synopsisText = synopsis ?? '';
    const legacyMessage = message ?? detailsText;

    const newRequest = {
      requestId: generateRequestId(standId),
      status: "pending",
      submittedAt: new Date().toISOString(),
      prestataire: {
        id: prestataireId,
        name: prestataireName || companyName,
        companyName,
        category: category || "autre"
      },
      contact: {
        email: contactEmail || null,
        phone: contactPhone || null
      },
      message: legacyMessage,
      needsDetails: detailsText,
      synopsis: synopsisText,
      needs,
      notes: null
    };

    stand.requests = stand.requests || [];
    stand.requests.push(newRequest);
    if (stand.status === "available") {
      stand.status = "pending";
    }

    saveStandsToStorage(stands);
    return { error: 0, data: stand };
  }

  async approveRequest(standId, requestId, options = {}) {
    const stands = loadStandsFromStorage();
    const stand = findStand(stands, standId);

    if (!stand) {
      return { error: 1, message: "Stand introuvable" };
    }

    const targetRequest = (stand.requests || []).find(
      (request) => request.requestId === requestId
    );

    if (!targetRequest || targetRequest.status !== "pending") {
      return { error: 1, message: "Demande introuvable ou déjà traitée" };
    }

    targetRequest.status = "approved";
    targetRequest.decisionAt = new Date().toISOString();
    targetRequest.decisionBy = options.adminId || null;
    targetRequest.decisionNotes = options.notes || null;

    stand.occupant = {
      prestataireId: targetRequest.prestataire?.id,
      companyName: targetRequest.prestataire?.companyName,
      category: targetRequest.prestataire?.category,
      description: targetRequest.synopsis || targetRequest.message || "",
      activities: [],
      needs: targetRequest.needs || [],
      contact: {
        responsable: targetRequest.prestataire?.name || null,
        email: targetRequest.contact?.email || null,
        tel: targetRequest.contact?.phone || null
      },
      since: new Date().toISOString()
    };

    stand.status = "occupied";

    (stand.requests || [])
      .filter((request) => request.requestId !== requestId && request.status === "pending")
      .forEach((request) => {
        request.status = "rejected";
        request.decisionAt = new Date().toISOString();
        request.decisionReason = "Stand attribué à un autre prestataire";
      });

    saveStandsToStorage(stands);
    return { error: 0, data: stand };
  }

  async rejectRequest(standId, requestId, options = {}) {
    const stands = loadStandsFromStorage();
    const stand = findStand(stands, standId);

    if (!stand) {
      return { error: 1, message: "Stand introuvable" };
    }

    const targetRequest = (stand.requests || []).find(
      (request) => request.requestId === requestId
    );

    if (!targetRequest || targetRequest.status !== "pending") {
      return { error: 1, message: "Demande introuvable ou déjà traitée" };
    }

    targetRequest.status = "rejected";
    targetRequest.decisionAt = new Date().toISOString();
    targetRequest.decisionReason = options.reason || "Demande refusée";

    const hasPending = (stand.requests || []).some(
      (request) => request.status === "pending"
    );

    if (!hasPending && !stand.occupant) {
      stand.status = "available";
    }

    saveStandsToStorage(stands);
    return { error: 0, data: stand };
  }

  async releaseStand(standId) {
    return this.updateStandStatus(standId, "available");
  }
}

export default new StandsService();
