<template>
  <v-navigation-drawer v-model="drawer" clipped fixed app>
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
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  computed: {
    role() {
      return this.$nuxt.$auth.user.role
    },
    items() {
      if (this.role === 'admin') {
        return [
          {
            icon: 'mdi-monitor-dashboard',
            title: 'Dashboard',
            to: { name: 'dashboard' },
          },
          {
            icon: 'mdi-history',
            title: 'History',
            to: { name: 'history' },
          },
          {
            icon: 'mdi-cog-outline',
            title: 'Settings',
            to: { name: 'settings' },
          },
        ]
      } else {
        return [
          {
            icon: 'mdi-monitor-dashboard',
            title: 'Dashboard',
            to: { name: 'dashboard' },
          },
          {
            icon: 'mdi-history',
            title: 'History',
            to: { name: 'history' },
          },
        ]
      }
    },
    drawer: {
      get() {
        return this.$nuxt.$store.state.leftDrawer.status
      },
      set(val) {
        return this.$store.commit('leftDrawer/set', val)
      },
    },
  },
}
</script>
