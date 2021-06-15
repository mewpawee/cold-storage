<template>
  <div v-if="data">
    <v-list-item v-for="(value, name) in data[0]" :key="name">
      <v-list-item-content>{{ name }}: </v-list-item-content>
      <v-list-item-content v-if="name === 'date'" class="align-end">{{
        new Date(value).toLocaleString()
      }}</v-list-item-content>
      <v-list-item-content v-else-if="name !== 'devices'" class="align-end">{{
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
              <v-list-item-content>Temp: {{ item.temp }} </v-list-item-content>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </v-list-item>
  </div>
</template>

<script>
export default {
  props: ['data'],
  data() {
    return {
      truck: {},
    }
  },
  computed: {
    selectedGroup: {
      get() {
        return this.$nuxt.$store.state.selectedGroup
      },
    },
  },
}
</script>

<style lang="css" scoped></style>
