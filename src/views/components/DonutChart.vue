<template>
  <v-app>
    <div class="team">
      <div>
        <apexchart width="380" type="donut" :options="options" :series="series"></apexchart>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'team',

  components: {
  },
  data: () => ({ 
    options: {labels: ['Usable', 'Broken']},
    series: [45, 55]
  }),
  methods:{
  }
}

</script>
