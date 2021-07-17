%
<template>
  <div v-if="locations" :style="style">
    <GMap
      language="en"
      :center="{ lat: locations[0].lat, lng: locations[0].lng }"
      :options="{ fullscreenControl: false }"
      :zoom="13"
    >
      <GMapMarker
        v-for="location in locations"
        :key="location.date"
        :position="{ lat: location.lat, lng: location.lng }"
      >
        <!-- <GMapInfoWindow :options="{ maxWidth: 200 }">
          <p>
            <b>Date:</b>
            {{ new Date(location.date).toLocaleString().split(', ')[0] }}
          </p>
          <p>
            <b>Time:</b>
            {{ new Date(location.date).toLocaleString().split(', ')[1] }}
          </p>
        </GMapInfoWindow> -->
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
      style: {
        height: '20vw',
        minHeight: '200px',
        width: '100%',
      },
    }
  },
}
</script>
<style lang="scss">
.GMap__Wrapper {
  width: 100%;
  // position: 'relative';
}
</style>
