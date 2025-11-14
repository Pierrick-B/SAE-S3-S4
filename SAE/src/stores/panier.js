import { reactive } from 'vue';
const panier = reactive({
  items: []
});

function ajouterItem(item) {
  const existing = panier.items.find(i => i.id === item.id);
  if (existing) {
    existing.quantite += item.quantite ?? 1;
  } else {
    panier.items.push({ ...item, quantite: item.quantite ?? 1 });
  }
}

function incrementer(id) {
  const found = panier.items.find(i => i.id === id);
  if (found) found.quantite++;
}

function decrementer(id) {
  const found = panier.items.find(i => i.id === id);
  if (!found) return;
  if (found.quantite > 1) {
    found.quantite--;
  } else {
    const idx = panier.items.findIndex(i => i.id === id);
    if (idx !== -1) panier.items.splice(idx, 1);
  }
}

function supprimer(id) {
  const idx = panier.items.findIndex(i => i.id === id);
  if (idx !== -1) panier.items.splice(idx, 1);
}

if (panier.items.length === 0) {
  ajouterItem({ id: 'b-jeu-jeudi', nom: 'Billet 1 jour - jeudi', prix: 10, quantite: 2 });
  ajouterItem({ id: 'b-2j-ven-sam', nom: 'Billet 2 jours - vendredi + samedi', prix: 20, quantite: 1 });
}

export default {
  panier,
  ajouterItem,
  incrementer,
  decrementer,
  supprimer
};
