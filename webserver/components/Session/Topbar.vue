<template lang="html">
  <v-app-bar clipped-left fixed app>
    <v-row align="center" justify="space-around">
      <v-col width="col-4">
        <v-btn color="primary" dark @click.stop="dialogLogin = true">
          Login
        </v-btn>

        <v-btn color="primary" dark @click.stop="dialogSignup = true">
          Sign Up
        </v-btn>
      </v-col>
    </v-row>

    <v-dialog
      background="rgba(33, 33, 33, 0.50)"
      v-model="dialogLogin"
      max-width="290"
    >
      <v-text-field v-model="usernameLogin" label="Username"></v-text-field>
      <v-text-field
        v-model="passwordLogin"
        label="Password"
        type="password"
      ></v-text-field>
      <v-btn @click="handleLoginClicked"> Login </v-btn>
      <v-alert v-model="errorLogin" dismissible type="error">
        Username or Password was wrong, please try again.
      </v-alert>
    </v-dialog>

    <v-dialog
      background="rgba(33, 33, 33, 0.50)"
      v-model="dialogSignup"
      max-width="290"
      dark
    >
      <v-text-field v-model="usernameSignup" label="Username"></v-text-field>
      <v-text-field
        v-model="passwordSignup"
        label="Password"
        type="password"
      ></v-text-field>
      <v-btn @click="handleSignupClicked"> Signup </v-btn>
      <v-alert v-model="successSignup" dismissible type="success">
        Signup Success!
      </v-alert>
      <v-alert v-model="errorSignup" dismissible type="error">
        this username already exist. Please use other username.
      </v-alert>
    </v-dialog>
  </v-app-bar>
</template>

<script>
import { createUser } from '@/utils/userApi'
export default {
  data() {
    return {
      dialogLogin: false,
      dialogSignup: false,
      usernameLogin: '',
      passwordLogin: '',
      usernameSignup: '',
      passwordSignup: '',
      errorLogin: false,
      successSignup: false,
      errorSignup: false
    }
  },
  mounted() {
    if (this.$auth.loggedIn) {
      this.$router.replace({ name: 'dashboard' })
    }
  },
  methods: {
    async handleLoginClicked() {
      try {
        const body = {
          query: `{
           login(username:"${this.usernameLogin}",password:"${this.passwordLogin}"){
             token
           }
         }`
        }
        const response = await this.$auth.loginWith('local', {
          data: body
        })
        console.log(response)
        if (response.data) {
          this.$router.replace({ name: 'dashboard' })
        }
      } catch (err) {
        this.errorLogin = true
        console.log(err)
      }
    },
    async handleSignupClicked() {
      try {
        const response = await createUser(
          this.usernameSignup,
          this.passwordSignup
        )
        console.log(response)
        if (response.errors) {
          this.errorSignup = true
        }
        if (response.data) {
          this.successSignup = true
        }
      } catch (err) {
        this.errorSignup = true
        console.log(err)
      }
    }
  }
}
</script>
