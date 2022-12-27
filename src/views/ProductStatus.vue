<template>
  <v-app>

    <Navbar />
    
    <ProductTable/>
    
  </v-app>
</template>
<script>
import Navbar from '@/components/Navbar'

import ProductTable from '@/views/components/ProductTable'

export default {
  components: {
    Navbar,
    ProductTable
  },
  
  methods: {},
}
</script>
<style >
  
  .slectBox{
    margin-top: 35px;
  }
</style>