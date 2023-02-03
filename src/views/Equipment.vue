<template>
  <v-app>
    <Navbar />
    <EquipmentTable/>
  </v-app>
</template>
<script>
import Navbar from '@/components/Navbar'

import EquipmentTable from '@/views/components/EquipmentTable'

export default {
  components: {
    Navbar,
    EquipmentTable
  },
  
  methods: {},
}
</script>
<style > 
  
  .slectBox{
    margin-top: 35px;
  }
</style>