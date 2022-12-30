<template>
  <v-app>
    <Navbar/>
    
  <div class="projects">
    <!-- <h1 class="subheading grey--text">Project</h1> -->
    <v-container>
      <v-layout row wrap class="mb-4">
      <v-tooltip bottom>
      <!-- <template v-slot:activator="{ on }">
        <v-btn small outlined color="green" @click="sortBy('item')" class="mr-2" dark v-on="on">
           <v-icon left small>folder</v-icon>
            <span class="caption text-lowercase">By name</span>
        </v-btn>
      </template> -->
        <span>Sort project</span>
      </v-tooltip>
       <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn small outlined color="blue" @click="sortBy('bqty')" class="mr-2" dark v-on="on">
           <v-icon left small>person</v-icon>
            <span class="caption text-lowercase">By Broke qty</span>
        </v-btn>
      </template>
        <span>Sort person</span>
      </v-tooltip>
      </v-layout>
      <v-card flat  v-for="project in projects" :key="project.item" class="mb-1">
          <v-layout row wrap :class="`pa-4 project ${project.status}`">
            <v-flex xs12 md4>
                <div class="caption grey--text">Item</div>
                <div >{{project.item}}</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
                <div class="caption grey--text">All</div>
                <div >{{project.fqty}}</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
                <div class="caption grey--text">Usable</div>
                <div >{{project.uqty}}</div>
            </v-flex>
            <v-flex xs6 sm4 md2>
                <div class="caption grey--text">Broken</div>
                <div >{{project.bqty}}</div>
            </v-flex>
          </v-layout>
      </v-card>
    </v-container>
  </div>
  <!-- <Footer/> -->
</v-app>
</template>

<script>
// @ is an alias to /src

import Navbar from '@/components/Navbar'
// import Footer from '@/components/Footer'
export default {

  name: 'projects',
  components: {
    Navbar,
  //  Footer
  },
  data: () => ({
    projects : [
      {item: 'Item 1 ', fqty :10, uqty: 4, bqty:2},
      {item: 'Item 2 ', fqty :10, uqty: 4, bqty:6},
      {item: 'Item 3', fqty :10, uqty: 4, bqty:3},
      {item: 'Item 4 ', fqty :10, uqty: 4, bqty:9},
    ]
  }),
  methods: {
    sortBy(prop){
      this.projects.sort((a,b) => a[prop] > b[prop] ? -1:1)
    }
  }
}
</script>
<style >
  .project.complete {
      border-left: 4px solid #3cd1c2;
  }
  .project.no {
      border-left: 4px solid orange;
  }
  .project.up {
      border-left: 4px solid red;
  }
  .project.yes {
      border-left: 4px solid yellow;
  }
   .v-chip.complete {
      color: #3cd1c2;
  }
  .p.ovnored {
      color: orange;
  }
  .p.up {
      color:  red;
  }
  .p.yes {
      color:  yellow;
  }
</style>
