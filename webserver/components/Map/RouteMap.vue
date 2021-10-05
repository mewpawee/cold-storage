<template>
  <div class="map_wrapper">
    <div ref="map" class="map"></div>
  </div>
</template>

<script>
import { Loader } from '@googlemaps/js-api-loader'
export default {
  props: {
    locations: { type: Array, required: true },
  },
  data() {
    return {
      map: null,
      google: null,
    }
  },
  async mounted() {
    await this.load()
    this.initMap()
    this.addMarker()
    this.drawRoute()
  },
  methods: {
    async load() {
      const GmapSettings = {
        apiKey: this.$config.googleAPI,
        version: 'weekly',
      }
      const loader = new Loader(GmapSettings)
      this.google = await loader.load()
    },
    initMap() {
      this.map = new this.google.maps.Map(this.$refs.map, {
        center: this.locations[0],
        zoom: 7,
      })
    },
    addMarker() {
      const start = this.locations[this.locations.length - 1]
      const end = this.locations[0]
      const startMarker = new this.google.maps.Marker({
        position: start,
        label: 'S',
      })
      const endMarker = new this.google.maps.Marker({
        position: end,
        label: 'E',
      })
      startMarker.setMap(this.map)
      endMarker.setMap(this.map)
      startMarker.addListener('click', () => {
        this.openInfoWindow(startMarker, start)
      })
      endMarker.addListener('click', () => {
        this.openInfoWindow(endMarker, end)
      })
    },
    openInfoWindow(marker, object) {
      const InfoWindow = new this.google.maps.InfoWindow({
        content: `${object.dateString}`,
        maxWidth: 200,
      })

      InfoWindow.open({
        anchor: marker,
        map: this.map,
        shouldFocus: false,
      })
    },
    filterNoSignal(location) {
      return location.lat !== 0 && location.lng !== 0
    },
    drawRoute() {
      const filterOut = this.locations.filter(this.filterNoSignal)
      const Path = new this.google.maps.Polyline({
        path: filterOut,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
        clickable: false,
      })
      Path.setMap(this.map)
    },
  },
}
</script>
<style lang="scss">
.map_wrapper {
  height: 100%;
  margin: 0;
  padding: 0;
  .map {
    height: 100%;
  }
}
</style>
