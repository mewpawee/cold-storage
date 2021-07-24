<template>
  <div>
    <div ref="map" class="GMap__Wrapper"></div>
  </div>
</template>

<script>
import { Loader } from '@googlemaps/js-api-loader'
export default {
  props: {
    location: { type: Object, required: true },
  },
  data() {
    return {
      map: null,
      google: null,
    }
  },
  watch: {
    location() {
      this.google.maps.event.trigger(this.map, 'idle')
      this.initMap()
      this.addMarker()
    },
  },
  async mounted() {
    await this.load()
    this.initMap()
    this.addMarker()
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
        center: this.location,
        zoom: 13,
      })
    },
    addMarker() {
      const marker = new this.google.maps.Marker({
        position: this.location,
        clickable: false,
      })
      marker.setMap(this.map)
    },
  },
}
</script>
<style lang="scss">
.GMap__Wrapper {
  width: 100%;
  // position: 'relative';
}
</style>
