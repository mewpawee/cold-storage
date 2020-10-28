<template lang="html">
  <div id="map-wrap" style="height: 90vh;">
    <no-ssr>
      <l-map :zoom="6" :center="[13.1563, 101.5018]">
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></l-tile-layer>
        <l-geo-json :geojson="geojson"></l-geo-json>
        <p v-if="$fetchState.pending">Fetching...</p>
        <p v-else-if="$fetchState.error">An error occurred :(</p>
        <div v-else>
          <div v-for="truck in results.data.user.trucks" :key="truck._id">
            <div>
              <l-marker
                v-if="
                  truck.trucksData && Object.keys(truck.trucksData).length > 0
                "
                :lat-lng="[truck.trucksData[0].lat, truck.trucksData[0].lng]"
                @click="onMarkerClicked(truck)"
              >
                <l-icon
                  :key="truck._id"
                  :icon-size="[40, 40]"
                  :icon-anchor="[20, 40]"
                  icon-url="/truck.svg"
                />
                <l-popup>{{ selectedTruck.name }}</l-popup>
              </l-marker>
            </div>
          </div>
        </div>
      </l-map>
    </no-ssr>
  </div>
</template>

<script>
import thaiBorder from '@/static/thaiBorder.json'
import { getUserInfo } from '@/utils/userApi'
export default {
  middleware: 'auth',
  async fetch() {
    this.results = await getUserInfo()
    console.log(this.results.data.user.trucks)
    console.log(Object.keys(this.results.data.user.trucks[1].trucksData).length)
  },
  data() {
    return {
      selectedTruck: {},
      results: [],
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
