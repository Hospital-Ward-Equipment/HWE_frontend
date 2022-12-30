<template>
  <div id="chart">
    <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
export default {
  data: () => ({
    series: [
      {
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
      }
    ],
    chartOptions: {
      chart: {
        type: "bar",
        height: 350
      },
      title: {
              text: "Product distribution"
            },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: [
          "item 1",
          "item 2",
          "item 3",
          "item 4",
          "item 5",
          "item 6",
          "item 7",
          "item 8",
          "item 9",
          "item 10"
        ]
      }
    }
  }),
  methods: {}
};
</script>
