<template>
<div>
  <h1>Programmation de la convention : </h1>

  <h2>Jeudi : </h2>
  <ul v-for="(programme, index) in programmationStore.programmation" :key="index">
    <li v-if="programme.jour === 'jeudi' ">
      de {{ programme.heure_debut }} à {{ programme.heure_fin }} : {{ programme.nom }} organisé par {{ programme.prestataire }}
    </li>
  </ul>

  <h2>Vendredi : </h2>
  <ul v-for="(programme, index) in programmationStore.programmation" :key="index">
    <li v-if="programme.jour === 'vendredi' ">
      de {{ programme.heure_debut }} à {{ programme.heure_fin }} : {{ programme.nom }} organisé par {{ programme.prestataire }}
    </li>
  </ul>

  <h2>Samedi : </h2>
  <ul v-for="(programme, index) in programmationStore.programmation" :key="index">
    <li v-if="programme.jour === 'samedi' ">
      de {{ programme.heure_debut }} à {{ programme.heure_fin }} : {{ programme.nom }} organisé par {{ programme.prestataire }}
    </li>
  </ul>

  <h2>Dimanche : </h2>
  <ul v-for="(programme, index) in programmationStore.programmation" :key="index">
    <li v-if="programme.jour === 'dimanche' ">
      de {{ programme.heure_debut }} à {{ programme.heure_fin }} : {{ programme.nom }} organisé par {{ programme.prestataire }}
    </li>
  </ul>


</div>
</template>

<script setup>
import {useProgrammationStore} from "@/stores/programmation.js";
const programmationStore = useProgrammationStore()
programmationStore.getProgrammation()

</script>