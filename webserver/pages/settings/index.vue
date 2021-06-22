<template lang="html">
  <v-container fluid>
    <v-alert
      v-model="submit"
      dismissible
      color="green"
      border="left"
      elevation="2"
      colored-border
      icon="mdi-check-circle-outline"
    >
      Settings Changed!.
    </v-alert>
    <v-card class="mx-auto">
      <v-card-title>Settings</v-card-title>
      <v-space />
      <v-card-subtitle class="title">Temperature Threshold</v-card-subtitle>
      <v-card-text>
        <form>
          <v-row dense align="center" class="mx-0">
            <v-col> Minimum</v-col>
            <v-col>
              <v-text-field v-model="minimum" label="temperature (°C)" />
            </v-col>
          </v-row>
          <v-row dense align="center" class="mx-0">
            <v-col> Maximum</v-col>
            <v-col>
              <v-text-field v-model="maximum" label="temperature (°C)" />
            </v-col>
          </v-row>
          <v-btn class="mr-4" @click="onSave"> save </v-btn>
        </form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { setThreshold } from '@/utils/userApi'
export default {
  data() {
    return {
      submit: false,
      maximum: null,
      minimum: null,
    }
  },
  created() {
    this.getSettings()
  },
  methods: {
    getSettings() {
      this.maximum = this.$nuxt.$store.state.settings.maximumThreshold
      this.minimum = this.$nuxt.$store.state.settings.minimumThreshold
    },
    onSave() {
      this.submit = true
      // this.$store.commit('settings/setMaximum', this.maximum)
      // this.$store.commit('settings/setMinimum', this.minimum)
      setThreshold(this.minimum, this.maximum)
    },
  },
}
</script>
