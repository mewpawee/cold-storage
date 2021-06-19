import { Line } from 'vue-chartjs'
import annotationPlugin from 'chartjs-plugin-annotation'

export default {
  extends: Line,
  props: ['data', 'options'],
  mounted() {
    this.addPlugin([annotationPlugin])
    this.renderChart(this.data, this.options)
  },
}
