<template>
  <div>
    <template v-for="(value, name) in data[0]">
      <v-list-item v-if="name !== 'devices' && name !== 'date'" :key="name">
        <v-list-item-content>{{ name }}: </v-list-item-content>
        <v-list-item-content class="align-end">{{ value }}</v-list-item-content>
      </v-list-item>
      <template v-else-if="name == 'date'">
        <v-list-item :key="name">
          <v-list-item-content>Date: </v-list-item-content>
          <v-list-item-content class="align-end">{{
            new Date(value).toLocaleString().split(',')[0]
          }}</v-list-item-content>
        </v-list-item>
        <v-list-item :key="name + value">
          <v-list-item-content>Time: </v-list-item-content>
          <v-list-item-content class="align-end">{{
            new Date(value).toLocaleString().split(',')[1]
          }}</v-list-item-content>
        </v-list-item>
      </template>
      <template v-else-if="name == 'devices'">
        <v-list-item v-for="(item, i) in value" :key="i">
          <v-list-item-content>
            DeviceId: {{ item.deviceId }}
          </v-list-item-content>
          <v-list-item-content class="align-end">
            <v-chip
              :color="getColor(item.temp, maximumThreshold, minimumThreshold)"
              dark
            >
              Temp: {{ item.temp }} °C
            </v-chip>
          </v-list-item-content>
        </v-list-item>
      </template>
    </template>
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
    selectedGroup() {
      return this.$nuxt.$store.state.selectedGroup
    },
    maximumThreshold() {
      return this.$nuxt.$store.state.settings.maximumThreshold
    },
    minimumThreshold() {
      return this.$nuxt.$store.state.settings.minimumThreshold
    },
  },
  methods: {
    getColor(temp, maximum, minimum) {
      if (temp > maximum) return 'red'
      else if (temp < minimum) return 'blue'
      else return 'green'
    },
  },
}
</script>

<style lang="css" scoped></style>
