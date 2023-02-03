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
          :items="product"
          solo
        ></v-select>
      </v-col>
    </v-row>
  </template>
  <script>
    export default{
        data: () => ({
            defaultSelected: {
      id: 1,
      name: "All"
    },
    product: [
      {
        id: 1,
        name: "All"
      },
      {
        id: 2,
        name: "Under 500"
      },
      {
        id: 3,
        name: "Under 100" 
      },
      {
        id: 4,
        name: "Under 500"
      },
      {
        id: 4,
        name: "Under 500"
      }
    ],
        })
    }

  </script>