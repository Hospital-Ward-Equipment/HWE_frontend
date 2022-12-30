<template>
  <div>
    <apexchart width="380" type="donut" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
export default {
  components: {},
  data: () => ({
    options: {},
    series: [45, 55],
    chartOptions: {
      chart: {
        width: 380,
        type: "donut"
      },
      stroke: {
        width: 0
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                showAlways: true,
                show: true
              }
            }
          }
        }
      },
      labels: ["Usable", "Broken"],

      theme: {
        palette: "palette2"
      },
      title: {
        text: "Product Status",
        align: "left",
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          fontFamily: undefined,
          color: "#263238"
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    }
  }),
  methods: {}
};
</script>
