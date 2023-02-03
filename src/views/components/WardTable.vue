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
      :headers="headers"
      :items="desserts"
      :search="search"
      sort-by="ename"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">New Ward</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="10" md="10">
                      <v-text-field v-model="editedItem.name" label="Ward name"></v-text-field>
                    </v-col>
                    
                  </v-row>
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
              <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
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
import axios from "axios";
export default {
  components: {},
  data: () => ({
    dialog: false,
    itemId: -1,
    dialogDelete: false,
    search: "",
    defaultSelected: {
      id: 1,
      name: "All"
    },

    headers: [
      {
        text: "Ward Id",
        align: "center",
        sortable: false,
        value: "id",
        filterable: false
      },
      { text: "Name", value: "name",align: "center", filterable: true, sortable: false },
      { text: "Actions", value: "actions",align: "center", sortable: false }
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      id: 0,
      
    },
    defaultItem: {
      name: "",
      id: 0,
    },
    nameRules: [
      v => !!v || " required"
    ]
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add New Ward" : "Edit Ward";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },

  created() {
    this.initialize();
  },
  mounted() {
    this.getAllItem();
  },
  methods: {
    initialize() {},
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
            console.log("successfully come data");
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

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);

      console.log(item);
      this.itemId = item.id;
      console.log("product id = " + this.itemId);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      let AuthStr = sessionStorage.getItem("accessToken");
      this.desserts.splice(this.editedIndex, 1);
      axios
        .delete(`http://localhost:8080/api/ward/deleteWard/${this.itemId}`, {
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
        this.editedIndex = -1;
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
        let AuthStr = sessionStorage.getItem("accessToken");
        let obj = {
          name: this.editedItem.name,
        };
        console.log(AuthStr);
        axios
          .put(
            `http://localhost:8080/api/ward/updateWard/${this.editedItem.id}`,
            obj,
            {
              headers: { Authorization: "Bearer " + AuthStr }
            }
          )
          .then(response => {
            if (response["status"] == 200) {
              console.log("successfully edited");
            } else {
              console.log("successfully not edited");
            }
          })
          .catch(error => {
            this.errormg = error;
            // alert("ERROR : Something went wrong " + JSON.stringify(error));
            this.alert = true;
          });
      } else {
        this.desserts.push(this.editedItem);
        let AuthStr = sessionStorage.getItem("accessToken");
        let obj = {
          name: this.editedItem.name
        };
        axios
          .post(`http://localhost:8080/api/ward/AddWard`, obj, {
            headers: { Authorization: "Bearer " + AuthStr }
          })
          .then(response => {
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
      }
      this.close();
    },
    test2() {
      console.log("test 2 callllz");
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
</style>