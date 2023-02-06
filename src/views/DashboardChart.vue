<template>
  <v-app>
    <Navbar />

    <div>
      <div>
        <v-container>
          <v-row>
            <v-col sm="12" md="12" lg="7">
              <v-card class="pa-2" tile>
                <BarChart />
              </v-card>
            </v-col>
            <v-col sm="12" md="12" lg="5">
              
              <v-row>
                <v-card class="pa-2" outlined tile>
                  <HelloSvg />
                </v-card>
              </v-row>
              <v-row>
                <v-card class="pa-2" outlined tile>
                  <DonutChart />
                </v-card>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";
import DonutChart from "@/views/components/DonutChart";
import BarChart from "@/views/components/BarChart";
import HelloSvg from "@/views/components/HelloSvg.vue";
import axios from "axios";
import MySingletonService from '../singleton-service'
export default {
  components: {
    Navbar,
    DonutChart,
    BarChart,
    HelloSvg
  },
  data: () => ({

  }),
  async created () {
    await this.IsExpired()
    await this.SetPrivilage()
    
    console.log(MySingletonService.data)
  },
  mounted() {
    this.IsExpired();
  },
  methods: {
    SetPrivilage(){
      if(MySingletonService.data.role=="ROLE_User"){
        console.log("this is a user")
      }
      if(MySingletonService.data.role=="ROLE_Admin"){
        console.log("this a a admin")
      }
    },
    async IsExpired() {
      let AuthStr = sessionStorage.getItem("accessToken");
      await axios
        .get("http://localhost:8080/is-expired", {
          headers: { Authorization: "Bearer " + AuthStr }
        })
        .then(response => {
          if (response["status"] == 200) {
            if (response["data"].success) {
              this.$router.push({
                path: `/login`
              });
            } 
            else{
              MySingletonService.data = { role: response["data"].role }
            }
          } else {
            console.log("successfully not come data");
          }
        })
        .catch(error => {
          alert("ERROR : Something went wrong " + JSON.stringify(error));
        });
    }
  }
};
</script>
<style >
.d-flex {
  display: flex;
}

.align-items-center {
  align-items: center;
}
</style>
