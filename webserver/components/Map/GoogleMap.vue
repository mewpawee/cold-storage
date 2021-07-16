<template>
  <div v-if="locations" :style="style">
    <GMap
      ref="gMap"
      language="en"
      :center="{ lat: locations[0].lat, lng: locations[0].lng }"
      :options="{ fullscreenControl: false }"
      :zoom="zoom"
      @bounds_changed="checkForMarkers"
    >
      <GMapMarker
        v-for="location in locations"
        :key="location.date + ' ' + location.time"
        color="blue"
        :position="{
          lat: location.lat,
          lng: location.lng,
        }"
        @click="currentLocation = location"
      >
        <GMapInfoWindow :options="{ maxWidth: 200 }">
          <p>
            <b>Date:</b>
            {{ new Date(location.date).toLocaleString().split(', ')[0] }}
          </p>
          <p>
            <b>Time:</b>
            {{ new Date(location.date).toLocaleString().split(', ')[1] }}
          </p>
        </GMapInfoWindow>
      </GMapMarker>
    </GMap>
  </div>
</template>

<script>
export default {
  props: {
    locations: { type: Array, required: true },
    zoom: { type: Number, required: false, default: 13 },
  },
  data() {
    return {
      currentLocation: {},
      style: {
        height: '20vw',
        minHeight: '200px',
        width: '100%',
      },
    }
  },
  methods: {
    checkForMarkers() {
      this.locations.forEach((location, i) => {
        location.visible = this.$refs.gMap.map
          .getBounds()
          .contains(this.$refs.gMap.markers[i].getPosition())
      })

      this.locationsVisibleOnMap = this.locations
        .filter((l) => l.visible)
        .map((l) => l.date)
        .join(', ')
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
