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
* {
  font-family: "JetBrains Mono", "JetBrains Mono Fallback", monospace;
}

/* --- 1. Conteneur général (pour la marge et le centrage) --- */
.container {
  padding: 40px 20px;
  max-width: 1200px;
  margin: 40px auto;
}

h1 {
  text-align: center;
  margin-bottom: 40px;
  color: #1a1a1a;
  font-family: "JetBrains Mono", monospace; /* Utilisation de la police */
  font-weight: 700;
  letter-spacing: 1px;
}

/* --- 2. Style du Tableau Principal --- */
table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;

  /* Style inspiré du menu : fond semi-transparent flou */
  background: rgba(235, 235, 235, 0.788);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-radius: 12px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  font-family: "JetBrains Mono", monospace; /* Utilisation de la police */
}

/* --- 3. Style de l'En-tête (Jours) --- */
th {
  background-color: #1a1a1a; /* Fond sombre comme le bouton LOGIN */
  color: #ffffff;
  padding: 18px 10px;
  font-size: 1.1em;
  font-weight: 600;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 0.5px;
}

/* --- 4. Style des Cellules de Données (Contenu) --- */
td {
  vertical-align: top;
  padding: 15px 10px;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background-color: transparent;
}

/* Enlève les bordures inutiles */
td:first-child { border-left: none; }
td:last-child { border-right: none; }
tr:last-child td { border-bottom: none; }

/* --- 5. Style de chaque activité (votre classe .activite) --- */
.activite {
  display: flex;
  flex-direction: column;

  /* Style de 'carte' inspiré de l'effet de survol des liens */
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 12px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.08);
  transition: all 0.25s cubic-bezier(.4,0,.2,1);
  border: 1px solid transparent;
}

.activite:hover {
  /* Effet de survol similaire au lien */
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid #1a1a1a;
  transform: translateY(-2px);
}

/* --- 6. Style des éléments de l'activité (span) --- */
/* Heure */
.activite span:nth-child(1) {
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 5px;
  font-size: 0.95em;
  letter-spacing: 0.2px;
}

/* Nom de l'activité */
.activite span:nth-child(2) {
  font-weight: 600;
  color: #333;
  font-size: 1.05em;
  margin-bottom: 5px;
}

/* Prestataire */
.activite span:nth-child(3) {
  font-style: italic;
  color: #666;
  font-size: 0.9em;
}

</style>