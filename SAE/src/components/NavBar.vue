<script setup>
  import LanguageButton from "@/components/LanguageButton.vue";
  import { useI18n } from 'vue-i18n'
  import { useLangStore } from "@/stores/langStore.js";
  import { computed } from 'vue'

  const { t } = useI18n()
  let lgButton = useLangStore();
  const pages = computed(() => [
    { id: 1, name: t('pageTitleAccueil'), to: { name: 'accueil' } },
    { id: 2, name: t('pageTitleProgrammation'), to: { name: 'programmation' } },
    { id: 3, name: t('pageTitleBilletterie'), to: { name: 'billetterie' } },
    { id: 4, name: t('pageTitleStands'), to: { name: 'stands' } },
    { id: 5, name: t('pageTitleClassements'), to: { name: 'classements' } }
  ]);
</script>

<template>
  <nav id="navBar">
    <div class="logo">
      <img src="/src/images/logo.png" alt="Logo" width="96" height="96">
    </div>
    
    <div class="nav-center">
      <ul class="nav-links">
        <li v-for="page in pages" :key="page.id">
          <router-link :to="page.to">{{ page.name.toUpperCase() }}</router-link>
        </li>
      </ul>
    </div>
    
    <div class="nav-right">
      <button class="login-btn">{{ $t('login') }}</button>
      <LanguageButton></LanguageButton>
    </div>
  </nav>
</template>

<style>
body {
  margin: 0;
}
</style>

<style scoped>
#navBar {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 3rem;
  box-sizing: border-box;
  position: relative;
}

/* Logo à gauche */
.logo {
  flex-shrink: 0;
}

.logo img {
  display: block;
}

/* Navbar centrée au milieu */
.nav-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  max-width: calc(100% - 6rem);
}

.nav-links {
  list-style: none;
  margin: 0;
  padding: 0.8rem 2.5rem;
  display: flex;
  align-items: center;
  gap: 3rem;
  background: rgba(235, 235, 235, 0.788);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 50px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.123);
  transition: background 0.3s;
}

.nav-links li {
  display: inline-block;
}

.nav-links a {
  position: relative;
  text-decoration: none;
  color: #1a1a1a;
  font-family: "JetBrains Mono", "JetBrains Mono Fallback", monospace;
  font-size: 1.15rem;
  font-weight: 600;
  letter-spacing: 0.4px;
  transition: color 0.3s;
  cursor: pointer;
  z-index: 1;
}

.nav-links a::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) scale(0.7);
  width: 150%;
  height: 150%;
  background: rgba(255,255,255,0.95);
  border-radius: 2em;
  opacity: 0;
  transition: opacity 0.25s cubic-bezier(.4,0,.2,1), transform 0.25s cubic-bezier(.4,0,.2,1);
  z-index: -1;
  pointer-events: none;
}

.nav-links a:hover::before,
.nav-links a:focus-visible::before {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

.nav-links a:hover,
.nav-links a:focus-visible {
  color: #222;
}

.nav-links:hover {
  background: rgba(220, 220, 220, 0.95);
}

.nav-links .router-link-active,
.nav-links .router-link-exact-active {
  color: #111;
  text-decoration: underline;
}

/* Section droite avec login et language */
.nav-right {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
  max-width: fit-content;
}

.login-btn {
  background: #1a1a1a;
  color: #ffffff;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 50px;
  font-family: "JetBrains Mono", "JetBrains Mono Fallback", monospace;
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
}

.login-btn:hover {
  background: #333;
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.login-btn:active {
  transform: translateY(0);
}

/* Responsive Design */
@media (max-width: 1200px) {
  .nav-links {
    gap: 2rem;
    padding: 0.8rem 2rem;
  }
  
  .nav-links a {
    font-size: 0.9rem;
  }
  
  #navBar {
    padding: 1.5rem 2rem;
  }
  
  .nav-center {
    max-width: calc(100% - 4rem);
  }
  
  .nav-right {
    gap: 0.8rem;
  }
  
  .login-btn {
    padding: 0.7rem 1.5rem;
  }
}

@media (max-width: 992px) {
  .nav-links {
    gap: 1.5rem;
    padding: 0.7rem 1.5rem;
  }
  
  .nav-links a {
    font-size: 0.85rem;
  }
  
  .nav-center {
    max-width: calc(100% - 3rem);
  }
  
  .login-btn {
    padding: 0.6rem 1.2rem;
    font-size: 0.85rem;
  }
  
  .nav-right {
    gap: 0.6rem;
  }
}

@media (max-width: 768px) {
  #navBar {
    flex-direction: column;
    gap: 1.5rem;
    padding: 1rem 1.5rem;
  }
  
  .logo {
    width: 100%;
    text-align: center;
  }
  
  .nav-center {
    position: static;
    transform: none;
    width: 100%;
    max-width: 100%;
  }
  
  .nav-links {
    width: 100%;
    box-sizing: border-box;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1.5rem;
    padding: 0.8rem 1rem;
  }
  
  .nav-right {
    width: 100%;
    justify-content: center;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .nav-links {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem 0.5rem;
  }
  
  .nav-links a {
    font-size: 0.9rem;
  }
  
  .nav-right {
    flex-direction: column;
    gap: 0.8rem;
  }
  
  .login-btn {
    width: 100%;
    max-width: 200px;
  }
}
</style>