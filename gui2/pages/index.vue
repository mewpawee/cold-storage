<template lang="html">
  <div>
    <v-btn color="primary" dark @click.stop="dialog = true">
      Login
    </v-btn>

    <v-btn color="primary" dark @click.stop="dialog = true">
      Sign Up
    </v-btn>

    <v-dialog v-model="dialog" max-width="290">
      <v-text-field v-model="email" label="Email"></v-text-field>
      <v-text-field
        v-model="password"
        label="Password"
        type="password"
      ></v-text-field>
      <v-btn @click="handleLoginClicked"> Login </v-btn>
    </v-dialog>
  </div>
</template>

<script>
export default {
  layout: 'session',
  data() {
    return {
      dialog: false,
      email: '',
      password: ''
    }
  },
  methods: {
    async handleLoginClicked() {
      try {
        const response = await this.$auth.loginWith('local', {
          data: { user: { email: this.email, password: this.password } }
        })
        // console.log(response)
        if (response.data.success) {
          this.$router.replace({ name: 'dashboard' })
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="css" scoped></style>
