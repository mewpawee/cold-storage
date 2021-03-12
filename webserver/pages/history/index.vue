<template>
  <div>
    <v-row>
      <v-col cols="6" sm="3">
        <v-menu
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dates"
              label="Pick Start and End Dates"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="dates"
            range
            @change="handlePickedDates"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="6" sm="3">
        <v-text-field v-model="alertThreshold" label="Alert Threshold" />
      </v-col>
    </v-row>
    <v-data-table
      :key="selectedGroupName"
      :headers="headers"
      :items="groupInfo"
      sort-by="date"
      sort-desc="false"
      class="elevation-1"
    >
      <template #[`item.date`]="{ item }">
        <span>{{ new Date(item.date).toLocaleString() }}</span>
      </template>
      <template #[`item.temp`]="{ item }">
        <v-chip :color="getColor(item.temp, alertThreshold)" dark>{{
          item.temp
        }}</v-chip>
      </template>
      <template #[`item.map`]="{ item }">
        <v-btn x-small @click.stop="clickMap(item)"> Map </v-btn>
      </template>
      <template #[`item.status`]="{ item }">
        <v-col cols="12" sm="6">
          <v-alert
            v-if="item.temp <= alertThreshold"
            dense
            type="success"
            elevation="3"
            >Normal</v-alert
          >
          <v-alert
            v-if="item.temp > alertThreshold"
            dense
            type="error"
            elevation="3"
            >Temp Too High</v-alert
          >
        </v-col>
      </template>
    </v-data-table>
    <v-dialog
      v-if="groupInfo"
      v-model="mapClicked"
      transition="dialog-bottom-transition"
      width="auto "
      :fullscreen="$vuetify.breakpoint.xsOnly"
    >
      <v-card-text>
        <PopMap
          :key="(groupInfo.date, groupInfo.deviceId)"
          :location="currentPosition"
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
    polling: null,
    dates: [
      new Date(
        new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000
      )
        .toISOString()
        .split('T')[0],
      new Date(
        new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000
      )
        .toISOString()
        .split('T')[0],
    ],
    alertThreshold: 23.5,
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
      { text: 'Status', value: 'status' },
    ],
    editedIndex: -1,
    editedItem: {
      name: '',
    },
    defaultItem: {
      name: '',
    },
  }),
  async fetch() {
    const queryGroupInfo = await getGroupInfo(
      this.selectedGroupName,
      this.dates[0],
      this.dates[1]
    )
    console.log(queryGroupInfo)
    const result = await this.manipulateData(queryGroupInfo.data.groupData)
    this.groupInfo = result
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
    selectedGroupName() {
      this.$fetch()
    },
  },
  activated() {
    // Call fetch again if last fetch more than 30 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 5000) {
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
    handlePickedDates() {
      this.$fetch()
    },
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
    getColor(temp, alertThreshold) {
      if (temp > alertThreshold) return 'red'
      else return 'green'
    },
    clickMap(item) {
      this.currentPosition = item
      console.log(this.currentPosition)
      this.mapClicked = true
    },
  },
}
</script>
