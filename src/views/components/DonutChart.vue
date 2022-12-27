<template>
      <div>
        <apexchart width="380" type="donut" :options="options" :series="series"></apexchart>
      </div>
</template>

<script>
export default {

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
