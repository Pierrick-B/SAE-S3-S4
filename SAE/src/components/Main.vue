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
      <div class="text">
        <p :style="{ whiteSpace: 'pre-line' }">{{ $t('heroDescription') }}</p>
      </div>
    </div>
    <div class="misc">
      <div class="misc-item">
        <div class="leaderboard">
          <img src="../images/podium.jpg">
          <p class="titre">{{ $t('leaderboard') }}</p>
        </div>
      </div>
      <div class="misc-item">  
        <img src="../images/stand.jpg">
        <div class="stands">
          <p class="titre">{{ $t('stands') }}</p>
        </div>
      </div>
      <div class="misc-item">
        <div class="carte">
          <img src="../images/carte.jpg" style="object-position: center 50%;">
          <p class="titre">{{ $t('carte') }}</p>
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
  height: 85vh;
  overflow: hidden;
}

.image > img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
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
  font-family: 'Titillium', Arial, sans-serif;
  font-size: 2.4vh;
  width: 100vw;
  line-height: 1.6;
  color: hsl(0, 0%, 9%);
  text-align: justify;
  backdrop-filter: blur(8px);
  padding: 2rem 2.5rem;
  background-color: rgb(241, 241, 241);
  display: flex;
  justify-content: center;
}

.presentation .text {
  width: 70%;
}

.misc {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 90%;
  gap: 3%;
  margin-top: 2rem;
  row-gap: 20px;
}

.misc-item {
  position: relative;
  width: 30%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 15px;
  min-width: 400px;
}

.misc-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
  display: block;
  transition: transform 0.6s ease-in-out; 
}

.misc-item:hover img {
  transform: scale(1.05);
}

.misc-item::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%; 
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.0));
  z-index: 1;
  pointer-events: none;
  transition: opacity 0.4s ease;
}

.misc-item .titre {
  position: absolute;
  z-index: 2;
  font-family: 'Bebas Neue', sans-serif;
  text-shadow: 0 3px 10px rgba(0, 0, 0, 0.8);
  color: white;
  font-size: 3vh;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
  font-weight: bold;
}

main{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.misc-item:nth-child(3) img { object-position: center 10%; }
</style>