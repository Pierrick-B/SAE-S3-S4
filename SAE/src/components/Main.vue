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
      <p :style="{ whiteSpace: 'pre-line' }">{{ $t('heroDescription') }}</p>
    </div>
    <div class="misc">
      <div class="misc-item">
        <div class="leaderboard">
          <img src="../images/podium.jpg">
          <p>{{ $t('leaderboard') }}</p>
        </div>
      </div>
      <div class="misc-item">  
        <img src="../images/stand.jpg">
        <div class="stands">
          <p>{{ $t('stands') }}</p>
        </div>
      </div>
      <div class="misc-item">
        <div class="carte">
          <p>{{ $t('carte') }}</p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>

.main {
  width: 100%;
}

:root {
  --grey-darker: 180 1% 35%;
}

html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

.image {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.image img {
  height: 100vh;
  width: auto;
  min-width: 100vw;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: block;
}

.image .logo img{
  position: absolute;
  top: 50%;
  left: 50%;
  width: auto;
  height: 40%;
  min-width: 0;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.image .hero-logo {
  display: block;
  filter: drop-shadow(0 8px 20px rgba(0, 0, 0, 0.25));
}

.description {
  font-family: "JetBrains Mono", "JetBrains Mono Fallback", monospace;
  font-weight: bold;
  position: absolute;
  height: 130px;
  bottom: 8%;
  left: 50%;
  height: auto;
  transform: translateX(-50%);
}

.text-overlay {
  background-color: hsl(180 1% 35% / .6);
  color: white;
  backdrop-filter: blur(10px);
  font-size: 2vh;
  text-align: center;
  border-radius: .5rem;
  padding: 1px 20px 1px 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.presentation {
  font-family: Titillium, Arial, sans-serif;
  font-size: 3vh;
  width: 80%;
  place-self: center;
  justify-content: right;
}

.misc {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 90%;
  gap: 3%;
  align-self: center;
}

.misc-item {
  width: 30%;
  flex: 1 1 auto;
  text-align: center;
  border: 1px solid grey;
  border-radius: 15px;
}

.misc-item img{
  max-width: 90%;
  max-height: 90%;
}

main{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>