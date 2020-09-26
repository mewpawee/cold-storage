<template>
  <v-navigation-drawer
    v-model="leftDrawer"
    :mini-variant="miniVariant"
    :clipped="clipped"
    :fixed="fixed"
    app
  >
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
  data() {
    return {
      clipped: true,
      fixed: true,
      items: [
        {
          icon: 'mdi-monitor-dashboard',
          title: 'Dashboard',
          to: { name: 'dashboard' }
        },
        {
          icon: 'mdi-group',
          title: 'Groups',
          to: { name: 'groups' }
        },

        {
          icon: 'mdi-chart-bubble',
          title: 'Manga Search',
          to: '/manga/search'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Users',
          to: { name: 'users' }
        }
      ]
    }
  },
  computed: {
    leftDrawer: {
      get() {
        return this.$nuxt.$store.state.leftDrawer
      },
      set(val) {
        this.$store.commit('set_left_drawer', val)
      }
    },
    miniVariant: {
      get() {
        return this.$nuxt.$store.state.miniVariant
      },
      set(val) {
        this.$store.commit('set_miniVariant', val)
      }
    }
  }
}
</script>
