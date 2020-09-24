<template lang="html">
  <div class="d-flex flex-wrap">
    <v-card
      v-for="device in devices"
      :key="device._id"
      class="mx-auto"
      max-width="344"
      outlined
    >
      <li>{{ device._id }}</li>
      <li>{{ device.owner }}</li>
      <li>{{ device.provider }}</li>
      <li>{{ device.value }}</li>
    </v-card>
  </div>
</template>

<script>
import gql from 'graphql-tag'
export default {
  apollo: {
    devices: gql`
      {
        devices {
          _id
          owner
          value
          provider
        }
      }
    `
  }
}
</script>

<style lang="css" scoped></style>
