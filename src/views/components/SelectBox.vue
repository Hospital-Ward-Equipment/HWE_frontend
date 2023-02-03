<template>
  <v-row align="center" class="slectBox">
    <v-col class="d-flex" cols="12" sm="8">
      <v-select item-text="name" item-value="id" v-model="wardValue" :items="wards" v-on:change="changeRoute()" solo></v-select>
    </v-col>
  </v-row>
</template>
  <script>
import axios from "axios";

export default {
  data: () => ({
    defaultSelected: {
      id: 0,
      name: "All"
    },
    wards: [],
    wardValue: []
  }),
  mounted() {
    this.getAllItem();
    this.wardValue = this.defaultSelected;
  },
  methods: {
    // test() {
    //   console.log("test work");
    //   this.$emit("callMethod");
    // },
    test(){
      this.$emit("callMethod2")
    },
    changeRoute(){
      // console.log(this.wardValue)
      this.$emit("callMethod",this.wardValue);
    },
    async getAllItem() {
      let AuthStr = sessionStorage.getItem("accessToken");
      axios
        .get("http://localhost:8080/api/ward/getall", {
          headers: { Authorization: "Bearer " + AuthStr }
        })
        .then(response => {
          console.log(response);
          console.log(response["data"]);
          if (response["status"] == 200) {
            // console.log("successfully come data");
            this.wards = response["data"];
            this.wards.unshift(this.defaultSelected);
            // console.log("dessers", this.wards);
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
    },
    watch: {
      defaultSelected: function() {
        console.log("changed - ", this.defaultSelected);
      }
    }
  }
};
</script>