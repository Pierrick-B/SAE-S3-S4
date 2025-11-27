<template>
  <ol-map 
    style="height:800px;border: 1px solid black; width: 1200px" 
    :pixel-ratio="1">

    <ol-view 
      :projection="projection"
      :center="[imgWidth/2, imgHeight/2]" 
      :zoom="2" 
    />

    <ol-image-layer>
      <ol-source-image-static 
        :url="'/mapConvention.jpg'"
        :imageExtent="extent"
        :projection="projection"
      />
    </ol-image-layer>

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
            <ol-style-fill :color="(p.color || '#00ff00') + '55'" />
            <ol-style-stroke :color="p.color || '#00ff00'" :width="3" />
          </ol-style>
        </ol-feature>

        <ol-feature 
          v-for="m in markers" 
          :key="m.id" 
          :properties="{ id:m.id }">
          <ol-geom-point :coordinates="m.coords" />

          <ol-style>
            <!-- utiliser une icône au lieu d'un cercle -->
            <ol-style-icon :src="markerIcon" :scale="0.15" :anchor="[0.5, 1]" />
          </ol-style>
        </ol-feature>

      </ol-source-vector>
    </ol-vector-layer>

    <ol-overlay v-if="selected" :position="popupPos">
      <div style="background:white; padding:8px; border:1px solid #aaa;">
        <p>ID : {{ selected }}</p>
        <button @click="() => window.location.href='/detail/' + selected">
          Voir la page
        </button>
      </div>
    </ol-overlay>

  </ol-map>

</template>

<script setup>
import { ref, reactive, inject, computed } from 'vue'
import stands from '@/datasource/stands.js'


const imgWidth = 1436
const imgHeight = 976
const extent = [0, 0, imgWidth, imgHeight]

const mapStands = computed(() => {
  // if `user` isn't defined yet or falsy, return empty array (keeps original guard)
  if (typeof user === 'undefined' || !user.value) return []
  // keep only stands that actually have a non-null `map_infos` property
  return stands.filter(stand =>
    Object.prototype.hasOwnProperty.call(stand, 'map_infos') && stand.map_infos != null
  )
})

// `polygons` must contain only the `map_infos` attribute from each stand
// console.log(stands[0].map_infos);

// const polygons = computed(() => {
//   const ms = mapStands.value || []
//   return ms.map(s => s.map_infos)
// })

// // number of polygons (computed from the `polygons` ref)
// const polygonLength = computed(() => polygons.value.length)


const polygons = [
  {
    coords: [[[636.5771408872839,562.4068018051612],[646.0731792352947,512.1833100979047],[697.2462747773521,519.9911638507135],[688.277794115342,571.0587478555709],[636.5771408872839,562.4068018051612]]],
    color: '#00ff00',
    id: 'stand-A'
  },
  {
    coords: [[[631.1626528063092,585.3273152746675],[676.0412115135127,592.7075345297495],[667.6371468126393,637.5007727831368],[623.0998699206997,630.3338546625947],[631.1626528063092,585.3273152746675]]],
    color: '#00ff00',
    id: 'stand-B'
  },
  {
    coords: [[[757.4817379765262,658.5364012816275],[804.1093659869573,665.8313000828934],[812.2148090994748,619.6302743415425],[766.4830458541114,612.1220744057366],[757.4817379765262,658.5364012816275]]],
    color: '#00ff00',
    id: 'stand-C'
  },
  {
    coords: [[[777.8229066740574,592.0999824583874],[821.2083574394815,598.7976380829416],[829.356460778907,555.4548475444253],[785.8856895596671,547.5200453395395],[777.8229066740574,592.0999824583874]]],
    color: '#00ff00',
    id: 'stand-D'
  },
]

const markers = [
  { coords: [549.9057490788591,524.7362025937636], id:'marker-1' },
  
]

const markerIcon = ref('/marker.ico')

const selected = ref(null)
const popupPos = ref(null)

// projection for pixel coordinates
const projection = reactive({ code: 'pixel', units: 'pixels', extent })

// selection via ol interaction
const selectConditions = inject('ol-selectconditions') || {}
const selectCondition = selectConditions.singleClick || selectConditions.click || selectConditions

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
</script>