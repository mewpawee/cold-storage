<template lang="html">
  <div id="map-wrap" style="height: 90vh;">
    <no-ssr>
      <l-map :zoom="6" :center="[13.1563, 101.5018]">
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></l-tile-layer>
        <l-geo-json :geojson="geojson"></l-geo-json>
        <l-marker :lat-lng="[13.1563, 101.5018]"></l-marker>
      </l-map>
    </no-ssr>
  </div>
</template>

<script>
import thaiBorder from '../../static/thaiBorder.json'
export default {
  middleware: 'auth',
  data() {
    return {
      geojson: thaiBorder
    }
  }
}
</script>
