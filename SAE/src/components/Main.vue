<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <main>
    <div class="image">
      <img src="https://liquidblueevents.com/wp-content/uploads/2020/01/reno_pop_culture_con-101sm.jpg"
           alt="une convention">
      <div class="logo">
        <img src="/src/images/logo.png" alt="Belfort POP Con logo" class="hero-logo">
      </div>
      <div class="description">
        <div class="text-overlay">
          <p>{{ $t('heroTitle') }}</p>
        </div>
      </div>
    </div>
    <div class="presentation">
      <p>{{ $t('heroDescription') }}</p>
    </div>
    <div class="misc">
      <div class="leaderboard">
        <p>{{ $t('leaderboard') }}</p>
      </div>
      <div class="stands">
        <p>{{ $t('stands') }}</p>
      </div>
      <div class="carte">
        <p>{{ $t('carte') }}</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
:root {
  --grey-darker: 180 1% 35%;
}

.image {
  position: relative;
  display: inline-block;
}

.logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.image .hero-logo {
  width: 30%;
  height: 10%;
  display: block;
  filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.25));
}

.description {
  font-family: "JetBrains Mono", "JetBrains Mono Fallback", monospace;
  font-weight: bold;
  font-size: 35px;
  position: absolute;
  bottom: 8%;
  left: 50%;
  height: auto;
  transform: translateX(-50%);
}

.text-overlay {
  background-color: hsl(180 1% 35% / .6);
  color: white;
  backdrop-filter: blur(10px);
  text-align: center;
  border-radius: .5rem;
  padding: 1px 20px 1px 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.image img {
  display: block;
  width: auto;
  height: 1080px;
}

.presentation {
  font-family: Titillium, Arial, sans-serif;
  font-size: 40px;
  font-weight: 600;
  width: 80%;
  place-self: center;
  justify-content: right;
}

.misc {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 90%;
  align-self: center;
}

.leaderboard {
  flex: 1 1 auto;
  text-align: center;
}

.carte {
  flex: 1 1 auto;
  text-align: center;
}

.stands {
  flex: 1 1 auto;
  text-align: center;
}

main{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>