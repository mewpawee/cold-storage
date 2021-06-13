<template>
  <v-app-bar clipped-left fixed app>
    <!-- <v-btn icon @click.stop="miniVariantToggle">
      <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
    </v-btn> -->
    <v-app-bar-nav-icon @click.stop="leftDrawerOpen" class="d-flex d-lg-none" />
    <v-icon>mdi-snowflake-alert</v-icon>
    <v-toolbar-title v-text="title" class="d-sm-none" />
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
    <v-toolbar-title v-text="user" />
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
      statusProxy: null,
      // dateProxy: new Date(
      //   new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000
      // )
      //   .toISOString()
      //   .split('T')[0],
      groupInfo: null,
      polling: null,
    }
  },
  async fetch() {
    const userGroups = await getUserGroup()
    this.$store.commit('set_groups', userGroups.data.user.groups)
  },
  fetchDelay: 1000,
  fetchOnServer: false,
  computed: {
    // date: {
    //   get() {
    //     return this.dateProxy
    //   },
    //   async set(val) {
    //     this.dateProxy = val
    //     if (this.selectedGroup) {
    //       this.groupInfo = await getGroupInfo(
    //         this.selectedGroup,
    //         this.date,
    //         this.date
    //       )
    //       this.$store.commit(
    //         'set_selected_group',
    //         this.groupInfo.data.groupData
    //       )
    //     }
    //   },
    // },
    selectedGroup: {
      get() {
        return this.statusProxy === null ? '' : this.statusProxy
      },
      set(val) {
        this.statusProxy = val
        this.$store.commit('set_selected_group_name', this.selectedGroup)
        // if (this.date) {
        //   this.groupInfo = await getGroupInfo(val, this.date, this.date)
        //   this.$store.commit(
        //     'set_selected_group',
        //     this.groupInfo.data.groupData
        //   )
        // }
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
    // pollData() {
    //   this.polling = setInterval(async () => {
    //     if (this.date && this.selectedGroup) {
    //       this.groupInfo = await getGroupInfo(this.selectedGroup, this.date)
    //       this.$store.commit(
    //         'set_selected_group',
    //         this.groupInfo.data.groupData
    //       )
    //     }
    //   }, 10000)
    // },
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
  // beforeDestroy() {
  //   clearInterval(this.polling)
  // },
  // created() {
  //   this.pollData()
  // },
}
</script>
>
