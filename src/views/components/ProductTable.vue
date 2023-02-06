<template>
  <v-app>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        class="shrink"
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="tableHeaders"
      :items="desserts"
      :search="search"
      sort-by="calories"
      class="elevation-1 mt-5"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>
            <SelectBox @callMethod="GetSelectedWard" />
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" :disabled="MySingletonService.data.role != 'ROLE_Admin'"  dark class="mb-2" v-bind="attrs" v-on="on">Assign</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <!-- <v-row> -->
                  <v-row>
                    <v-col cols="12" sm="10" md="10" class="ma-0 pa-0 mb-2">
                      <lable name="ward">Ward</lable>
                    </v-col>
                    <v-col cols="12" sm="10" md="10" class="ma-0 pa-0">
                      <v-select
                        item-text="name"
                        item-value="id"
                        v-model="wardValue"
                        :items="Ward"
                        v-on:change="test() "
                        solo
                        :disabled="editedIndex > -1"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="10" md="10" class="ma-0 pa-0 mb-2">
                      <lable name="eqpt">Equipment</lable>
                    </v-col>
                    <v-col cols="12" sm="10" md="10" class="ma-0 pa-0 mb-n2">
                      <v-select
                        item-text="name"
                        item-value="id"
                        v-model="equipmentValue"
                        :items="equipment"
                        v-on:change="HandleSelectedEquipment() "
                        solo
                        :disabled="editedIndex > -1"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="10" md="10" class="ma-0 pa-0 mt-0 mb-2 mt-n2">
                      <label>Available count - {{ equipmentAvilCount }}</label>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-text-field
                      v-model="editedItem.usable"
                      label="Usable count"
                      :rules="nameRules"
                      required
                      clearable
                      type="number"
                      class="shrink"
                    ></v-text-field>
                  </v-row>
                  <v-row>
                    <v-text-field
                      v-model="editedItem.broken"
                      label="Broken count"
                      :rules="nameRules"
                      required
                      clearable
                      type="number"
                      class="shrink"
                    ></v-text-field>
                  </v-row>
                  <div class="text-center mt-3">
                    <v-snackbar
                      v-model="equipmentUpdateError"
                      :timeout="timeout"
                      color="red accent-2"
                      absolute
                      left
                      rounded="pill"
                      bottom
                    >
                      Invalid Update, Pleace check again!
                      <template v-slot:action="{ attrs }">
                        <v-btn
                          color="blue"
                          text
                          v-bind="attrs"
                          @click="equipmentUpdateError = false"
                        >Close</v-btn>
                      </template>
                    </v-snackbar>
                  </div>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Are you sure you want to delete this?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </v-app>
</template>
<script>
import SelectBox from "@/views/components/SelectBox";
// import Form from "../components/Form.vue";
import MySingletonService from '../../singleton-service'
import axios from "axios";
export default {
  components: {
    SelectBox
  },
  data: () => ({
    dialog: false,
    itemId: -1,
    dialogDelete: false,
    search: "",
    SelectedWard: [],
    timeout: 3000,

    Ward: [],
    wardValue: [],
    defaultSelectedWard: {
      id: 0,
      name: "All"
    },

    equipment: [],
    equipmentValue: [],
    defaultSelectedEquipment: {
      id: 0,
      name: "All"
    },
    equipmentAvilCount: 0,
    equipmentUpdateError: false,

    previousTot: 0,
    afterTot: 0,

    headers: [
      {
        text: "Equipment",
        align: "start",
        sortable: false,
        value: "ename"
      },
      { text: "Ward", value: "wname", filterable: false, sortable: false },
      { text: "Usable", value: "usable", filterable: false },
      { text: "Broken", value: "broken", filterable: false },
      { text: "Actions", value: "actions", sortable: false }
    ],
    items: ["Blue", "Red", "Yellow", "Green"],
    desserts: [],
    availableCount: [],
    editedIndex: -1,
    editedItem: {
      usable: 0,
      broken: 0
    },
    defaultItem: {
      usable: 0,
      broken: 0
    },
    nameRules: [
      v => (v === "" || v === null || v === undefined ? "Required" : true),
      v => v >= 0 || " must be greater than or equal 0"
    ]
  }),

  mounted() {
    this.getAllItem();
    this.wardValue = this.defaultSelectedWard;
    this.getAllWard();
    this.equipmentValue = this.defaultSelectedEquipment;
    this.getAllEquipment();
    this.getAvailableCountOfEquipment();
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Add new equipments to ward"
        : "Update ward equipments";
    },
    
    tableHeaders() {
      return MySingletonService.data.role=="ROLE_Admin" ? this.headers : this.headers.filter(header => header.value !== 'actions');
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    SelectedWard: function() {
      var wardId = this.SelectedWard;
      if (this.SelectedWard == 0) {
        this.getAllItem();
      } else {
        var newArray = this.desserts.filter(function(el) {
          return el.ward_id == wardId;
        });
        this.desserts = newArray;
      }
    }
  },

  created() {
    this.initialize();
    this.MySingletonService = MySingletonService;
  },

  methods: {
    HandleSelectedEquipment() {
      // console.log("equipmentValue " + this.equipmentValue);
      this.getAvailableCountOfEquipment();
      var equpId = this.equipmentValue;
      if (equpId != 0) {
        var newArray = this.availableCount.filter(function(el) {
          return el.id == equpId;
        });
        var avlCount =
          newArray[0].count - (newArray[0].broken + newArray[0].usable);
        this.equipmentAvilCount = avlCount;
      } else {
        this.equipmentAvilCount = 0;
      }
    },
    initialize() {
      this.getAllItem();
    },
    async getAllItem() {
      let AuthStr = sessionStorage.getItem("accessToken");

      await axios
        .get("http://localhost:8080/api/equipment/getallWithWard", {
          headers: { Authorization: "Bearer " + AuthStr }
        })
        .then(response => {
          // console.log(response);
          // console.log(response["data"]);
          if (response["status"] == 200) {
            // console.log("successfully come data");
            this.desserts = response["data"];
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
            // console.log("successfully come data");
            this.availableCount = response["data"];
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
    async getAllWard() {
      let AuthStr = sessionStorage.getItem("accessToken");
      axios
        .get("http://localhost:8080/api/ward/getall", {
          headers: { Authorization: "Bearer " + AuthStr }
        })
        .then(response => {
          // console.log(response);
          // console.log(response["data"]);
          if (response["status"] == 200) {
            // console.log("successfully come ward data");
            this.Ward = response["data"];
            this.Ward.unshift(this.defaultSelectedWard);
            // console.log("wards", this.Ward);
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
    async getAllEquipment() {
      let AuthStr = sessionStorage.getItem("accessToken");
      axios
        .get("http://localhost:8080/api/equipment/getall", {
          headers: { Authorization: "Bearer " + AuthStr }
        })
        .then(response => {
          // console.log(response);
          // console.log(response["data"]);
          if (response["status"] == 200) {
            this.equipment = response["data"];
            this.equipment.unshift(this.defaultSelectedEquipment);
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

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.wardValue = {
        id: this.editedItem.ward_id,
        name: this.editedItem.wname
      };
      this.equipmentValue = {
        id: this.editedItem.equipment_id,
        name: this.editedItem.ename
      };
      var equpId = this.editedItem.equipment_id;
      var newArray = this.availableCount.filter(function(el) {
        return el.id == equpId;
      });
      var avlCount =
        newArray[0].count - (newArray[0].broken + newArray[0].usable);
      this.equipmentAvilCount = avlCount;
      this.previousTot = this.editedItem.broken + this.editedItem.usable;

      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);

      // console.log(item);
      this.itemId = item.id;
      // console.log("product id = " + this.itemId);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      let AuthStr = sessionStorage.getItem("accessToken");
      this.desserts.splice(this.editedIndex, 1);
      axios
        .delete(`http://localhost:8080/api/ward_equipment/deleteWardEquipment/${this.itemId}`, {
          headers: { Authorization: "Bearer " + AuthStr }
        })
        .catch(error => {
          this.errormg = error;
          alert("ERROR : Something went wrong " + JSON.stringify(error));
          this.alert = true;
        });
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedItem.usable = 0;
        this.editedItem.broken = 0;
        this.equipmentAvilCount = 0;
        this.editedIndex = -1;
        this.equipmentValue = {
          id: 0,
          name: "All"
        };
        this.wardValue = {
          id: 0,
          name: "All"
        };
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);

        if (
          parseInt(this.previousTot) + parseInt(this.equipmentAvilCount) >=
          parseInt(this.editedItem.usable) + parseInt(this.editedItem.broken)
        ) {
          let AuthStr = sessionStorage.getItem("accessToken");
          let obj = {
            usable: this.editedItem.usable,
            broken: this.editedItem.broken
          };
          axios
            .put(
              `http://localhost:8080/api/ward_equipment/updateWardEquipment/${this.editedItem.id}`,
              obj,
              {
                headers: { Authorization: "Bearer " + AuthStr }
              }
            )
            .then(response => {
              if (response["status"] == 200) {
                console.log("successfully edited");
                this.getAvailableCountOfEquipment();
              } else {
                console.log("successfully not edited");
              }
            })
            .catch(error => {
              this.errormg = error;
              // alert("ERROR : Something went wrong " + JSON.stringify(error));
              this.alert = true;
            });
          this.close();
          this.equipmentUpdateError = false;
          this.equipmentAvilCount = 0;

          this.editedItem.usable = 0;
          this.editedItem.broken = 0;
        } else {
          this.equipmentUpdateError = true;
          console.log("incorrect update");
        }
      } else {
        // console.log("call to add");
        if (
          parseInt(this.equipmentAvilCount) >=
          parseInt(this.editedItem.usable) + parseInt(this.editedItem.broken)
        ) {
          this.desserts.push(this.editedItem);
          let AuthStr = sessionStorage.getItem("accessToken");
          
          let obj = {
            hwe_equipments: this.equipmentValue,
            hwe_wards: this.wardValue,
            usable: this.editedItem.usable,
            broken: this.editedItem.broken
          };
          axios
            .post(`http://localhost:8080/api/ward_equipment/AddWardEquipment`, obj, {
              headers: { Authorization: "Bearer " + AuthStr }
            })
            .then(response => {
              // console.log("response ",response)
              if (response["status"] == 200) {
                console.log("successfully added");
                this.getAllItem();
              } else {
                console.log("successfully not added");
              }
            })
            .catch(error => {
              this.errormg = error;
              // alert("ERROR : Something went wrong " + JSON.stringify(error));
              this.alert = true;
            });
          this.close();
        } else {
          console.log("incorrect update");
        }
      }
    },
    // test() {
    //   console.log("select box call");
    // },
    GetSelectedWard: async function(id) {
      await this.getAllItem();
      this.SelectedWard = id;
    }
  }
};
</script>
<style >
.slectBox {
  margin-top: 35px;
}
.form-card {
  height: 500px;
  width: 600px;
  padding: 50px;
}
.v-text-field-custome {
  width: 40px;
}
</style>