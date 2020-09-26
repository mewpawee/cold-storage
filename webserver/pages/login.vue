<template lang="html">
  <div>
    <v-btn color="primary" dark @click.stop="dialogLogin = true">
      Login
    </v-btn>

    <v-btn color="primary" dark @click.stop="dialogSignup = true">
      Sign Up
    </v-btn>

    <v-dialog v-model="dialogLogin" max-width="290">
      <v-text-field v-model="usernameLogin" label="Username"></v-text-field>
      <v-text-field
        v-model="passwordLogin"
        label="Password"
        type="password"
      ></v-text-field>
      <v-btn @click="handleLoginClicked"> Login </v-btn>
    </v-dialog>

    <v-dialog v-model="dialogSignup" max-width="290">
      <v-text-field v-model="usernameSignup" label="Username"></v-text-field>
      <v-text-field
        v-model="passwordSignup"
        label="Password"
        type="password"
      ></v-text-field>
      <v-btn @click="handleSignupClicked"> Signup </v-btn>
    </v-dialog>
  </div>
</template>

<script>
import { createUser } from '@/utils/userApi'
export default {
  layout: 'session',
  data() {
    return {
      dialogLogin: false,
      dialogSignup: false,
      usernameLogin: '',
      passwordLogin: '',
      usernameSignup: '',
      passwordSignup: ''
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
        console.log(response.data)
      } catch (err) {
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
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="css" scoped></style>
