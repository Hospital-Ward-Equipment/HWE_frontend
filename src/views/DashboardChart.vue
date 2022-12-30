<template>
  <v-app>
    <Navbar />

    <div >
      <div>
        
        <v-container >
          <v-row >
            <v-col  sm="12" md="12" lg="6">
              <v-card class="pa-2" outlined tile>
                <DonutChart />
              </v-card>
            </v-col>
            <v-col  sm="12" md="12" lg="6">
              <v-card class="pa-2" outlined tile>
                <BarChart />
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>

  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
import DonutChart from '@/views/components/DonutChart'
import BarChart from '@/views/components/BarChart'
export default {
  

  components: {
    Navbar,
    DonutChart,
    BarChart
  },
  data: () => ({}),
  methods: {
  }
}

</script>
