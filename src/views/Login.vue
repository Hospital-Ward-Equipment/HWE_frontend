<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1 class="text-center display-2 text--accent-3">Sign in to Suwasewana</h1>

                        <h4 class="text-center mt-4">Ensure your email for registration</h4>
                        <v-form @submit.prevent="submitForm">
                          <v-text-field
                            label="Username"
                            name="Username"
                            v-model="username"
                            prepend-icon="email"
                            type="text"
                            color="light-blue lighten-2 accent-3"
                          />

                          <v-text-field
                            id="password"
                            label="Password"
                            name="password"
                            v-model="password"
                            prepend-icon="lock"
                            type="password"
                            color="light-blue lighten-2 accent-3"
                          />
                          <div class="text-center mt-3">
                            <v-alert
                              border="left"
                              :value="alert"
                              type="warning"
                            >Wrong Usersname or password</v-alert>
                          </div>
                          <div class="text-center mt-3">
                            <v-btn
                              rounded
                              color="light-blue lighten-5 accent-3"
                              dark
                              type="submit"
                              role="link"
                            >SIGN IN</v-btn>
                          </div>
                        </v-form>
                      </v-card-text>
                    </v-col>
                    <v-col cols="12" md="4" class="light-blue lighten-5 accent-3">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Hello, Friend!</h1>
                        <h5
                          class="text-center"
                        >Enter your personal details and start journay with us</h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step++">SIGN UP</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="light-blue lighten-5 accent-3">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Welcome Back!</h1>
                        <h5
                          class="text-center"
                        >To Keep connected with us please login with your personnel info</h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step--">Sign in</v-btn>
                      </div>
                    </v-col>

                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1 class="text-center display-2 text--accent-3">Create Account</h1>

                        <h4 class="text-center mt-4">Ensure your email for registration</h4>
                      
                        <v-form @submit.prevent="registerForm">
                          <v-text-field
                            label="User Name"
                            name="UName"
                            prepend-icon="person"
                            v-model="username"
                            type="text"
                            color="light-blue lighten-2 accent-3"
                          />
                          <v-text-field
                            label="First Name"
                            name="FName"
                            prepend-icon="person"
                            type="text"
                            color="light-blue lighten-2 accent-3"
                          />
                          <v-text-field
                            label="Last Name"
                            name="LName"
                            prepend-icon="person"
                            type="text"
                            color="light-blue lighten-2 accent-3"
                          />
                          <v-text-field
                            label="Email"
                            name="Email"
                            prepend-icon="email"
                            type="text"
                            color="light-blue lighten-2 accent-3"
                          />
                          <v-text-field
                            id="password"
                            label="Password"
                            name="password"
                            v-model="password"
                            prepend-icon="lock"
                            type="password"
                            color="light-blue lighten-2 accent-3"
                          />
                          <div class="text-center mt-3">
                            <v-btn
                              rounded
                              color="light-blue lighten-5 accent-3"
                              dark
                              type="submit"
                              role="link"
                            >SIGN UP</v-btn>
                          </div>
                        </v-form>
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
  
<script>
// import axios from "../network/config"
import axios from "axios";
// import VsAlert from "@vuesimple/vs-alert";
export default {
  data: () => ({
    step: 1,
    username: "",
    password: "",
    active: false,
    alert: false,
    errormg: ""
  }),
  components: {
    // VsAlert
  },
  props: {
    source: String
  },
  methods: {
    registerForm() {
      let username = this.username;
      let password = this.password;
      // // let AuthStr = sessionStorage.getItem('accessToken')
      // // {headers: {Authorization: "Bearer " + AuthStr}}

      if (username == "" || password == "") {
        console.log("empty us & ps")
      } else {
        axios
          .post("http://localhost:8080/registerNewUser", {
            userName:this.username,
            userPassword:this.password,
            userFirstName:"",
            userLastName:"",
            usermail:"akiladissanayaka255@gmail.com"
          })
          .then(response => {
            console.log(response)
            if (response["data"].success) {
              sessionStorage.setItem("accessToken", response["data"].jwtToken);
              this.$router.push({
                path: `/`
              });
              this.alert = false;
            } else {
              this.alert = true;
            }
          })
          .catch(error => {
            this.errormg = error;
            // alert("ERROR : Something went wrong " + JSON.stringify(error));
            this.alert = true;
          });
      }
    },
    submitForm() {
      let username = this.username;
      let password = this.password;
      // let AuthStr = sessionStorage.getItem('accessToken')
      // {headers: {Authorization: "Bearer " + AuthStr}}

      if (username == "" || password == "") {
        console.log("empty us & ps")
      } else {
        axios
          .post("http://localhost:8080/authenticate", {
            userName: this.username,
            userPassword: this.password
          })
          .then(response => {
            if (response["data"].success) {
              sessionStorage.setItem("accessToken", response["data"].jwtToken);
              this.$router.push({
                path: `/`
              });
              this.alert = false;
            } else {
              this.alert = true;
            }
          })
          .catch(error => {
            this.errormg = error;
            // alert("ERROR : Something went wrong " + JSON.stringify(error));
            this.alert = true;
          });
      }
    }
  }
};
</script>