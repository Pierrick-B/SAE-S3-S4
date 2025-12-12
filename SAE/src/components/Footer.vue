<script setup>
import LanguageButton from "@/components/LanguageButton.vue";
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user.js'
import { useRouter } from 'vue-router'
import panierStore from '@/stores/panier.js'
import logo from '@/images/logo.png'

const { t } = useI18n()
const userStore = useUserStore()
const router = useRouter()

function goToDemande() {
  try { router.push({ name: 'demande-prestataire' }) } catch(e) {}
}

function goToPanier() {
  try { router.push({ name: 'panier' }) } catch(e) { router.push('/panier') }
}
</script>

<template>
  <footer id="footer">
    <div class="footer-left">
      <img :src="logo" alt="Logo Pop Con" width="96" height="96" />
      <span class="brand">{{ $t('footerBrand') }}</span>
    </div>

    <div class="footer-center">
      <div class="footer-info">
        <span>{{ $t('footerLocation') }}</span> &bull;
        <span>{{ $t('footerThemes') }}</span>
      </div>
    </div>

    <div class="footer-right">
      <LanguageButton />
    </div>
  </footer>
  <div class="footer-bottom">
    <small>
      {{ $t('footerGroup') }} &bull;
      <a href="mailto:contact@belfortpopcon.fr">{{ $t('footerContact') }}</a><br>
      {{ $t('footerCopyright') }}
    </small>
    <!-- Bouton demande prestataire placé dans la zone grise du bas, à droite - visible seulement pour les clients -->
    <button
      v-if="userStore.currentUser && userStore.currentUser.role === 'client'"
      class="demande-presta"
      @click="goToDemande"
      :aria-label="t('demander prestataire') || 'Demander prestataire'">
      {{ (t('demander_prestataire') || 'DEMANDER PRESTATAIRE').toUpperCase() }}
    </button>
  </div>

  <!-- Bouton panier flottant (hors du footer) : réel bouton fixe en bas à droite de l'écran -->

</template>

<style scoped>
#footer {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 3rem;
  box-sizing: border-box;
  position: relative;
}

.footer-left {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.brand {
  font-weight: 600;
  font-size: 1rem;
  font-family: "JetBrains Mono", "JetBrains Mono Fallback", monospace;
}

.footer-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  max-width: calc(100% - 6rem);
}

.footer-info {
  padding: 0.6rem 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(235, 235, 235, 0.8);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 50px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: background 0.3s;
  font-family: "JetBrains Mono", "JetBrains Mono Fallback", monospace;
  font-size: 0.9rem;
  font-weight: 600;
  color: #1a1a1a;
  text-align: center;
}

.footer-info:hover {
  background: rgba(220, 220, 220, 0.95);
}

.footer-right { display: flex; align-items: center; gap: 0.8rem; }

.footer-bottom {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0.4rem 1rem 1.2rem;
  box-sizing: border-box;
  background: rgba(235, 235, 235, 0.5);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  position: relative; /* pour positionner le bouton à droite */
}

.footer-bottom small {
  color: #666;
  font-size: 0.8rem;
  font-family: "JetBrains Mono", "JetBrains Mono Fallback", monospace;
  text-align: center;
  line-height: 1.4;
}

.footer-bottom a {
  color: #1a1a1a;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s;
}

.footer-bottom a:hover {
  color: #333;
}

/* Bouton placé sur la droite de la zone grise du bas */
.demande-presta {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: #1a1a1a;
  color: #fff;
  padding: 0.5rem 0.9rem;
  border-radius: 999px;
  border: none;
  box-shadow: 0 6px 20px rgba(0,0,0,0.12);
  font-family: "JetBrains Mono", monospace;
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.4px;
  cursor: pointer;
}
.demande-presta:hover { background: #333; transform: translateY(-50%) translateY(-3px); }

/* Bouton panier flottant, placé immédiatement à gauche du bouton demande-presta */
.go-panier {
  position: fixed;
  right: 1.2rem; /* distance depuis la droite de la fenêtre */
  top: 1.2rem;   /* positionné en haut */
  z-index: 1200; /* au-dessus des autres éléments */
  background: #111827;
  color: #fff;
  padding: 0.5rem 0.9rem;
  border-radius: 999px;
  border: none;
  box-shadow: 0 8px 24px rgba(0,0,0,0.18);
  font-family: "JetBrains Mono", monospace;
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 0.4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.go-panier:hover { background: #2b2f35; transform: translateY(-3px); }

@media (max-width: 480px) {
  .demande-presta { right: 0.6rem; top: 50%; padding: 0.45rem 0.7rem; font-size: 0.8rem; }
  /* pour mobile, placer le bouton en haut à droite mais avec un petit offset pour ne pas gêner le header */
  .go-panier { right: 0.8rem; top: 0.8rem; padding: 0.42rem 0.68rem; font-size: 0.78rem; }
}

/* Responsive */
@media (max-width: 1200px) {
  #footer { padding: 1.2rem 2rem; }
  .footer-center { max-width: calc(100% - 4rem); }
}

@media (max-width: 768px) {
  #footer {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem 1.5rem;
  }

  .footer-left { width: 100%; justify-content: center; }
  .footer-center { position: static; transform: none; width: 100%; max-width: 100%; }
  .footer-info { width: 100%; justify-content: center; flex-wrap: wrap; gap: 1rem; padding: 0.6rem 1rem; box-sizing: border-box; }
  .footer-right { width: 100%; justify-content: center; }
}

@media (max-width: 480px) {
  .footer-info { flex-direction: column; gap: 0.8rem; }
}
</style>