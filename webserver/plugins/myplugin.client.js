import Vue from 'vue'

import { Line, mixins } from 'vue-chartjs'
import annotationPlugin from 'chartjs-plugin-annotation'
import zoomPlugin from 'chartjs-plugin-zoom'

const { reactiveProp } = mixins

Vue.component('LineChart', {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    options: { type: Object, default: null },
    hour: { type: Number, default: null },
  },
  watch: {
    hour() {
      this.$data._chart.destroy()
      this.renderChart(this.chartData, this.options)
    },
    options() {
      this.$data._chart.destroy()
      this.renderChart(this.chartData, this.options)
    },
  },
  mounted() {
    this.addPlugin([annotationPlugin, zoomPlugin])
    this.renderChart(this.chartData, this.options)
  },
})
