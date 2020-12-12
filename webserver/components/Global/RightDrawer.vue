<template>
  <v-navigation-drawer
    v-model="rightDrawer"
    :right="true"
    :clipped="false"
    hide-overlay
    temporary
    app
  >
    <div v-if="selectedGroup && Object.keys(selectedGroup).length > 0">
      <v-list-item v-for="(value, name) in selectedGroup[0]" :key="name">
        <v-list-item-content>{{ name }}: </v-list-item-content>
        <v-list-item-content v-if="name !== 'devices'" class="align-end">{{
          value
        }}</v-list-item-content>
        <div v-if="name == 'devices'">
          <v-list-item-content>{{ name }}: </v-list-item-content>
          <v-expansion-panels multiple>
            <v-expansion-panel v-for="(item, i) in value" :key="i">
              <v-expansion-panel-header>
                DeviceId: {{ item.deviceId }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-list-item-content
                  >Temp: {{ item.temp }}
                </v-list-item-content>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </v-list-item>
    </div>
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
    selectedGroup: {
      get() {
        return this.$nuxt.$store.state.selectedGroup
      }
    },
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
    },
    onClickOutside() {
      return this.$store.commit('set_right_drawer', false)
    }
  }
}
</script>

<style lang="css" scoped></style>
<style lang="css" scoped></style>
