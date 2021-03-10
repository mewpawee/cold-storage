<template lang="html">
  <div id="map-wrap" style="height: 80vh">
    <no-ssr>
      <l-map :zoom="6" :center="[13.1563, 101.5018]" style="z-index: 0">
        <l-tile-layer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        ></l-tile-layer>
        <!-- <l-geo-json :geojson="geojson"></l-geo-json> -->
        <p v-if="$fetchState.pending">Fetching...</p>
        <p v-else-if="$fetchState.error">An error occurred :(</p>
        <div v-else>
          <div>
            <l-marker
              v-if="groupData.length > 0"
              :lat-lng="[groupData[0].lat, groupData[0].lng]"
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
import { getGroupInfo } from '@/utils/userApi'
export default {
  middleware: 'auth',
  data() {
    return {
      groupData: [],
      selectedTruck: {},
    }
  },
  async fetch() {
    const todayDate = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000
    )
      .toISOString()
      .split('T')[0]
    const queryGroupInfo = await getGroupInfo(
      this.selectedGroupName,
      todayDate,
      todayDate
    )
    console.log(queryGroupInfo.data.groupData)
    if (queryGroupInfo.data.groupData) {
      this.groupData = queryGroupInfo.data.groupData
    }
  },
  computed: {
    selectedGroupName: {
      get() {
        return this.$nuxt.$store.state.selectedGroupName
      },
    },
  },
  watch: {
    selectedGroupName() {
      this.$fetch()
    },
  },
  activated() {
    // Call fetch again if last fetch more than 30 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch()
    }
  },
  methods: {
    onMarkerClicked() {
      this.$store.commit('set_right_drawer', true)
    },
  },
}
</script>
