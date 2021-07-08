<template lang="html">
  <div>
    <v-row align="center" justify="center">
      <v-icon x-large>mdi-snowflake-alert</v-icon>
      <h3>Cold-chain</h3>
    </v-row>
    <br />
    <v-card class="mx-auto" color="accent" max-width="290">
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
      <v-alert v-model="errorLogin" dismissible type="error">
        Username or Password was wrong, please try again.
      </v-alert>
    </v-card>
  </div>
</template>

<script>
export default {
  layout: 'session',
  data() {
    return {
      usernameLogin: '',
      passwordLogin: '',
      errorLogin: false,
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
  },
}
</script>
