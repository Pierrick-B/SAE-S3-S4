<script setup>
import {useLangStore} from "@/stores/langStore.js";
import {storeToRefs} from "pinia";

const langStore = useLangStore();
const {currentTranslations} = storeToRefs(langStore);
</script>

<template>
  <main>
    <div class="image">
      <img src="https://liquidblueevents.com/wp-content/uploads/2020/01/reno_pop_culture_con-101sm.jpg"
           alt="une convention">
      <div class="logo">
        <img src="/logo-placeholder.svg" alt="Logo" width="48" height="48">
      </div>
      <div class="description">
        <div class="text-overlay">
          <p>L'ULTIME RASSEMBLEMENT DES FANDOMS</p>
        </div>
      </div>
    </div>
    <div class="presentation">
      <p>Plongez dans un univers vibrant où se rencontrent les fans de comics, films, séries TV, jeux vidéo et anime.<br>
        C'est le rendez-vous annuel pour rencontrer des célébrités, assister à des panels exclusifs et des ateliers
        créatifs, et découvrir le travail d'artistes et d'auteurs.<br> Que vous soyez en cosplay ou simplement curieux,
        venez partager votre passion et créer des souvenirs inoubliables.</p>
    </div>
    <div class="misc">
      <div class="leaderboard">
        <p>Leaderboard</p>
      </div>
      <div class="stands">
        <p>Stands</p>
      </div>
      <div class="carte">
        <p>Carte</p>
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
  top: 45%;
  left: 50%;
  width: 25%;
  transform: translate(-50%, -50%);
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
  width: 100%;
  height: auto;
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