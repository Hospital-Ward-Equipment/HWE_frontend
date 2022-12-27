<template>
  <v-app>

    <Navbar />
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="desserts" :search="search" sort-by="calories" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>
            <template>
              <v-row align="center" class="slectBox">
                <v-col
                  class="d-flex"
                  cols="12"
                  sm="6"
                >
                  <v-select
                  item-text="name"
                  item-value="id"
                  v-model="defaultSelected"
                    :items="people"
                    solo
                  ></v-select>
                </v-col>
              </v-row>
            </template>
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New Item
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.equipment" label="Equipment"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.all" label="All"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.ubl" label="Usable"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.bkn" label="Bkoken"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save">
                  Save
                </v-btn>
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
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">
          Reset
        </v-btn>
      </template>
    </v-data-table>
    <!-- <Footer/> -->
  </v-app>
</template>
<script>
import Navbar from '@/components/Navbar'

// import Footer from '@/components/Footer'

export default {
  components: {
    Navbar,
    //  Footer
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    search: '',
    defaultSelected: {
      id: 1,
      name: "Ward 1"
    },
    people: [
      {
        id: 1,
        name: "Ward 1"
      },
      {
        id: 2,
        name: "Ward 2"
      },
      {
        id: 3,
        name: "Ward 3"
      },
      {
        id: 4,
        name: "Ward 4"
      }
    ],
    headers: [
      {
        text: 'Equipment',
        align: 'start',
        sortable: false,
        value: 'equipment',
      },
      { text: 'All', value: 'all',filterable: false, },
      { text: 'Usable', value: 'ubl' ,filterable: false,},
      { text: 'Broken', value: 'bkn' ,filterable: false,},
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    item: [
        { title: 'Ward  1' },
        { title: 'Ward  2' },
        { title: 'Ward  3' },
        { title: 'Ward  4' },
      ],
    items: ['Blue', 'Red', 'Yellow', 'Green'],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      equipment: '',
      all: 0,
      ubl: 0,
      bkn: 0,
    },
    defaultItem: {
      equipment: '',
      all: 0,
      ubl: 0,
      bkn: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.desserts = [
        { equipment: "Item 1", all: 21, ubl: 10, bkn: 11 },
        { equipment: "Item 2", all: 22, ubl: 10, bkn: 15 },
        { equipment: "Item 3", all: 24, ubl: 10, bkn: 12 },
        { equipment: "Item 4", all: 25, ubl: 10, bkn: 13 },
        { equipment: "Item 5", all: 23, ubl: 10, bkn: 10 },
        { equipment: "Item 6", all: 20, ubl: 10, bkn: 10 },
        { equipment: "Item 1", all: 20, ubl: 10, bkn: 10 },
        { equipment: "Item 1", all: 20, ubl: 10, bkn: 10 },
        { equipment: "Item 1", all: 20, ubl: 10, bkn: 10 },
        { equipment: "Item 1", all: 20, ubl: 10, bkn: 10 },
        { equipment: "Item 1", all: 20, ubl: 10, bkn: 10 },
        { equipment: "Item 1", all: 20, ubl: 10, bkn: 10 },
        { equipment: "Item 1", all: 20, ubl: 10, bkn: 10 },
        { equipment: "Item 1", all: 20, ubl: 10, bkn: 10 },
        { equipment: "Item 1", all: 20, ubl: 10, bkn: 10 },
        { equipment: "Item 1", all: 20, ubl: 10, bkn: 10 },
        
      ]
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>
<style >
  
  .slectBox{
    margin-top: 35px;
  }
</style>