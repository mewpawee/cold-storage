<template>
  <div class="container" style="position: relative; height: 100%">
    <v-btn
      v-for="t in time"
      :key="t"
      small
      :disabled="t == hour"
      localhost
      @click="onChangeHour(t)"
      >{{ t }}h</v-btn
    >
    <br />
    <v-btn small @click="zoom = !zoom">zoom: {{ zoom }}</v-btn>
    <v-btn small @click="pan = !pan">pan: {{ pan }}</v-btn>
    <client-only>
      <LineChart :hour="hour" :options="options" :chart-data="chartData" />
    </client-only>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { getGroupInfo } from '@/utils/userApi'

class Dataset {
  constructor(id) {
    const r = (id * 123) % 255
    const g = (id * 456) % 255
    const b = (id * 789) % 255
    this.label = 'Id-' + id
    this.data = []
    this.fill = false
    this.spanGaps = true
    this.borderColor = `rgb(${r}, ${g}, ${b})`
  }
}

export default {
  props: { group: { type: Array, default: null } },
  data() {
    return {
      zoom: false,
      pan: false,
      polling: null,
      hour: 3,
      time: [3, 6, 12, 24],
      chartData: { datasets: [] },
    }
  },
  async fetch() {
    const date = dayjs(new Date())
    const currentTime = date.toDate()
    const previousTime = date.add(-this.hour, 'hour').toDate()
    const queryGroupInfo = await getGroupInfo(
      this.group,
      previousTime,
      currentTime
    )
    // console.log(queryGroupInfo.data.groupData)
    const array = queryGroupInfo.data.groupData
    const dateList = []
    const datasets = {}
    const allowed = []
    for (let i = 1; i < 21; i++) {
      datasets[i] = new Dataset(i)
    }
    for (const item of array.reverse()) {
      const timestamp = dayjs(item.date).toDate()
      for (const key in datasets) {
        const foundDevice = item.devices.find(
          (device) => device.deviceId === key
        )
        if (foundDevice) {
          datasets[key].data.push(foundDevice.temp)
        } else {
          datasets[key].data.push(null)
        }
      }
      dateList.push(timestamp)
    }
    for (const key in datasets) {
      if (datasets[key].data.some((value) => value != null)) {
        allowed.push(key)
      }
    }
    const filtered = Object.keys(datasets)
      .filter((key) => allowed.includes(key))
      .reduce((obj, key) => {
        obj.push(datasets[key])
        return obj
      }, [])
    this.chartData = {
      labels: dateList,
      datasets: filtered,
    }
  },
  computed: {
    maximumThreshold() {
      return this.$nuxt.$store.state.settings.maximumThreshold
    },
    minimumThreshold() {
      return this.$nuxt.$store.state.settings.minimumThreshold
    },
    options() {
      return {
        animation: {
          duration: 0,
        },
        annotation: {
          annotations: [
            {
              // drawTime: 'afterDraw', // overrides annotation.drawTime if set
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.maximumThreshold,
              borderColor: 'rgba(255, 0, 0, 0.5)',
              borderWidth: 1,
              borderDash: [10],
              label: {
                backgroundColor: 'rgba(0,0,0,0.6)',
                enabled: true,
                content: 'Maximum Threshold',
              },
            },
            {
              drawTime: 'beforeDatasetsDraw', // overrides annotation.drawTime if set
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: this.minimumThreshold,
              borderColor: 'rgba(65, 105, 225, 0.5)',
              borderWidth: 1,
              borderDash: [10],
              label: {
                backgroundColor: 'rgba(0,0,0,0.6)',
                enabled: true,
                content: 'Minimum Threshold',
              },
            },
          ],
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: true,
        },
        title: {
          display: true,
          text: 'Device Data',
        },
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Time',
              },
              type: 'time',
            },
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Temperature',
              },
              ticks: {
                beginAtZero: false,
                callback: (value, index, values) => {
                  return value + '°C'
                },
              },
            },
          ],
        },
        plugins: {
          zoom: {
            pan: {
              enabled: this.pan,
              mode: 'x',
            },
            zoom: {
              enabled: this.zoom,
              mode: 'x',
            },
          },
        },
      }
    },
  },
  watch: {
    group() {
      this.$fetch()
    },
    hour() {
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
      }, 3000)
    },
    onChangeHour(hour) {
      this.hour = hour
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    },
  },
}
</script>
