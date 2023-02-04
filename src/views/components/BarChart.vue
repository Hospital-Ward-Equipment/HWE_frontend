<template>
  <div id="chart">
    <apexchart type="bar" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    availableCount: [],

    series: [],
    chartOptions: {}
  }),
  mounted() {
    this.getAvailableCountOfEquipment();
  },
  methods: {
    
    async getAvailableCountOfEquipment() {
      let AuthStr = sessionStorage.getItem("accessToken");

      await axios
        .get("http://localhost:8080/api/equipment/getBrokenDetailsForChart", {
          headers: { Authorization: "Bearer " + AuthStr }
        })
        .then(response => {
          // console.log(response);
          // console.log(response["data"]);
          if (response["status"] == 200) {
            this.availableCount = response["data"];
            var X = [];
            var usable = [];
            var broken = [];
            var nonAllocated = [];
            for (let obj of this.availableCount) {
              X.push(obj.name);
              usable.push(obj.usable);
              broken.push(obj.broken);
              nonAllocated.push(obj.count - (obj.usable + obj.broken));
            }
            

            this.series = [
              {
                name: "Usable",
                data: usable
              },
              {
                name: "Broken",
                data: broken
              },
              {
                name: "Available",
                data: nonAllocated
              }
            ];

            this.chartOptions = {
              chart: {
                type: "bar",
                stacked: true
              },
              plotOptions: {
                bar: {
                  barHeight: '40%',
                  horizontal: true,
                  radius: 10
                }
              },
              xaxis: {
                categories: X
              },
              colors: ["#00E396", "#ff6b6b","#00d2d3"],
              title: {
                text: "Equipment distribution",
                align: "left",
                margin: 20,
                offsetY: -8,
                style: {
                  fontSize: "15px"
                }
              }
            };
            

          } else {
            console.log("successfully not come data");
            this.$router.push({
              path: `/login`
            });
          }
        })
        .catch(error => {
          this.errormg = error;
          // alert("ERROR : Something went wrong " + JSON.stringify(error));
          this.alert = true;
        });
    }
  }
};
</script>
