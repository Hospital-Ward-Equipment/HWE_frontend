<template>
  <v-app>
    <Navbar />

    <div class="team">
      <h1 class="subheading grey--text">Dashboard</h1>
      <v-container>
        <v-layout row wrap>
          <v-flex sm6 xs12 md6 lg3>
            <v-card class="ma-3">
              <v-list-item>
                <v-list-item-avatar tile class="mt-5 mb-7">
                  <v-sheet color="green" width="80" height="80" elevation="10">
                    <v-icon dark large>store</v-icon>
                  </v-sheet>
                </v-list-item-avatar>
                <v-list-item-content class="mt-10">
                  <div class="overline text-right">Ward</div>
                  <v-list-item-title class="headline mb-1 text-right">4</v-list-item-title>
                  <div><v-divider></v-divider></div>
                </v-list-item-content>
              </v-list-item>
              <!-- <v-card-actions>
      <v-icon text class="ma-2">person</v-icon>
      <div class="overline">Iyad</div>
    </v-card-actions> -->
            </v-card>
          </v-flex>
          <v-flex sm6 xs12 md6 lg3>
            <v-card class="ma-3">
              <v-list-item>
                <v-list-item-avatar tile class="mt-5 mb-7">
                  <v-sheet color="#FFC107" width="80" height="80" elevation="10">
                    <v-icon dark large>mdi-bed-empty</v-icon>
                  </v-sheet>
                </v-list-item-avatar>
                <v-list-item-content class="mt-10">
                  <div class="overline text-right">Equipment</div>
                  <v-list-item-title class="headline mb-1 text-right">700</v-list-item-title>
                  <div><v-divider></v-divider></div>
                </v-list-item-content>
              </v-list-item>
              <!-- <v-card-actions>
                <v-icon text class="ma-2">subscriptions</v-icon>
                <div class="overline">AAE IdeaPro</div>
              </v-card-actions> -->
            </v-card>
          </v-flex>
          <v-flex sm6 xs12 md6 lg3>
            <v-card class="ma-3">
              <v-list-item>
                <v-list-item-avatar tile class="mt-5 mb-7">
                  <v-sheet color="#03A9F4" width="80" height="80" elevation="10">
                    <v-icon dark large>mdi-firework</v-icon>
                  </v-sheet>
                </v-list-item-avatar>
                <v-list-item-content class="mt-10">
                  <div class="overline text-right">Usable</div>
                  <v-list-item-title class="headline mb-1 text-right">300</v-list-item-title>
                  <div><v-divider></v-divider></div>
                </v-list-item-content>
              </v-list-item>
              <!-- <v-card-actions>
                <v-icon text class="ma-2">credit_card</v-icon>
                <div class="overline">VISA Card</div>
              </v-card-actions> -->
            </v-card>
          </v-flex>
          <v-flex sm6 xs12 md6 lg3>
            <v-card class="ma-3">
              <v-list-item>
                <v-list-item-avatar tile class="mt-5 mb-7">
                  <v-sheet color="#F44336" width="80" height="80" elevation="10">
                    <v-icon dark large>mdi-firework-off</v-icon>
                  </v-sheet>
                </v-list-item-avatar>
                <v-list-item-content class="mt-10">
                  <div class="overline text-right">Broken</div>
                  <v-list-item-title class="headline mb-1 text-right">400</v-list-item-title>
                  <div><v-divider></v-divider></div>
                </v-list-item-content>
              </v-list-item>
              <!-- <v-card-actions>
                <v-icon text class="ma-2">folder</v-icon>
                <div class="overline">Prodect</div>
              </v-card-actions> -->
            </v-card>
          </v-flex>
          <v-flex xs12 sm6 md4 lg3 v-for="person in team" :key="person.name">
            <v-card class="text-center ma-3">
              <v-responsive class="pt-4">
                <v-avatar size="100" class="red lighten-2">
                  <img :src="person.avatar" alt="">
                </v-avatar>
              </v-responsive>
              <v-card-text>
                <div class="subheading">{{ person.name }}</div>
                <div class="grey--text">{{ person.role }}</div>
              </v-card-text>
              <v-card-actions>
                <v-btn outlined color="orange">
                  <v-icon small left>message</v-icon>
                  <span>Message</span>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>

        </v-layout>
      </v-container>
    </div>
    <!-- <Footer/> -->
  </v-app>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar'
// import Footer from '@/components/Footer'
import axios from 'axios'

export default {
  name: 'team',

  components: {
    Navbar,
    //  Footer
  },
  data: () => ({
    team: [
      { name: 'Iyad', role: 'web developer', avatar: '/img1.png' },
      { name: 'Reda', role: 'Graphic designer', avatar: '/img2.png' },
      { name: 'Zineb', role: 'web developer', avatar: '/img3.png' },
      { name: 'Hu TechGroup', role: 'Desktop developer', avatar: '/img4.png' },
    ]
  }),
  methods:{
    getdata(){
      axios.get
    }
  }
}

</script>
