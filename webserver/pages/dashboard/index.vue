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
        <v-card-content>
          <Data :data="groupData" />
        </v-card-content>
      </v-card>
      <v-card class="mx-auto my-5" min-width="344" width="55vw" elevation="2">
        <v-card-content>
          <LineChart />
        </v-card-content>
      </v-card>
      <v-card class="mx-auto my-5" min-width="344" width="55vw" elevation="2">
        <v-card-content>
          <GoogleMap
            :key="(groupData[0].lat, groupData[0].lng)"
            :location="groupData[0]"
          />
        </v-card-content>
      </v-card>
    </div>
  </div>
</template>

<script>
import { getLatestGroupInfo } from '@/utils/userApi'
import GoogleMap from '@/components/Map/GoogleMap'
import Data from '@/components/Map/Data'
import LineChart from '@/components/Chart/LineChart.vue'
export default {
  components: {
    GoogleMap,
    Data,
    LineChart,
  },
  middleware: 'auth',
  data() {
    return {
      groupData: null,
      polling: null,
    }
  },
  async fetch() {
    // const todayDate = new Date(
    //   new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000
    // )
    //   .toISOString()
    //   .split('T')[0]
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
      }, 3000)
    },
    onMarkerClicked() {
      this.$store.commit('set_right_drawer', true)
    },
  },
}
</script>
