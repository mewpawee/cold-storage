<template lang="html">
  <div>
    <v-row align="center" justify="center">
      <v-icon x-large>mdi-snowflake-alert</v-icon>
      <h3>Cold-chain</h3>
    </v-row>
    <br />
    <v-card v-if="loginForm" class="mx-auto" color="accent" max-width="290">
      <v-card-title>Sign In</v-card-title>
      <v-col class="display-3" cols="12">
        <v-text-field
          v-model="usernameLogin"
          label="Username"
          prepend-icon="mdi-account"
        />
        <v-text-field
          v-model="passwordLogin"
          label="Password"
          type="password"
          prepend-icon="mdi-lock"
        />
      </v-col>
      <v-btn medium block color="primary" @click="handleSigninClicked">
        Sign in
      </v-btn>
      <p>
        Don't have an account yet?
        <v-btn small text color="primary" dark @click.stop="loginForm = false">
          Sign up
        </v-btn>
      </p>
      <v-alert v-model="errorLogin" dismissible type="error">
        Username or Password was wrong, please try again.
      </v-alert>
    </v-card>

    <v-card v-else class="mx-auto" color="accent" max-width="290">
      <v-card-title>Sign Up</v-card-title>
      <v-col class="display-3" cols="12">
        <v-text-field
          v-model="usernameSignup"
          label="Username"
          prepend-icon="mdi-account"
        />
        <v-text-field
          v-model="passwordSignup"
          label="Password"
          type="password"
          prepend-icon="mdi-lock"
        />
      </v-col>
      <v-btn medium block color="primary" @click="handleSignupClicked">
        Sign up
      </v-btn>
      <p>
        Already have an account?
        <v-btn small text color="primary" dark @click.stop="loginForm = true">
          Sign in
        </v-btn>
      </p>
      <v-alert v-model="successSignup" dismissible type="success">
        Sign up Success!
      </v-alert>
      <v-alert v-model="errorSignup" dismissible type="error">
        this username already exist. Please use other username.
      </v-alert>
    </v-card>
  </div>
</template>

<script>
import { createUser } from '@/utils/userApi'
export default {
  layout: 'session',
  data() {
    return {
      loginForm: true,
      usernameLogin: '',
      passwordLogin: '',
      usernameSignup: '',
      passwordSignup: '',
      errorLogin: false,
      successSignup: false,
      errorSignup: false,
    }
  },
  mounted() {
    if (this.$auth.loggedIn) {
      this.$router.replace({ name: 'dashboard' })
    }
  },
  methods: {
    async handleSigninClicked() {
      try {
        const body = {
          query: `{
           login(username:"${this.usernameLogin}",password:"${this.passwordLogin}"){
             token
           }
         }`,
        }
        const response = await this.$auth.loginWith('local', {
          data: body,
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
    },
  },
}
</script>
