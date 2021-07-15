<template>
  <div>
    <v-row>
      <v-col cols="3" sm="3">
        <v-menu
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template #activator="{ on, attrs }">
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
      <v-col cols="2" sm="2">
        <v-input :messages="minimumThreshold + ' °C'">
          Minimum Threshold</v-input
        >
      </v-col>
      <v-col cols="2" sm="2">
        <v-input :messages="maximumThreshold + ' °C'">
          Maximum Threshold</v-input
        >
      </v-col>
      <v-col cols="3" sm="3">
        <v-btn @click.stop="handleGenerateCSV">Get CSV</v-btn>
      </v-col>
    </v-row>
    <v-row v-if="groupInfo.length != 0 && dates[0] && dates[1]">
      <v-card class="mx-auto my-5" min-width="344" width="55vw" elevation="2">
        <GoogleMap
          :key="groupInfo[0].date + groupInfo[0].time"
          :locations="groupInfo"
          :zoom="10"
        />
      </v-card>
    </v-row>
    <div v-else>
      <v-alert type="info" border="left"
        >Pick specific valid dates to see the routing.</v-alert
      >
    </div>
    <v-data-table
      :key="selectedGroupName"
      :headers="headers"
      :items="groupInfo"
      sort-by="date"
      :sort-desc="sort"
      class="elevation-1"
    >
      <template #[`item.temp`]="{ item }">
        <v-chip
          :color="getColor(item.temp, maximumThreshold, minimumThreshold)"
          dark
          >{{ item.temp }}
        </v-chip>
      </template>
      <template #[`item.map`]="{ item }">
        <v-btn x-small @click.stop="clickMap(item)"> Map </v-btn>
      </template>
      <template #[`item.status`]="{ item }">
        <v-col cols="12" sm="6">
          <v-alert
            v-if="item.temp > maximumThreshold"
            dense
            type="error"
            elevation="3"
            >Temp Too High</v-alert
          >
          <v-alert
            v-else-if="item.temp < minimumThreshold"
            dense
            type="error"
            color="blue"
            elevation="3"
            >Temp Too Low</v-alert
          >
          <v-alert
            v-else-if="
              item.temp > minimumThreshold && item.temp <= maximumThreshold
            "
            dense
            type="success"
            elevation="3"
            >Normal</v-alert
          >
        </v-col>
      </template>
    </v-data-table>
    <v-dialog
      v-if="groupInfo"
      v-model="mapClicked"
      transition="dialog-bottom-transition"
      width="80vw"
    >
      <PopMap
        :key="
          groupInfo.date + groupInfo.time + groupInfo.deviceId + currentPosition
        "
        :location="currentPosition"
      />
    </v-dialog>
  </div>
</template>

<script>
import PopMap from '@/components/Map/PopMap'
import GoogleMap from '@/components/Map/GoogleMap'
import { getGroupInfo, getLatestGroupInfo } from '@/utils/userApi'
import { download } from '@/utils/api'
export default {
  components: {
    PopMap,
    GoogleMap,
  },
  data() {
    return {
      sort: true,
      polling: null,
      dates: [],
      currentPosition: {},
      mapClicked: false,
      dialogDelete: false,
      groupInfo: [],
      headers: [
        { text: 'Date', value: 'date' },
        { text: 'Time', value: 'time' },
        { text: 'Device ID', value: 'deviceId' },
        { text: 'Temp (°C)', value: 'temp' },
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
    }
  },
  async fetch() {
    let queryGroupInfo
    if (this.dates[0] && this.dates[1]) {
      queryGroupInfo = await getGroupInfo(
        this.selectedGroupName,
        this.dates[0],
        this.dates[1]
      )
    } else {
      queryGroupInfo = await getLatestGroupInfo(this.selectedGroupName)
    }
    // console.log(queryGroupInfo)
    if (queryGroupInfo.data.groupData) {
      const result = await this.manipulateData(queryGroupInfo.data.groupData)
      this.groupInfo = result
    }
  },
  fetchDelay: 1000,
  fetchOnServer: false,
  computed: {
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
      }, 30000)
    },
    async handleGenerateCSV() {
      await download('/submission/generateCSV', this.groupInfo)
    },
    handlePickedDates() {
      this.$fetch()
    },
    manipulateData(data) {
      const result = []
      for (const thisData of data) {
        const dayTime = new Date(thisData.date).toLocaleString().split(', ')
        for (const device of thisData.devices) {
          result.push({
            date: dayTime[0],
            time: dayTime[1],
            lat: thisData.lat,
            lng: thisData.lng,
            deviceId: device.deviceId,
            temp: device.temp,
          })
        }
      }
      return result
    },
    getColor(temp, maximum, minimum) {
      if (temp > maximum) return 'red'
      else if (temp < minimum) return 'blue'
      else return 'green'
    },
    clickMap(item) {
      this.currentPosition = item
      // console.log(this.currentPosition)
      this.mapClicked = true
    },
  },
}
</script>
