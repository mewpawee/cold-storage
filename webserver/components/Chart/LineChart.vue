<template>
  <div class="container">
    <line-chart :data="barChartData" :options="barChartOptions" :height="200" />
  </div>
</template>

<script>
import LineChart from './Chart'

const chartColors = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)',
}

export default {
  components: {
    LineChart,
  },
  data() {
    return {
      barChartData: {
        labels: ['Jan', 'Feb', 'Mar'],
        datasets: [
          {
            label: 'deviceId: 1',
            // backgroundColor: ["red", "orange", "yellow"],
            fill: false,
            backgroundColor: [
              chartColors.red,
              chartColors.orange,
              chartColors.yellow,
            ],
            borderColor: 'rgb(75, 192, 192)',
            data: [10, 15, 20],
          },
          {
            label: 'deviceId: 2',
            // backgroundColor: ["red", "orange", "yellow"],
            fill: false,
            backgroundColor: [
              chartColors.red,
              chartColors.orange,
              chartColors.yellow,
            ],
            borderColor: 'rgb(5, 19, 192)',
            data: [4, 5, 1],
          },
          
        ],
      },
      barChartOptions: {
        annotation: {
          annotations: [
            {
              drawTime: 'afterDraw', // overrides annotation.drawTime if set
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: '10',
              borderColor: 'red',
              borderWidth: 2,
            },
            {
              drawTime: 'afterDraw', // overrides annotation.drawTime if set
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: '5',
              borderColor: 'purple',
              borderWidth: 2,
            },
          ],
        },

        responsive: true,
        legend: {
          display: true,
        },
        title: {
          display: true,
          text: 'Temperature',
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    }
  },
}
</script>
