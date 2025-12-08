<template>
  <div class="payment-page">
    <h1>Page de paiement</h1>

    <section class="cart">
      <h2>Récapitulatif du panier</h2>
      <div v-if="items.length === 0" class="empty">Votre panier est vide.</div>
      <ul v-else class="cart-list">
        <li v-for="item in items" :key="item.id" class="cart-item">
          <div class="left">
            <div class="name">{{ item.nom }}</div>
            <div class="price">{{ item.prix }}€ x {{ item.quantite }}</div>
          </div>
          <div class="right">
            <span class="qty-count">Qté: {{ item.quantite }}</span>
          </div>
        </li>
      </ul>
      <div class="total" v-if="items.length">Total : <strong>{{ total }}€</strong></div>
    </section>

    <section class="methods">
      <h2>Moyen de paiement</h2>
      <div class="methods-grid">
        <label v-for="m in methods" :key="m.id" class="method">
          <input type="radio" name="method" :value="m.id" v-model="selected" />
          <span class="method-name">{{ m.label }}</span>
        </label>
      </div>

      <!-- champs conditionnels selon la méthode choisie -->
      <div class="method-fields" style="margin-top:12px;">
        <div v-if="selected === 'visa' || selected === 'mastercard'" class="card-form">
          <label>Nom sur la carte<input v-model="methodDetails.cardName" placeholder="Nom" /></label>
          <label>Numéro de carte<input v-model="methodDetails.cardNumber" placeholder="1234 5678 9012 3456" /></label>
          <label>Expiration (MM/AA)<input v-model="methodDetails.expiry" placeholder="MM/AA" /></label>
          <label>CVV<input v-model="methodDetails.cvv" placeholder="123" /></label>
        </div>

        <div v-else-if="selected === 'paypal'" class="paypal-form">
          <label>Email PayPal<input v-model="methodDetails.paypalEmail" placeholder="email@exemple.com" /></label>
          <label>Mot de passe PayPal<input v-model="methodDetails.paypalPassword" placeholder="Votre mot de passe" type="password" /></label>
        </div>

        <div v-else-if="selected === 'applepay' || selected === 'googlepay'" class="wallet-form">
          <label>Identifiant portefeuille<input v-model="methodDetails.walletId" placeholder="Identifiant " /></label>
          <label>Mot de passe portefeuille<input v-model="methodDetails.walletPassword" placeholder="Votre mot de passe" type="password" /></label>
        </div>
      </div>
    </section>

    <div class="actions">
      <button class="pay" :disabled="items.length===0 || processing || !isPaymentInfoValid()" @click="pay">Payer ({{ total }}€)</button>
      <div class="status">{{ status }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, reactive, watch } from 'vue';
import panierStore from '@/stores/panier.js';
import paymentService from '@/services/payment.service.js';

const items = panierStore.panier.items;
const methods = paymentService.getPaymentMethods();
const selected = ref(methods[0]?.id ?? 'visa');
const status = ref('');
const processing = ref(false);

const methodDetails = reactive({
  // champs communs
  cardNumber: '',
  cardName: '',
  expiry: '',
  cvv: '',
  paypalEmail: '',
  walletId: '',
  paypalPassword: '',
  walletPassword: ''
});

watch(selected, () => {
  // réinitialiser les champs non pertinents lors du changement de méthode
  methodDetails.cardNumber = '';
  methodDetails.cardName = '';
  methodDetails.expiry = '';
  methodDetails.cvv = '';
  methodDetails.paypalEmail = '';
  methodDetails.walletId = '';
  methodDetails.paypalPassword = '';
  methodDetails.walletPassword = '';
});

const selectedId = computed(() => selected.value);

const total = computed(() => items.reduce((s, it) => s + (it.prix * (it.quantite || 0)), 0));

function increment(id) {
  panierStore.incrementer(id);
}
function decrement(id) {
  panierStore.decrementer(id);
}

function isPaymentInfoValid() {
  const m = selectedId.value;
  if (m === 'paypal') {
    return !!(methodDetails.paypalEmail && methodDetails.paypalEmail.includes('@') && methodDetails.paypalPassword);
  }
  if (m === 'applepay' || m === 'googlepay') {
    return !!(methodDetails.walletId && methodDetails.walletPassword);
  }
  if (m === 'visa' || m === 'mastercard') {
    return !!(methodDetails.cardNumber && methodDetails.cardName && methodDetails.expiry && methodDetails.cvv);
  }
  return true;
}

async function pay() {
  if (items.length === 0) return;
  if (!isPaymentInfoValid()) {
    status.value = 'Veuillez remplir les informations de paiement requises.';
    return;
  }
  processing.value = true;
  status.value = 'Traitement du paiement...';
  try {
    // envoyer aussi les détails de paiement au service
    const result = await paymentService.processPayment(items, selected.value, { ...methodDetails });
    if (result && result.success) {
      // vider le panier
      const copy = [...items];
      for (const it of copy) {
        panierStore.supprimer(it.id);
      }
      // réinitialiser les détails
      methodDetails.cardNumber = '';
      methodDetails.cardName = '';
      methodDetails.expiry = '';
      methodDetails.cvv = '';
      methodDetails.paypalEmail = '';
      methodDetails.walletId = '';
      methodDetails.paypalPassword = '';
      methodDetails.walletPassword = '';

      status.value = 'Paiement réussi — merci !';
    } else {
      status.value = 'Échec du paiement : ' + (result?.message || 'erreur');
    }
  } catch (e) {
    console.error('Erreur paiement', e);
    status.value = 'Erreur inattendue : ' + (e?.message || e);
  } finally {
    processing.value = false;
  }
}
</script>

<style scoped>
.payment-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  color: #333;
}

.cart, .methods {
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.cart-list {
  list-style: none;
  padding: 0;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}

.cart-item .left {
  flex: 1;
}

.cart-item .right {
  display: flex;
  align-items: center;
}

.qty {
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
}

.qty:disabled {
  background: #ccc;
}

.total {
  text-align: right;
  font-weight: bold;
  padding-top: 10px;
}

.methods-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
}

.method {
  display: flex;
  align-items: center;
  padding: 10px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.method input {
  margin-right: 10px;
}

.method-name {
  flex: 1;
}

.method-fields {
  margin-top: 12px;
}

.card-form, .paypal-form, .wallet-form {
  background: #fff;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 10px;
}

.card-form label, .paypal-form label, .wallet-form label {
  display: block;
  margin-bottom: 10px;
}

.card-form input, .paypal-form input, .wallet-form input {
  width: 100%;
  padding: 8px;
  margin-top: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.actions {
  text-align: center;
}

.pay {
  background: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
}

.pay:disabled {
  background: #ccc;
}

.status {
  margin-top: 10px;
  color: #333;
}
</style>
