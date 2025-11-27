import { reactive, computed } from 'vue';
import billetterieService from '@/services/billetterie.service.js';
import panierData from '@/datasource/data_panier.js';

const LS_KEY = 'panierData';

function _load() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.items)) return parsed;
    }
  } catch (e) {
    console.error('Erreur lecture localStorage panier', e);
  }
  // fallback : charger depuis data_panier.js (plain JS copy) et initialiser localStorage
  try {
    const initial = JSON.parse(JSON.stringify(panierData));
    _save(initial);
    return initial;
  } catch (e) {
    console.error('Erreur initialisation panier depuis data_panier', e);
  }
  return { items: [] };
}

function _save(panier) {
  try {
    // sauvegarder une copie plain JS pour éviter d'écrire des proxies
    const plain = { items: panier.items.map(i => ({ ...i })) };
    localStorage.setItem(LS_KEY, JSON.stringify(plain));
  } catch (e) {
    console.error('Erreur sauvegarde localStorage panier', e);
  }
}

const state = reactive(_load());
if (!Array.isArray(state.items)) state.items = [];

function ajouterItem(item) {
  console.debug('[panier] ajouterItem', item);
  const existing = state.items.find(i => i.id === item.id);
  if (existing) {
    existing.quantite += item.quantite ?? 1;
  } else {
    state.items.push({ ...item, quantite: item.quantite ?? 1 });
  }
  _save(state);
  console.debug('[panier] état après ajout', state.items);
}

async function incrementer(id) {
  console.debug('[panier] incrementer', id);
  const found = state.items.find(i => i.id === id);
  if (!found) return;
  try {
    const response = await billetterieService.acheter(found.nom);
    if (response.error === 0) {
      // achat côté billetterie réussi, incrémenter dans le panier
      found.quantite++;
      _save(state);
      console.debug('[panier] état après incrément', state.items);
    } else {
      alert(response.message || 'Plus de billets disponibles');
    }
  } catch (e) {
    console.error('[panier] erreur achat lors de l\'incrément', e);
    alert('Erreur lors de la réservation du billet');
  }
}

function decrementer(id) {
  console.debug('[panier] decrementer', id);
  const found = state.items.find(i => i.id === id);
  if (!found) return;

  if (found.quantite > 1) {
    found.quantite--;
    _save(state);
    billetterieService.restaurer(found.nom, 1);
    console.debug('[panier] état après décrément', state.items);
  } else {
    // suppression complète : restaurer la quantité et supprimer
    const qty = found.quantite;
    billetterieService.restaurer(found.nom, qty);
    const idx = state.items.findIndex(i => i.id === id);
    if (idx !== -1) state.items.splice(idx, 1);
    _save(state);
    console.debug('[panier] état après suppression via décrément', state.items);
  }
}

function supprimer(id) {
  console.debug('[panier] supprimer', id);
  const idx = state.items.findIndex(i => i.id === id);
  if (idx !== -1) {
    const qty = state.items[idx].quantite;
    const nom = state.items[idx].nom;
    // restaurer les billets côté billetterie
    billetterieService.restaurer(nom, qty);
    state.items.splice(idx, 1);
    _save(state);
  }
  console.debug('[panier] état après suppression', state.items);
}

const total = computed(() => {
  return state.items.reduce((sum, it) => sum + (it.prix || 0) * (it.quantite || 0), 0);
});

function passerAuPaiement() {
  alert('Passer au paiement — total : ' + total.value + '€');
}

export default {
  panier: state,
  ajouterItem,
  incrementer,
  decrementer,
  supprimer,
  total,
  passerAuPaiement
};
