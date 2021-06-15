%
<template>
  <div v-if="location">
    <GMap
      language="en"
      :center="{ lat: location.lat, lng: location.lng }"
      :options="{ fullscreenControl: false }"
      :zoom="13"
    >
      <GMapMarker
        :key="location.id"
        :position="{ lat: location.lat, lng: location.lng }"
        @click="onMarkerClicked()"
      >
      </GMapMarker>
    </GMap>
  </div>
</template>

<script>
export default {
  props: ['location'],
  data() {
    return {}
  },
  methods: {
    onMarkerClicked() {
      this.$store.commit('set_right_drawer', true)
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
