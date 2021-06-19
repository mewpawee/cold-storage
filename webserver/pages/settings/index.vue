<template lang="html">
  <v-container fluid>
    <v-card class="mx-auto">
      <v-card-title>Settings</v-card-title>
      <v-card-text>
        <v-row dense align="center" class="mx-0">
          <v-col> Upper Bound</v-col>
          <v-col>
            <v-text-field v-model="alertThreshold" label="temperature" />
          </v-col>
        </v-row>
        <v-row dense align="center" class="mx-0">
          <v-col> Lower Bound</v-col>
          <v-col>
            <v-text-field v-model="alertThreshold" label="temperature" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {}
</script>
