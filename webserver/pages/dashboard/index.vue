<template lang="html">
  <div id="map-wrap" style="height: 90vh;">
    <no-ssr>
      <l-map :zoom="6" :center="[13.1563, 101.5018]">
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></l-tile-layer>
        <l-geo-json :geojson="geojson"></l-geo-json>
        <l-marker
          v-for="(truck, i) in trucks"
          :key="i"
          :lat-lng="[truck.lat, truck.lng]"
          @click="onMarkerClicked(truck)"
        >
          <l-icon
            :key="i"
            :icon-size="[40, 40]"
            :icon-anchor="[20, 40]"
            icon-url="/truck.svg"
          />
          <l-popup>{{ selectedTruck.id }}</l-popup>
        </l-marker>
      </l-map>
    </no-ssr>
  </div>
</template>

<script>
import thaiBorder from '@/static/thaiBorder.json'
export default {
  middleware: 'auth',
  data() {
    return {
      selectedTruck: {},
      trucks: [
        {
          truckId: 'Hello',
          temp: 20.5,
          lat: 13.1563,
          lng: 101.5018
        },
        {
          truckId: 'World',
          temp: 20.5,
          lat: 12.4563,
          lng: 101.1018
        }
      ],
      geojson: thaiBorder
    }
  },
  mounted() {
    this.selectedTruck = this.$nuxt.$store.state.truck
  },
  methods: {
    onMarkerClicked(truckInfo) {
      this.$store.commit('set_right_drawer', true)
      this.$store.commit('set_truck_info', truckInfo)
    }
  }
}
</script>
