<template lang="html">
  <div>
    <div v-if="groupData == null">
      <v-alert type="info" border="left"
        >Haven't selected group or no data</v-alert
      >
      <div class="d-flex flex-wrap">
        <v-skeleton-loader
          type="card"
          class="mx-auto my-12"
          min-width="344"
          width="40vw"
          elevation="2"
        />
        <v-skeleton-loader
          type="card"
          class="mx-auto my-12"
          min-width="344"
          width="40vw"
          elevation="2"
        />
      </div>
    </div>

    <div v-else class="d-flex flex-wrap">
      <v-card class="mx-auto my-5" min-width="344" width="25vw" elevation="2">
        <v-card-title>Latest Data</v-card-title>
        <v-card-subtitle
          ><strong>Threshold:</strong> minimum:
          <strong>{{ minimumThreshold }} °C</strong> maximum:
          <strong>{{ maximumThreshold }} °C</strong></v-card-subtitle
        >
        <Data :data="groupData" />
      </v-card>
      <v-card class="mx-auto my-5" min-width="344" width="55vw" elevation="2">
        <LineChart :group="selectedGroupName" />
      </v-card>
      <v-card class="mx-auto my-5" min-width="344" width="55vw" elevation="2">
        <Map :location="{ lat: groupData[0].lat, lng: groupData[0].lng }" />
      </v-card>
    </div>
  </div>
</template>

<script>
import { getLatestGroupInfo } from '@/utils/userApi'
import Map from '@/components/Map/Map'
import Data from '@/components/Map/Data'
import LineChart from '@/components/Chart/LineChart.vue'
export default {
  components: {
    Map,
    Data,
    LineChart,
  },
  data() {
    return {
      groupData: null,
      polling: null,
    }
  },
  async fetch() {
    const queryGroupInfo = await getLatestGroupInfo(this.selectedGroupName, 1)
    if (
      queryGroupInfo.data.groupData &&
      queryGroupInfo.data.groupData.length > 0
    ) {
      this.groupData = queryGroupInfo.data.groupData
    } else {
      this.groupData = null
    }
  },
  computed: {
    size() {
      return this.$nuxt.$vuetify.breakpoint.width / 1.7
    },
    selectedGroupName: {
      get() {
        return this.$nuxt.$store.state.selectedGroupName
      },
    },
    maximumThreshold() {
      return this.$nuxt.$store.state.settings.maximumThreshold
    },
    minimumThreshold() {
      return this.$nuxt.$store.state.settings.minimumThreshold
    },
  },
  watch: {
    selectedGroupName() {
      this.$fetch()
    },
  },
  beforeDestroy() {
    clearInterval(this.polling)
  },
  created() {
    this.pollData()
  },
  methods: {
    pollData() {
      this.polling = setInterval(() => {
        this.$fetch()
      }, 15000)
    },
  },
}
</script>
