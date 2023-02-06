<template>
  <div>
    <apexchart width="380" type="donut" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
import axios from "axios";
export default {
  components: {},
  data: () => ({
    options: {},
    series: [],
    chartOptions: {}
  }),
  mounted() {
    this.getBrokenCountforWard();
  },
  methods: {
    async getBrokenCountforWard() {
      let AuthStr = sessionStorage.getItem("accessToken");

      await axios
        .get("http://localhost:8080/api/equipment/getBrokenCountforWard", {
          headers: { Authorization: "Bearer " + AuthStr }
        })
        .then(response => {
          // console.log(response);
          // console.log(response["data"]);
          if (response["status"] == 200) {
            this.availableCount = response["data"];
            var wardName = [];
            var broken = [];
            for (let obj of this.availableCount) {
              broken.push(obj.broken);
              wardName.push(obj.wname);
            }
            this.series = broken;
            // console.log(wardName);
            this.chartOptions = {
              chart: {
                width: 380,
                type: "donut"
              },
              stroke: {
                width: 5
              },
              dataLabels: {
                style: {
                  fontSize: "10px"
                }
              },
              labels: wardName,
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

              theme: {
                palette: "palette2"
              },
              title: {
                text: "Broken product status",
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
                      width: 100
                    },
                    legend: {
                      position: "bottom"
                    }
                  }
                }
              ]
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
