<script setup lang="ts">
import panierService from '@/services/panier.service.js'
const panier = panierService.panier;
const total = panierService.total;

// Exporter le panier courant au format JS module (data_panier.js)
function exporterDataPanier() {
  try {
    const plain = { items: panier.items.map(i => ({ id: i.id, nom: i.nom, prix: i.prix, quantite: i.quantite })) };
    const content = `// fichier généré automatiquement
const panierData = ${JSON.stringify(plain, null, 2)};

export default panierData;\n`;
    const blob = new Blob([content], { type: 'text/javascript;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data_panier.js';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  } catch (e) {
    console.error('Erreur export data_panier', e);
    alert('Impossible d\'exporter le panier');
  }
}

// Sauvegarder le panier côté serveur via API POST /api/export-panier
async function sauvegarderSurServeur() {
  try {
    const plain = { items: panier.items.map(i => ({ id: i.id, nom: i.nom, prix: i.prix, quantite: i.quantite })) };
    const resp = await fetch('http://localhost:3000/api/export-panier', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(plain)
    });
    const json = await resp.json();
    if (resp.ok && json.ok) {
      alert('Fichier data_panier.js sauvegardé côté serveur. Chemin: ' + json.path);
    } else {
      console.error('Erreur serveur export', json);
      alert('Erreur serveur lors de la sauvegarde: ' + (json.error || 'unknown'));
    }
  } catch (e) {
    console.error('Erreur sauvegarde serveur', e);
    alert('Impossible de contacter le serveur d\'export (http://localhost:3000).');
  }
}
</script>

<template>
  <div class="panier-container">
    <h2>Panier</h2>

    <div class="actions" style="text-align:center;margin-bottom:12px;">

    </div>

    <div v-if="panier.items.length === 0" class="empty">Votre panier est vide.</div>

    <ul v-else class="items">
      <li v-for="item in panier.items" :key="item.id" class="item">
        <div class="info">
          <div class="nom">{{ item.nom }}</div>
          <div class="prix">{{ item.prix }}€</div>
        </div>
        <div class="controls">
          <button class="btn small" @click="panierService.decrementer(item.id)">-</button>
          <div class="quantite">{{ item.quantite }}</div>
          <button class="btn small" @click="panierService.incrementer(item.id)">+</button>
          <button class="btn delete" @click="panierService.supprimer(item.id)">Supprimer</button>
        </div>
      </li>
    </ul>

    <div class="summary" v-if="panier.items.length > 0">
      <div class="total">Total : <span class="price">{{ total }}€</span></div>
      <router-link to="/payment" class="btn primary">Passer au paiement</router-link>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&display=swap');

.panier-container {
  font-family: 'JetBrains Mono', monospace;
  max-width: 720px;
  margin: 24px auto;
  padding: 18px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
}

.panier-container h2 {
  text-align: center;
  margin-bottom: 12px;
  font-weight: 600;
}

.empty {
  text-align: center;
  color: #6b7280;
  padding: 12px 0;
}

.items {
  list-style: none;
  padding: 0;
  margin: 0 0 12px 0;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #f3f4f6;
}

.info {
  display: flex;
  flex-direction: column;
}

.nom {
  font-size: 14px;
  color: #111827;
}

.prix {
  font-size: 13px;
  color: #374151;
}

.controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn {
  border: 1px solid #d1d5db;
  background: #fff;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-family: inherit;
}

.btn.small {
  width: 34px;
  height: 34px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn.primary {
  background: #111827;
  color: #fff;
  border-color: transparent;
  padding: 10px 16px;
  border-radius: 8px;
}

.btn.delete {
  background: #fff6f6;
  color: #b91c1c;
  border-color: #fecaca;
}

.quantite {
  min-width: 28px;
  text-align: center;
}

.summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.total {
  font-weight: 600;
}

.price {
  color: #0f172a;
}
</style>