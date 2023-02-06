<template>
  <v-app>
    <Navbar />
    <WardTable/>
  </v-app>
</template>
<script>

import Navbar from '@/components/Navbar';
import WardTable from '@/views/components/WardTable';
import axios from "axios";
// import MySingletonService from '../singleton-service'


export default {
  components: {
    Navbar,
    WardTable
  },
  async created () {
    // console.log(MySingletonService.data)
  },
  mounted() {
    this.IsExpired();
  },
  methods: {
    
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
            
          } else {
            console.log("successfully not come data");
          }
        })
        .catch(error => {
          alert("ERROR : Something went wrong " + JSON.stringify(error));
        });
    }
  }
}
</script>
<style > 
  
  .slectBox{
    margin-top: 35px;
  }
</style>