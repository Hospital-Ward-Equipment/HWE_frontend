<template>
  <nav>
    <v-app-bar  dark app class="lbn">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase ">
        <span class="font-weight-light">Suwa</span>
        <span>Sewana</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">
            <v-icon left>expand_more</v-icon>
            <span>Ward</span>
          </v-btn>
        </template>
        <v-list flat>
          <v-list-item v-for="link in links" :key="link.text" router :to="link.route" active-class="border">
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu> -->


      <div>
        <router-link to="/login" custom v-slot="{ navigate }">
          <v-btn text @click="navigate" role="link">
            <span>Exit</span>
            <v-icon right>exit_to_app</v-icon>
          </v-btn>

        </router-link>
      </div>


    </v-app-bar>
    <v-navigation-drawer v-model="drawer" dark app class="darken-4 rbn"  >
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <img src="/img1.png" alt="">
          </v-avatar>
          <p class="white--text subheading mt-1 text-center">Akila</p>
        </v-flex>
        <!-- <v-flex class="mt-4 mb-4"> -->
          <!-- <Popup /> -->
        <!-- </v-flex> -->
      </v-layout>
      <v-list flat>
        <v-list-item v-for="link in links" :key="link.text" router :to="link.route" active-class="border">
          <v-list-item-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list-item-action>
          </v-list-item-action>
    </v-navigation-drawer>
  </nav>
</template>
<script>
// import Popup from './Popup.vue'
export default {
  data: () => ({
    drawer: true,
    links: [
      { icon: 'dashboard', text: 'Dashboard', route: '/' },
      { icon: 'mdi-notebook-heart-outline', text: 'Summary', route: '/summary' },
      // { icon: 'mdi-glass-fragile', text: 'Broken Product', route: '/brokenProduct' },
      { icon: 'mdi-hospital-building', text: 'Ward', route: '/ward' },
      { icon: 'mdi-cupboard', text: 'Equipment', route: '/equipment' }
    ]

  }),
  components: {
    // Popup
  },


}
</script>
<style scoped>
.border {
  border-left: 4px solid #01a3a4;
}
.lbn{
  background: linear-gradient(to left, #48dbfb 0%, #0abde3 100%);
}
.rbn{
  background: linear-gradient(to top right, #48dbfb 0%, #0abde3 100%);
}
</style>
