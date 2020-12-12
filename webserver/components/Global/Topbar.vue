<template>
  <v-app-bar clipped-left fixed app>
    <v-btn icon @click.stop="miniVariantToggle">
      <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
    </v-btn>
    <v-toolbar-title v-text="title" />
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
      <v-col cols="12" sm="6" md="4">
        <v-menu
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="Picker without buttons"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
        </v-menu>
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
import { getGroupInfo } from '@/utils/userApi'
export default {
  data() {
    return {
      title: 'Cold-Chain',
      user: '',
      statusProxy: null,
      dateProxy: new Date(
        new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000
      )
        .toISOString()
        .split('T')[0],
      groupInfo: null,
      polling: null
    }
  },
  computed: {
    date: {
      get() {
        return this.dateProxy
      },
      async set(val) {
        this.dateProxy = val
        if (this.selectedGroup) {
          this.groupInfo = await getGroupInfo(this.selectedGroup, this.date)
          this.$store.commit(
            'set_selected_group',
            this.groupInfo.data.groupData
          )
        }
      }
    },
    selectedGroup: {
      get() {
        return this.statusProxy === null ? '' : this.statusProxy
      },
      async set(val) {
        this.statusProxy = val
        if (this.date) {
          this.groupInfo = await getGroupInfo(val, this.date)
          this.$store.commit(
            'set_selected_group',
            this.groupInfo.data.groupData
          )
        }
      }
    },
    groups: {
      get() {
        return this.$nuxt.$store.state.groups
      }
    },
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
    pollData() {
      this.polling = setInterval(async () => {
        if (this.date && this.selectedGroup) {
          this.groupInfo = await getGroupInfo(this.selectedGroup, this.date)
          this.$store.commit(
            'set_selected_group',
            this.groupInfo.data.groupData
          )
        }
      }, 10000)
    },
    signOut() {
      this.$auth.logout('local')
    },
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
  },
  beforeDestroy() {
    clearInterval(this.polling)
  },
  created() {
    this.pollData()
  }
}
</script>
>
