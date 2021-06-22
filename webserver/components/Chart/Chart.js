import { Line, mixins } from 'vue-chartjs'
import annotationPlugin from 'chartjs-plugin-annotation'
import zoomPlugin from 'chartjs-plugin-zoom'

const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  data() {
    return {
      options: {
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
              value: '100',
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
              value: '10',
              borderColor: 'rgba(127, 0, 127, 0.5)',
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
              // time: {
              //   unit: 'second',
              //   unitStepSize: 1,
              //   displayFormats: {
              //     second: 'h:m:s',
              //   },
              // },
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
              enabled: true,
              mode: 'x',
            },
            zoom: {
              enabled: true,
              mode: 'x',
            },
          },
        },
      },
    }
  },
  mounted() {
    this.addPlugin([annotationPlugin, zoomPlugin])
    this.renderChart(this.chartData, this.options)
  },
}
