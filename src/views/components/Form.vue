<template>
<v-container>
  <v-card class="form-card px-3">
    <v-card-title class="ml-6">
        <h2>Add new item</h2>
      </v-card-title>
      <v-card-text><br />
 <v-form class="ml-6" ref="form" v-model="valid" lazy-validation @submit.prevent="submit">
      
        <v-text-field
          v-model="Category"
          type="text"
          :rules="nameRules"
          label="Category"
          required
          clearable
        ></v-text-field>
    
        <v-text-field
          v-model="Name"
          type="text"
          :rules="nameRules"
          label="Name"
          required
          clearable
        ></v-text-field>

        <v-text-field
          v-model="Quantity"
          type="number"
          :rules="nameRules"
          label="Quantity"
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
      Quantity: '',
      nameRules: [
        v => !!v || 'Category  name is required',
        v => (v && v.length <= 10) || 'Category must be less than 10 characters',
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