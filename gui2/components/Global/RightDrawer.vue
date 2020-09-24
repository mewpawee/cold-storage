<template>
  <v-navigation-drawer v-model="rightDrawer" :right="true" temporary fixed>
    <v-list>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        router
        exact
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
        </v-list-item-content>
      </v-list-item>

      <v-btn @click="handleLoggedOut"><v-icon>mdi-logout</v-icon>Logout</v-btn>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          icon: 'mdi-logout',
          title: 'test',
          to: { name: 'index' }
        }
      ]
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
  methods: {
    handleLoggedOut() {
      return this.$nuxt.$auth.logout()
    }
  }
}
</script>

<style lang="css" scoped></style>
