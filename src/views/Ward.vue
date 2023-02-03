<template>
  <v-app>
    <Navbar />
    <WardTable/>
  </v-app>
</template>
<script>
import Navbar from '@/components/Navbar'

import WardTable from '@/views/components/WardTable'

export default {
  components: {
    Navbar,
    WardTable
  },
  
  methods: { },
}
</script>
<style > 
  
  .slectBox{
    margin-top: 35px;
  }
</style>