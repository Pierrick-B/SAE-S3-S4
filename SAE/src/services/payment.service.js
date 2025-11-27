const paymentMethods = [
  { id: 'applepay', label: 'Apple Pay' },
  { id: 'paypal', label: 'PayPal' },
  { id: 'visa', label: 'Visa' },
  { id: 'mastercard', label: 'Mastercard' },
  { id: 'googlepay', label: 'Google Pay' }
];

function _validateDetails(method, details = {}) {
  if (method === 'paypal') {
    if (!details.paypalEmail || !details.paypalEmail.includes('@')) return 'Email PayPal invalide';
    return null;
  }
  if (method === 'applepay' || method === 'googlepay') {
    if (!details.walletId) return 'Identifiant du portefeuille requis';
    return null;
  }
  if (method === 'visa' || method === 'mastercard') {
    if (!details.cardName) return 'Nom sur la carte requis';
    if (!details.cardNumber || details.cardNumber.replace(/\s+/g, '').length < 12) return 'Numéro de carte invalide';
    if (!details.expiry || !/^\d{2}\/\d{2}$/.test(details.expiry)) return 'Date d\'expiration invalide (MM/AA)';
    if (!details.cvv || !/^\d{3,4}$/.test(details.cvv)) return 'CVV invalide';
    return null;
  }
  return null;
}

async function processPayment(items, method, details = {}) {
  console.debug('[payment.service] processPayment appelé', { items, method, details });

  // validation minimale côté client
  const validationError = _validateDetails(method, details);
  if (validationError) {
    return { success: false, message: validationError };
  }

  // simulation d'un appel réseau vers un fournisseur de paiement
  return new Promise((resolve) => {
    setTimeout(() => {
      // ici on pourrait simuler des erreurs aléatoires ou vérifier les montants
      resolve({ success: true, message: 'Paiement simulé effectué', method, details });
    }, 700);
  });
}

function getPaymentMethods() {
  return paymentMethods;
}

export default { getPaymentMethods, processPayment };
