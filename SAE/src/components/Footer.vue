<script setup>
import LanguageButton from "@/components/LanguageButton.vue";
</script>

<template>
  <footer id="footer">
    <div class="footer-left">
      <img src="/src/images/logo.png" alt="Logo Pop Con" width="96" height="96" />
      <span class="brand">Pop Con</span>
    </div>

    <div class="footer-center">
      <ul class="footer-links">
        <li>
          <router-link :to="{ name: 'programmation' }">Programmation</router-link>
        </li>
      </ul>
    </div>

    <div class="footer-right">
      <LanguageButton />
    </div>
  </footer>
  <div class="footer-bottom">
    <small>© 2025 Pop Con. Tous droits réservés.</small>
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

.footer-links {
  list-style: none;
  margin: 0;
  padding: 0.6rem 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  background: rgba(235, 235, 235, 0.8);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 50px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: background 0.3s;
}

.footer-links li { display: inline-block; }

.footer-links a {
  position: relative;
  text-decoration: none;
  color: #1a1a1a;
  font-family: "JetBrains Mono", "JetBrains Mono Fallback", monospace;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  transition: color 0.3s;
  cursor: pointer;
  z-index: 1;
}

.footer-links a::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) scale(0.7);
  width: 125%;
  height: 150%;
  background: rgba(255,255,255,0.95);
  border-radius: 2em;
  opacity: 0;
  transition: opacity 0.25s cubic-bezier(.4,0,.2,1), transform 0.25s cubic-bezier(.4,0,.2,1);
  z-index: -1;
  pointer-events: none;
}

.footer-links a:hover::before,
.footer-links a:focus-visible::before { opacity: 1; transform: translate(-50%, -50%) scale(1); }
.footer-links a:hover,
.footer-links a:focus-visible { color: #222; }
.footer-links:hover { background: rgba(220, 220, 220, 0.95); }

.footer-right { display: flex; align-items: center; gap: 0.8rem; }

.footer-bottom {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0.4rem 1rem 1.2rem;
  box-sizing: border-box;
}

.footer-bottom small {
  color: #666;
  font-size: 0.8rem;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
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
  .footer-links { width: 100%; justify-content: center; flex-wrap: wrap; gap: 1rem; padding: 0.6rem 1rem; box-sizing: border-box; }
  .footer-right { width: 100%; justify-content: center; }
}

@media (max-width: 480px) {
  .footer-links { flex-direction: column; gap: 0.8rem; }
}
</style>