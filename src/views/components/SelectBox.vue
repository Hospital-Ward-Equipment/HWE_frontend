<template>
  <v-row align="center" class="slectBox">
    <v-col class="d-flex" cols="12" sm="8">
      <v-select
        item-text="name"
        item-value="id"
        v-model="wardValue"
        :items="wards"
        v-on:change="changeRoute()"
        solo
      ></v-select>
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
    
    changeRoute() {
      this.$emit("callMethod", this.wardValue);
    },
    async getAllItem() {
      let AuthStr = sessionStorage.getItem("accessToken");
      axios
        .get("http://localhost:8080/api/ward/getall", {
          headers: { Authorization: "Bearer " + AuthStr }
        })
        .then(response => {
          if (response["status"] == 200) {
            this.wards = response["data"];
            this.wards.unshift(this.defaultSelected);
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
      // defaultSelected: function() {
      //   console.log("changed - ", this.defaultSelected);
      // }
    }
  }
};
</script>