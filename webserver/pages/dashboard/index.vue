<template lang="html">
  <div id="map-wrap" style="height: 80vh;">
    <no-ssr>
      <l-map :zoom="6" :center="[13.1563, 101.5018]" style="z-index: 0;">
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></l-tile-layer>
        <!-- <l-geo-json :geojson="geojson"></l-geo-json> -->
        <p v-if="$fetchState.pending">Fetching...</p>
        <p v-else-if="$fetchState.error">An error occurred :(</p>
        <div v-else>
          <div>
            <l-marker
              v-if="selectedGroup && Object.keys(selectedGroup).length > 0"
              :lat-lng="[selectedGroup[0].lat, selectedGroup[0].lng]"
              @click="onMarkerClicked()"
            >
              <l-icon
                :icon-size="[40, 40]"
                :icon-anchor="[20, 40]"
                icon-url="/truck.svg"
              />
            </l-marker>
          </div>
        </div>
      </l-map>
    </no-ssr>
  </div>
</template>

<script>
// import thaiBorder from '@/static/thaiBorder.json'
import { getUserGroup } from '@/utils/userApi'
export default {
  middleware: 'auth',
  async fetch() {
    this.userGroup = await getUserGroup()
    console.log(this.userGroup)
    this.$store.commit('set_groups', this.userGroup.data.user.groups)
  },
  fetchDelay: 1000,
  fetchOnServer: false,
  data() {
    return {
      selectedTruck: {},
      userGroup: {},
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
      ]
      // geojson: thaiBorder
    }
  },
  computed: {
    selectedGroup: {
      get() {
        return this.$nuxt.$store.state.selectedGroup
      }
    }
  },
  methods: {
    onMarkerClicked() {
      this.$store.commit('set_right_drawer', true)
    }
  }
}
</script>
