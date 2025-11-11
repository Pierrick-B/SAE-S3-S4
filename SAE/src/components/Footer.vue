<script setup>
import LanguageButton from "@/components/LanguageButton.vue";
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <footer id="footer">
    <div class="footer-left">
      <img src="/src/images/logo.png" alt="Logo Pop Con" width="96" height="96" />
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
  </div>
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