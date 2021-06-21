<template>
  <div class="container" style="position: relative; height: 100%">
    <v-btn
      v-for="t in time"
      small
      @click="onChangeHour(t)"
      :key="t"
      :disabled="t == hour"
      >{{ t }}h</v-btn
    >
    <line-chart :chart-data="chartData" />
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { getGroupInfo } from '@/utils/userApi'
import LineChart from './Chart'

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
  components: {
    LineChart,
  },
  props: ['group'],
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
  data() {
    return {
      polling: null,
      hour: 3,
      time: [3, 6, 12, 24],
      chartData: { datasets: [] },
    }
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
