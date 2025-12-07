<template>
  <div>
    <!-- Mode normal : affichage de la map principale -->
    <ol-map 
      v-if="!showInteriorMap"
      style="height:400px; border: 2px solid red; width: 600px" 
      :pixel-ratio="1">

      <ol-view 
        :projection="projection"
        :center="[imgWidth/2, imgHeight/2]" 
        :zoom="1" 
      />

      <ol-image-layer>
        <ol-source-image-static 
          :url="'/mapConvention.jpg'"
          :imageExtent="extent"
          :projection="projection"
        />
      </ol-image-layer>

      <!-- hover interaction to highlight feature under cursor -->
      <ol-interaction-select :condition="pointerMove" @select="onHover" :multi="false" />

      <!-- selection interaction to capture clicks on features -->
      <ol-interaction-select :condition="selectCondition" @select="onSelect">
        <ol-style>
          <ol-style-stroke color="#00ff00" :width="3" />
          <ol-style-fill color="rgba(0,255,0,0.2)" />
        </ol-style>
      </ol-interaction-select>

      <ol-vector-layer>
        <ol-source-vector>
          
          <ol-feature 
            v-for="p in polygons" 
            :key="p.id" 
            :properties="{ id:p.id }">
            <ol-geom-polygon :coordinates="p.coords" />

            <ol-style>
              <ol-style-fill :color="p.fillColor" />
              <ol-style-stroke :color="p.strokeColor" :width="3" />
            </ol-style>
          </ol-feature>

          <ol-feature 
            v-for="m in markers" 
            :key="m.id" 
            :properties="{ id:m.id }">
            <ol-geom-point :coordinates="m.coords" />

            <ol-style>
              <!-- utiliser une icône au lieu d'un cercle -->
              <ol-style-icon :src="markerIcon" :scale="0.15" :anchor="[0.5, 1]"/>
            </ol-style>
          </ol-feature>

        </ol-source-vector>
      </ol-vector-layer>

      <ol-overlay v-if="selected" :position="popupPos">
        <div style="background:white; padding:8px; border:1px solid #aaa; max-width:240px;">
          <p><strong>ID:</strong> {{ selected }}</p>
          <button @click="handleStandClick">
            {{ isGymSelected ? 'Voir les stands' : 'Voir la page' }}
          </button>
        </div>
      </ol-overlay>

    </ol-map>

    <!-- Mode carte intérieure : affichage des stands intérieurs -->
    <div v-if="showInteriorMap">
      <button @click="closeInteriorMap" style="margin-bottom: 10px;">
        ← Retour à la carte principale
      </button>
      <ol-map 
        style="height:400px; border: 2px solid red; width: 600px" 
        :pixel-ratio="1">

        <ol-view 
          :projection="projection"
          :center="[imgWidth/2, imgHeight/2]" 
          :zoom="1" 
        />

        <ol-image-layer>
          <ol-source-image-static 
            :url="'/mapInterieur.jpg'"
            :imageExtent="extent"
            :projection="projection"
          />
        </ol-image-layer>

        <!-- hover interaction to highlight feature under cursor -->
        <ol-interaction-select :condition="pointerMove" @select="onHover" :multi="false" />

        <!-- selection interaction to capture clicks on features -->
        <ol-interaction-select :condition="selectCondition" @select="onSelectInterior">
          <ol-style>
            <ol-style-stroke color="#00ff00" :width="3" />
            <ol-style-fill color="rgba(0,255,0,0.2)" />
          </ol-style>
        </ol-interaction-select>

        <ol-vector-layer>
          <ol-source-vector>
            
            <ol-feature 
              v-for="p in interiorPolygons" 
              :key="p.id" 
              :properties="{ id:p.id }">
              <ol-geom-polygon :coordinates="p.coords" />

              <ol-style>
                <ol-style-fill :color="p.fillColor" />
                <ol-style-stroke :color="p.strokeColor" :width="3" />
              </ol-style>
            </ol-feature>

          </ol-source-vector>
        </ol-vector-layer>

        <ol-overlay v-if="selectedInterior" :position="popupPosInterior">
          <div style="background:white; padding:8px; border:1px solid #aaa; max-width:240px;">
            <p><strong>ID:</strong> {{ selectedInterior }}</p>
            <button @click="() => window.location.href='/detail/' + selectedInterior">
              Voir la page
            </button>
          </div>
        </ol-overlay>

      </ol-map>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, inject, computed } from 'vue'
import { pointerMove } from 'ol/events/condition'
import stands from '@/datasource/stands.js'


const imgWidth = 1436
const imgHeight = 976
const extent = [0, 0, imgWidth, imgHeight]

const polygons = computed(() => {
  return stands
    .filter((s) => s.zone !== 'intérieur' && s.map_infos && s.map_infos.type === 'polygon')
    .map((s) => ({
      coords: s.map_infos.coords,
      strokeColor: s.map_infos.color,
      fillColor: s.map_infos.color + "55",
      id: s.id,
    }))
})

// Polygons pour la carte intérieure (stands intérieurs uniquement, sans le gymnase)
const interiorPolygons = computed(() => {
  return stands
    .filter((s) => s.zone === 'intérieur' && s.id !== 'GYM-INT-001' && s.map_infos && s.map_infos.type === 'polygon')
    .map((s) => ({
      coords: s.map_infos.coords,
      strokeColor: s.map_infos.color,
      fillColor: s.map_infos.color + "55",
      id: s.id,
    }))
})

const markers = [
  { coords: [549.9057490788591,524.7362025937636], id:'marker-1' },
  
]

const markerIcon = ref('/marker.ico')

const selected = ref(null)
const popupPos = ref(null)
const selectedInterior = ref(null)
const popupPosInterior = ref(null)
const hoveredId = ref(null)
const showInteriorMap = ref(false)

// projection for pixel coordinates
const projection = reactive({ code: 'pixel', units: 'pixels', extent })

// selection via ol interaction
const selectConditions = inject('ol-selectconditions') || {}
const selectCondition = selectConditions.singleClick || selectConditions.click || selectConditions

// Déterminer si le stand sélectionné est le gymnase
const isGymSelected = computed(() => {
  return selected.value === 'GYM-INT-001'
})

function onHover(event) {
  const f = event.selected && event.selected[0]
  hoveredId.value = f ? f.get('id') : null
}

function onSelect(event) {
  const f = event.selected && event.selected[0]
  if (!f) {
    selected.value = null
    popupPos.value = null
    return
  }
  selected.value = f.get('id')
  // try to place popup at the geometry interior or at the event coordinate
  const geom = f.getGeometry && f.getGeometry()
  if (geom && geom.getInteriorPoint) {
    popupPos.value = geom.getInteriorPoint().getCoordinates()
  } else if (event.mapBrowserEvent && event.mapBrowserEvent.coordinate) {
    popupPos.value = event.mapBrowserEvent.coordinate
  } else {
    popupPos.value = null
  }
}

function onSelectInterior(event) {
  const f = event.selected && event.selected[0]
  if (!f) {
    selectedInterior.value = null
    popupPosInterior.value = null
    return
  }
  selectedInterior.value = f.get('id')
  // try to place popup at the geometry interior or at the event coordinate
  const geom = f.getGeometry && f.getGeometry()
  if (geom && geom.getInteriorPoint) {
    popupPosInterior.value = geom.getInteriorPoint().getCoordinates()
  } else if (event.mapBrowserEvent && event.mapBrowserEvent.coordinate) {
    popupPosInterior.value = event.mapBrowserEvent.coordinate
  } else {
    popupPosInterior.value = null
  }
}

function handleStandClick() {
  if (isGymSelected.value) {
    // Afficher la carte des stands intérieurs
    showInteriorMap.value = true
    selected.value = null
    popupPos.value = null
  } else {
    // Rediriger vers la page du stand
    window.location.href = '/detail/' + selected.value
  }
}

function closeInteriorMap() {
  showInteriorMap.value = false
  selectedInterior.value = null
  popupPosInterior.value = null
}
</script>