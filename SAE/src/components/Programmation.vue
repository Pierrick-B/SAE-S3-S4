<template>
<div>
  <h1>Programmation de la convention : </h1>

<!--  <h2>Jeudi : </h2>-->
<!--  <ul v-for="(programme, index) in programmationStore.programmation" :key="index">-->
<!--    <li v-if="programme.jour === 'jeudi' ">-->
<!--      de {{ programme.heure_debut }} à {{ programme.heure_fin }} : {{ programme.nom }} organisé par {{ programme.prestataire }}-->
<!--    </li>-->
<!--  </ul>-->

<!--  <h2>Vendredi : </h2>-->
<!--  <ul v-for="(programme, index) in programmationStore.programmation" :key="index">-->
<!--    <li v-if="programme.jour === 'vendredi' ">-->
<!--      de {{ programme.heure_debut }} à {{ programme.heure_fin }} : {{ programme.nom }} organisé par {{ programme.prestataire }}-->
<!--    </li>-->
<!--  </ul>-->

<!--  <h2>Samedi : </h2>-->
<!--  <ul v-for="(programme, index) in programmationStore.programmation" :key="index">-->
<!--    <li v-if="programme.jour === 'samedi' ">-->
<!--      de {{ programme.heure_debut }} à {{ programme.heure_fin }} : {{ programme.nom }} organisé par {{ programme.prestataire }}-->
<!--    </li>-->
<!--  </ul>-->

<!--  <h2>Dimanche : </h2>-->
<!--  <ul v-for="(programme, index) in programmationStore.programmation" :key="index">-->
<!--    <li v-if="programme.jour === 'dimanche' ">-->
<!--      de {{ programme.heure_debut }} à {{ programme.heure_fin }} : {{ programme.nom }} organisé par {{ programme.prestataire }}-->
<!--    </li>-->
<!--  </ul>-->

<!--  <table>-->
<!--    <tr><th>Jour/Horaire</th><th>08h00-10h00</th><th>10h00-12h00</th><th>13h00-15h00</th><th>15h00-17h00</th></tr>-->
<!--    <tr><th rowspan="2">Jeudi</th></tr><tr></tr>-->
<!--    <tr><th>Vendredi</th></tr>-->
<!--    <tr><th>Samedi</th></tr>-->
<!--    <tr><th>Dimanche</th></tr>-->
<!--  </table>-->


<!--  </table>-->

  <table>
    <tr><th>Jeudi</th> <th>Vendredi</th> <th>Samedi</th> <th>Dimanche</th></tr>
    <tr>
      <td>
        <template v-for="(programme, index) in programmationStore.programmation" :key="index" class="activites">
          <div class="activite"  v-if="programme.jour === 'jeudi'">
            <span>{{ programme.heure_debut }}h -{{ programme.heure_fin }}h</span>
            <span>{{ programme.nom }}</span>
            <span>{{ programme.prestataire }}</span>
          </div>
        </template>
      </td>
      <td>
        <template v-for="(programme, index) in programmationStore.programmation" :key="index">
          <div class="activite"  v-if="programme.jour === 'vendredi'">
            <span>{{ programme.heure_debut }}h -{{ programme.heure_fin }}h</span>
            <span>{{ programme.nom }}</span>
            <span>{{ programme.prestataire }}</span>
          </div>
        </template>
      </td>
      <td>
        <template v-for="(programme, index) in programmationStore.programmation" :key="index">
          <div class="activite"  v-if="programme.jour === 'samedi'">
            <span>{{ programme.heure_debut }}h -{{ programme.heure_fin }}h</span>
            <span>{{ programme.nom }}</span>
            <span>{{ programme.prestataire }}</span>
          </div>
        </template>
      </td>
      <td>
        <template v-for="(programme, index) in programmationStore.programmation" :key="index">
          <div class="activite"  v-if="programme.jour === 'dimanche'">
            <span>{{ programme.heure_debut }}h -{{ programme.heure_fin }}h</span>
            <span>{{ programme.nom }}</span>
            <span>{{ programme.prestataire }}</span>
          </div>
        </template>
      </td>

    </tr>
  </table>

</div>


</template>

<script setup>
import {useProgrammationStore} from "@/stores/programmation.js";
const programmationStore = useProgrammationStore()
programmationStore.getProgrammation()

</script>

<style scoped>
.activite{
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 5px;
  margin: 0px;
}


</style>