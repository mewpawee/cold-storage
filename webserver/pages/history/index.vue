<template>
  <div>
    <v-row>
      <v-col cols="4" sm="3">
        <v-input :messages="minimumThreshold + ' °C'">
          Minimum Threshold</v-input
        >
      </v-col>
      <v-col cols="4" sm="3">
        <v-input :messages="maximumThreshold + ' °C'">
          Maximum Threshold</v-input
        >
      </v-col>
      <v-col cols="4" sm="3">
        <v-btn :disabled="!csv" @click.stop="handleGenerateCSV">Get CSV</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="5" sm="3">
        <v-menu
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template #activator="{ on, attrs }">
            <v-text-field
              :value="formatDate(startDate)"
              label="Start Date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="startDate"></v-date-picker>
        </v-menu>
      </v-col>
      <v-col>
        <TimeSelect
          label="Start Time"
          :value="startTime"
          @input="handleStartTime"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="5" sm="3">
        <v-menu
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template #activator="{ on, attrs }">
            <v-text-field
              :value="formatDate(endDate)"
              label="End Date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="endDate"></v-date-picker>
        </v-menu>
      </v-col>
      <v-col>
        <TimeSelect :value="endTime" label="End Time" @input="handleEndTime" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn :disabled="!search" @click.stop="handleSearch">Search</v-btn>
      </v-col>
    </v-row>
    <v-row v-if="groupInfo.length != 0 && search">
      <v-card class="mx-auto my-5" min-width="344" width="55vw" elevation="2">
        <RouteMap :locations="groupInfo" />
      </v-card>
    </v-row>
    <div v-else>
      <br />
      <v-alert type="info" border="left">Pick group, date, time.</v-alert>
    </div>
    <v-data-table
      :key="selectedGroupName"
      :headers="headers"
      :items="groupInfo"
      sort-by="date"
      :sort-desc="sort"
      class="elevation-1"
    >
      <template #[`item.date`]="{ item }">
        {{ item.dateString.split(', ')[0] }}
      </template>
      <template #[`item.time`]="{ item }">
        {{ item.dateString.split(', ')[1] }}
      </template>
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
        <v-col cols="12" md="9">
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
      <PopMap :key="currentPosition" :location="currentPosition" />
    </v-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import PopMap from '@/components/Map/PopMap'
import RouteMap from '@/components/Map/RouteMap'
import TimeSelect from '@/components/Time/TimeSelect'
import { getGroupInfo } from '@/utils/userApi'
import { download } from '@/utils/api'

const customParseFormat = require('dayjs/plugin/customParseFormat')

dayjs.extend(customParseFormat)

export default {
  components: {
    PopMap,
    RouteMap,
    TimeSelect,
  },
  data() {
    return {
      csv: false,
      sort: true,
      polling: null,
      dates: [],
      time: null,
      startDate: null,
      endDate: null,
      startTime: null,
      endTime: null,
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
    this.csv = false
    const queryGroupInfo = await getGroupInfo(
      this.selectedGroupName,
      this.startDateTime,
      this.endDateTime
    )
    if (queryGroupInfo.data.groupData) {
      this.groupInfo = await this.manipulateData(queryGroupInfo.data.groupData)
      this.csv = true
    }

    // else {
    //   queryGroupInfo = await getLatestGroupInfo(this.selectedGroupName)
    // }
  },
  fetchDelay: 1000,
  fetchOnServer: false,
  computed: {
    search() {
      if (this.startDateTime && this.endDateTime) return true
      else return false
    },
    startDateTime() {
      if (!this.startDate || !this.startTime) return null
      else {
        return dayjs(
          `${this.startDate} ${this.startTime}`,
          'YYYY-MM-DD H:mm A'
        ).toDate()
      }
    },
    endDateTime() {
      if (!this.endDate || !this.endTime) return null
      else {
        return dayjs(
          `${this.endDate} ${this.endTime}`,
          'YYYY-MM-DD H:mm A'
        ).toDate()
      }
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
  methods: {
    async handleGenerateCSV() {
      const csv = await this.csvData(this.groupInfo)
      await download('/tools/generateCSV', csv)
    },
    async manipulateData(data) {
      const result = []
      await data.forEach((thisData) => {
        result.push(
          ...thisData.devices.map((device) => {
            return {
              date: thisData.date,
              dateString: thisData.dateString,
              lat: thisData.lat,
              lng: thisData.lng,
              deviceId: device.deviceId,
              temp: device.temp,
            }
          })
        )
      })
      return result
    },
    csvData(data) {
      const result = data.map((thisData) => {
        const dateString = dayjs(thisData.date).format()
        return { ...thisData, date: dateString }
      })
      return result
    },
    getColor(temp, maximum, minimum) {
      if (temp > maximum) return 'red'
      else if (temp < minimum) return 'blue'
      else return 'green'
    },
    clickMap(item) {
      this.currentPosition = item
      this.mapClicked = true
    },
    handleStartTime(value) {
      this.startTime = value
    },
    handleEndTime(value) {
      this.endTime = value
    },
    handleSearch() {
      clearInterval(this.polling)
      this.$fetch()
    },
    formatDate(date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
  },
}
</script>
