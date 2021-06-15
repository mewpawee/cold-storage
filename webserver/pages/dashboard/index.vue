<template lang="html">
  <div class="d-flex flex-wrap">
    <v-card class="mx-4 my-12" min-width="344" width="40vw">
      <Data :data="groupData" />
    </v-card>
    <v-card class="mx-4 my-12" min-width="344" width="40vw">
      <GoogleMap
        :key="(groupData[0].lat, groupData[0].lng)"
        :location="groupData[0]"
      />
    </v-card>
  </div>
</template>

<script>
import { getGroupInfo } from '@/utils/userApi'
import GoogleMap from '@/components/Map/GoogleMap'
import Data from '@/components/Map/Data'
export default {
  components: {
    GoogleMap,
    Data,
  },
  middleware: 'auth',
  data() {
    return {
      groupData: [
        {
          data: 'nodata',
          lat: 13.7563,
          lng: 100.5018,
          devices: 'nodata',
        },
      ],
      polling: null,
    }
  },
  async fetch() {
    console.log(this.groupData)
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
    if (
      queryGroupInfo.data.groupData &&
      queryGroupInfo.data.groupData.length > 0
    ) {
      this.groupData = queryGroupInfo.data.groupData
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
