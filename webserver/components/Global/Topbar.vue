<template>
  <v-app-bar clipped-left fixed app>
    <v-btn icon @click.stop="miniVariantToggle">
      <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
    </v-btn>
    <v-toolbar-title v-text="title" />
    <v-spacer />
    <v-toolbar-title v-text="user" />
    <v-btn icon @click.stop="rightDrawerToggle">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      title: 'Cold-Chain',
      user: ''
    }
  },
  computed: {
    miniVariant: {
      get() {
        return this.$nuxt.$store.state.miniVariant
      }
    }
  },
  mounted() {
    this.user = 'Welcome, ' + this.$nuxt.$auth.user.username + '!'
  },
  methods: {
    miniVariantToggle() {
      this.$store.commit(
        'set_minivariant',
        !this.$nuxt.$store.state.miniVariant
      )
    },
    rightDrawerToggle() {
      this.$store.commit(
        'set_right_drawer',
        !this.$nuxt.$store.state.rightDrawer
      )
    }
  }
}
</script>
>
