<template>
  <v-app-bar clipped-left fixed app>
    <!-- <v-btn icon @click.stop="miniVariantToggle">
      <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
    </v-btn> -->
    <v-app-bar-nav-icon @click.stop="leftDrawerOpen" class="d-lg-none" />
    <v-icon>mdi-snowflake-alert</v-icon>
    <v-toolbar-title v-text="title" class="d-none d-md-flex" />
    <v-row align="end" justify="center">
      <v-col cols="6" align="center">
        <v-select
          v-model="selectedGroup"
          :items="groups"
          item-text="groupName"
          single-line
          label="Select Group"
        />
      </v-col>
    </v-row>
    <v-spacer />
    <v-toolbar-title v-text="user" class="d-none d-md-flex" />
    <v-btn icon @click.stop="signOut">
      <v-icon>mdi-export</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { getUserGroup } from '@/utils/userApi'

export default {
  data() {
    return {
      title: 'Cold-chain',
      user: '',
      polling: null,
    }
  },
  async fetch() {
    const userGroups = await getUserGroup()
    this.$store.commit('set_groups', userGroups.data.user.groups)
    this.$store.commit('settings/setMaximum', userGroups.data.user.maxThreshold)
    this.$store.commit('settings/setMinimum', userGroups.data.user.minThreshold)
  },
  fetchDelay: 1000,
  fetchOnServer: false,
  computed: {
    selectedGroup: {
      get() {
        return this.$nuxt.$store.state.selectedGroupName
      },
      set(val) {
        this.$store.commit('set_selected_group_name', val)
      },
    },
    groups: {
      get() {
        return this.$nuxt.$store.state.groups
      },
    },
    miniVariant() {
      return this.$nuxt.$store.state.miniVariant.status
    },
  },
  mounted() {
    this.user = 'Welcome, ' + this.$nuxt.$auth.user.username + '!'
  },
  methods: {
    pollData() {
      this.polling = setInterval(() => {
        this.$fetch()
      }, 3000)
    },
    signOut() {
      this.$auth.logout('local')
    },
    leftDrawerOpen() {
      this.$store.commit('leftDrawer/set', true)
    },
    rightDrawerToggle() {
      this.$store.commit(
        'set_right_drawer',
        !this.$nuxt.$store.state.rightDrawer
      )
    },
  },
  beforeDestroy() {
    clearInterval(this.polling)
  },
  created() {
    this.pollData()
  },
}
</script>
