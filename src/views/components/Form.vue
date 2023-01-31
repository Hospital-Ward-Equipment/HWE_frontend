<template>
<v-container>
  <v-card class="form-card px-3">
    <v-card-title class="ml-6">
        <h2>Update item</h2>
      </v-card-title>
      <v-card-text><br />
 <v-form class="ml-6" ref="form" v-model="valid" lazy-validation @submit.prevent="submit">
  <v-text-field
          v-model="Name"
          type="text"
          :rules="nameRules"
          label="Name"
          required
          clearable
          
        ></v-text-field>
        <v-text-field
          v-model="all"
          type="number"
          :rules="nameRules"
          label="All"
          required
          clearable
        ></v-text-field>
        <v-text-field
          v-model="usable"
          type="number"
          :rules="nameRules"
          label="Usable"
          required
          clearable
         ></v-text-field>
        

        <v-text-field
          v-model="broken"
          type="number"
          :rules="nameRules"
          label="Broken"
          required
          clearable
         ></v-text-field><br />
        
        <v-btn 
          color="error"
          class="mr-4"
          @click="reset"
        >
          Reset Form
        </v-btn>
        <v-btn
          class="success ml-4"
          @click="submit"
        >
          Submit
        </v-btn>
      </v-form>
      </v-card-text>
            </v-card>
</v-container>
</template>

<script>
  export default {
    data: () => ({
      valid: true,
      Category: '',
      Name: '',
      all:0,
      usable:0,
      broken:0,
      Quantity: '',
      nameRules: [
        v => !!v || ' required',
        v => (v >= 0) || ' must be greater than or equal 0',
      ],
    }),

    methods: {
      reset () {
        this.$refs.form.reset()
      },
      submit () {
        
      },
     
    },
  }
</script>

<style scoped>
.form-card{
  height: 500px;
  width: 600px;
  padding: 50px;
}
</style>