<template lang="html">
  <div v-if="groupData[0]">
    <GoogleMap
      :key="(groupData[0].lat, groupData[0].lng)"
      :location="groupData[0]"
    />
    <RightDrawer :data="groupData" />
  </div>
</template>

<script>
import { getGroupInfo } from '@/utils/userApi'
import GoogleMap from '@/components/Map/GoogleMap'
import RightDrawer from '@/components/Map/RightDrawer'
export default {
  components: {
    GoogleMap,
    RightDrawer,
  },
  middleware: 'auth',
  data() {
    return {
      groupData: [],
      polling: null,
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
