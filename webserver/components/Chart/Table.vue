<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="data"
      sort-by="date"
      :sort-desc="sort"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-menu
          :close-on-content-click="false"
          :nudge-width="200"
          offset-y
          transition="slide-y-transition"
          right
          fixed
          style="position: absolute; left: 0"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on">
              <v-icon
                small
                left
                :color="
                  activeFilters.deviceId &&
                  activeFilters.deviceId.length < filters.deviceId.length
                    ? 'red'
                    : 'primary'
                "
              >
                mdi-filter-variant
              </v-icon>
              Filter Device ID
            </v-btn>
          </template>
          <v-list flat dense class="pa-0">
            <v-list-item-group
              multiple
              v-model="activeFilters.deviceId"
              class="py-2"
            >
              <template v-for="item in filters.deviceId">
                <v-list-item :key="`${item}`" :value="item" :ripple="false">
                  <template v-slot:default="{ active, toggle }">
                    <v-list-item-action>
                      <v-checkbox
                        :input-value="active"
                        :true-value="item"
                        @click="toggle"
                        color="primary"
                        :ripple="false"
                        dense
                      ></v-checkbox>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title v-text="item"></v-list-item-title>
                    </v-list-item-content>
                  </template>
                </v-list-item>
              </template>
            </v-list-item-group>
            <v-divider></v-divider>
            <v-row no-gutters>
              <v-col cols="6">
                <v-btn text block @click="toggleAll('deviceId')" color="info"
                  >Toggle all</v-btn
                >
              </v-col>
              <v-col cols="6">
                <v-btn text block @click="clearAll('deviceId')" color="error"
                  >Clear all</v-btn
                >
              </v-col>
            </v-row>
          </v-list>
        </v-menu>
      </template>
      <!-- <template v-for="(col, i) in filters" v-slot:[`header.${i}`]="{ header }">
        <div :key="i" style="display: inline-block; padding: 16px 0">
          {{ header.text }}
        </div>
        <div :key="i" style="float: right; margin-top: 8px">
          <v-menu
            :close-on-content-click="false"
            :nudge-width="200"
            offset-y
            transition="slide-y-transition"
            left
            fixed
            style="position: absolute; right: 0"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="indigo" icon v-bind="attrs" v-on="on">
                <v-icon
                  small
                  :color="
                    activeFilters[header.value] &&
                    activeFilters[header.value].length <
                      filters[header.value].length
                      ? 'red'
                      : 'default'
                  "
                >
                  mdi-filter-variant
                </v-icon>
              </v-btn>
            </template>
            <v-list flat dense class="pa-0">
              <v-list-item-group
                multiple
                v-model="activeFilters[header.value]"
                class="py-2"
              >
                <template v-for="item in filters[header.value]">
                  <v-list-item :key="`${item}`" :value="item" :ripple="false">
                    <template v-slot:default="{ active, toggle }">
                      <v-list-item-action>
                        <v-checkbox
                          :input-value="active"
                          :true-value="item"
                          @click="toggle"
                          color="primary"
                          :ripple="false"
                          dense
                        ></v-checkbox>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title v-text="item"></v-list-item-title>
                      </v-list-item-content>
                    </template>
                  </v-list-item>
                </template>
              </v-list-item-group>
              <v-divider></v-divider>
              <v-row no-gutters>
                <v-col cols="6">
                  <v-btn
                    text
                    block
                    @click="toggleAll(header.value)"
                    color="info"
                    >Toggle all</v-btn
                  >
                </v-col>
                <v-col cols="6">
                  <v-btn
                    text
                    block
                    @click="clearAll(header.value)"
                    color="error"
                    >Clear all</v-btn
                  >
                </v-col>
              </v-row>
            </v-list>
          </v-menu>
        </div>
      </template> -->
      <template #[`item.lat`]="{ item }">
        <div v-if="item.lat == 0">GPS No Signal</div>
        <div v-else>{{ item.lat }}</div>
      </template>
      <template #[`item.lng`]="{ item }">
        <div v-if="item.lng == 0">GPS No Signal</div>
        <div v-else>{{ item.lat }}</div>
      </template>
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
  components: {
    Map,
  },
  props: {
    data: { type: Array, required: true, default: null },
    minimumThreshold: { type: Number, required: true, default: null },
    maximumThreshold: { type: Number, required: true, default: null },
  },
  data() {
    return {
      headers: [
        {
          text: 'Date',
          value: 'date',
        },
        { text: 'Time', value: 'time', sortable: false },
        { text: 'Lat', value: 'lat', sortable: false },
        { text: 'Lng', value: 'lng', sortable: false },
        { text: 'Map', value: 'map', sortable: false },
        {
          text: 'Device ID',
          value: 'deviceId',
          sortable: false,
          filter: (value) => {
            return this.activeFilters.deviceId.includes(value)
          },
        },
        { text: 'Temp (°C)', value: 'temp' },
        {
          text: 'Status',
          value: 'status',
          sortable: false,
        },
      ],
      sort: true,
      filters: { deviceId: [] },
      activeFilters: {},
      mapClicked: false,
      currentPosition: {},
    }
  },
  created() {
    this.initialize()
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
    initialize() {
      for (const col in this.filters) {
        this.filters[col] = this.data
          .map((d) => {
            return d[col]
          })
          .filter((value, index, self) => {
            return self.indexOf(value) === index
          })
      }
      this.activeFilters = Object.assign({}, this.filters)
      // console.log(this.activeFilters)
    },
    toggleAll(col) {
      this.activeFilters[col] = this.data
        .map((d) => {
          return d[col]
        })
        .filter((value, index, self) => {
          return self.indexOf(value) === index
        })
    },

    clearAll(col) {
      this.activeFilters[col] = []
    },
  },
}
</script>

<style scoped>
.v-list-item--link:hover {
  background-color: rgba(0, 0, 0, 0.13);
}
</style>
