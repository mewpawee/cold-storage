<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="data"
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
      v-if="data"
      v-model="mapClicked"
      transition="dialog-bottom-transition"
      width="80vw"
    >
      <v-card height="60vh">
        <Map
          :key="currentPosition[0] + currentPosition[1]"
          :location="currentPosition"
        />
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import Map from '@/components/Map/Map'
export default {
  props: {
    data: { type: Array, required: true, default: null },
    minimumThreshold: { type: Number, required: true, default: null },
    maximumThreshold: { type: Number, required: true, default: null },
  },
  components: {
    Map,
  },
  data() {
    return {
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
      sort: true,
      mapClicked: false,
      currentPosition: {},
    }
  },
  methods: {
    getColor(temp, maximum, minimum) {
      if (temp > maximum) return 'red'
      else if (temp < minimum) return 'blue'
      else return 'green'
    },
    clickMap(item) {
      this.currentPosition = item
      this.mapClicked = true
    },
  },
}
</script>
