<template>
  <div>
    <v-list-item>
      <v-list-item-content>Date : </v-list-item-content>
      <v-list-item-content class="align-end">{{
        data[0].date
      }}</v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>Time : </v-list-item-content>
      <v-list-item-content class="align-end">{{
        data[0].time
      }}</v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>Latitude : </v-list-item-content>
      <v-list-item-content class="align-end">{{
        data[0].lat
      }}</v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>Longitude : </v-list-item-content>
      <v-list-item-content class="align-end">{{
        data[0].lng
      }}</v-list-item-content>
    </v-list-item>
    <v-list-item v-for="(item, i) in data[0].devices" :key="i">
      <v-list-item-content> DeviceId: {{ item.deviceId }} </v-list-item-content>
      <v-list-item-content class="align-end">
        <v-chip
          :color="getColor(item.temp, maximumThreshold, minimumThreshold)"
          dark
        >
          Temp: {{ item.temp }} °C
        </v-chip>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script>
export default {
  props: { data: { type: Array, default: null } },
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
