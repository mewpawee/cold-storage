<template>
  <v-navigation-drawer
    v-model="rightDrawer"
    :right="true"
    :clipped="false"
    :fixed="true"
    app
  >
    <v-list disabled>
      <v-subheader>{{ truck.id }}</v-subheader>
      <v-divider />
      <v-list-item>
        <v-list-item-content>Temp: </v-list-item-content>
        <v-list-item-content class="align-end">{{
          truck.temp
        }}</v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>Latitude: </v-list-item-content>
        <v-list-item-content class="align-end">{{
          truck.lat
        }}</v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>Longitude: </v-list-item-content>
        <v-list-item-content class="align-end">{{
          truck.lng
        }}</v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      truck: {}
    }
  },
  computed: {
    rightDrawer: {
      get() {
        return this.$nuxt.$store.state.rightDrawer
      },
      set(val) {
        return this.$store.commit('set_right_drawer', val)
      }
    }
  },
  mounted() {
    this.truck = this.$nuxt.$store.state.truck
  },
  methods: {
    handleLoggedOut() {
      return this.$nuxt.$auth.logout()
    }
  }
}
</script>

<style lang="css" scoped></style>
