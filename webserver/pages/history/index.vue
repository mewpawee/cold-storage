<template>
  <div>
    <v-data-table
      :key="selectedGroupName"
      :headers="headers"
      :items="groupInfo"
      sort-by="date"
      class="elevation-1"
    >
      <template #[`item.date`]="{ item }">
        <span>{{ new Date(item.date).toLocaleString() }}</span>
      </template>
      <template #[`item.map`]="{ item }">
        <v-btn x-small @click.stop="clickMap(item)"> Map </v-btn>
      </template>
    </v-data-table>

    <v-dialog
      v-model="mapClicked"
      transition="dialog-bottom-transition"
      width="auto "
      :fullscreen="$vuetify.breakpoint.xsOnly"
    >
      <v-card-text>
        <PopMap :key="currentPosition" :location="currentPosition"
      /></v-card-text>
    </v-dialog>
  </div>
</template>

<script>
import PopMap from '@/components/Map/PopMap'
import { getGroupInfo } from '@/utils/userApi'
export default {
  components: {
    PopMap,
  },
  data: () => ({
    currentPosition: {},
    mapClicked: false,
    dialogDelete: false,
    groupInfo: [],
    headers: [
      { text: 'Date, Time', value: 'date' },
      { text: 'Device ID', value: 'deviceId' },
      { text: 'Temp', value: 'temp' },
      { text: 'Lat', value: 'lat' },
      { text: 'Lng', value: 'lng' },
      { text: 'Map', value: 'map' },
    ],
    editedIndex: -1,
    editedItem: {
      name: '',
    },
    defaultItem: {
      name: '',
    },
  }),
  fetch() {
    this.getInfo(this.selectedGroupName)
  },
  fetchDelay: 1000,
  fetchOnServer: false,
  computed: {
    selectedGroupName: {
      get() {
        return this.$nuxt.$store.state.selectedGroupName
      },
    },
  },
  watch: {
    selectedGroupName(val) {
      this.getInfo(val)
    },
  },
  methods: {
    manipulateData(data) {
      const result = []
      for (const thisData of data) {
        for (const device of thisData.devices) {
          result.push({
            date: thisData.date,
            lat: thisData.lat,
            lng: thisData.lng,
            deviceId: device.deviceId,
            temp: device.temp,
          })
        }
      }
      return result
    },
    async getInfo(groupName) {
      const queryGroupInfo = await getGroupInfo(groupName)
      const result = await this.manipulateData(queryGroupInfo.data.groupData)
      this.groupInfo = result
      // console.log(this.groupInfo)
    },
    clickMap(item) {
      this.currentPosition = item
      console.log(this.currentPosition)
      this.mapClicked = true
    },
  },
}
</script>
