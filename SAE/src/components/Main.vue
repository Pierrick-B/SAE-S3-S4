<script setup>
import { useLangStore } from "@/stores/langStore.js";
import { storeToRefs } from "pinia";

const langStore = useLangStore();
const { currentTranslations } = storeToRefs(langStore);
</script>

<template>
  <div class="image">
    <img src="https://liquidblueevents.com/wp-content/uploads/2020/01/reno_pop_culture_con-101sm.jpg" alt="une convention" >
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
    <p>Plongez dans un univers vibrant où se rencontrent les fans de comics, films, séries TV, jeux vidéo et anime. C'est le rendez-vous annuel pour rencontrer des célébrités, assister à des panels exclusifs et des ateliers créatifs, et découvrir le travail d'artistes et d'auteurs. Que vous soyez en cosplay ou simplement curieux, venez partager votre passion et créer des souvenirs inoubliables.</p>
  </div>
</template>

<style scoped>
  .image {
    position: relative;
    display: inline-block;
  }

  .logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .description {
    font-family: "JetBrains Mono", "JetBrains Mono Fallback", monospace;
    font-weight: bold;
    font-size: 25px;
    position: absolute;
    top: 90%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .text-overlay{
    background-color: white;
    text-align: center;
    border-radius: 30px;
    width: 125%;
  }

  .image img {
    display: block;
    width: 100%;
    height: auto;
  }

  .presentation{
    font-family: Titillium, Arial, sans-serif;
    font-size: 40px;
    font-weight: 600;
  }
</style>