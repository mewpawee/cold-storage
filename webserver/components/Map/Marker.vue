<template>
  <l-marker :lat-lng="[13.1563, 101.5018]" @click="onMarkerClicked" />
</template>

<script>
import { LMarker } from 'vue2-leaflet'
export default {
  components: {
    LMarker
  },
  data() {
    return {
      truck_id: 'hello123',
      lat: 13.1563,
      lng: 101.5018
    }
  },
  methods: {
    onMarkerClicked() {
      this.$store.commit(
        'set_right_drawer',
        !this.$nuxt.$store.state.rightDrawer
      )
    }
  }
}
</script>
