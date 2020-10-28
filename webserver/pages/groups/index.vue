<template lang="html">
  <div class="d-flex flex-wrap">
    <p v-if="$fetchState.pending">Fetching...</p>
    <p v-else-if="$fetchState.error">An error occurred :(</p>
    <div v-else>
      <v-overlay :absolute="absolute" :value="overlay">
        <v-card>
          <v-form @submit="queryCreateTruck">
            <v-text-field v-model="truckName" label="Truck Name"></v-text-field>
            <v-btn type="submit" color="primary">
              Save
            </v-btn>
            <v-btn @click="cancelSubmission" color="grey">
              Cancel
            </v-btn>
          </v-form>
        </v-card>
      </v-overlay>
      <v-btn block @click="overlay = !overlay">
        <v-icon dark>
          mdi-plus
        </v-icon>
        Add new Trucks
      </v-btn>
      <v-row>
        <v-col
          v-for="truck in results.data.user.trucks"
          :key="truck._id"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card class="mx-auto" max-width="500" outlined>
            <v-card-title>
              <div class="display-1 mb-2">
                {{ truck.truckName }}
              </div>
            </v-card-title>
            <v-card-actions class="justify-center">
              <p>{{ truck._id }}</p>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { getUserInfo, addTruck } from '@/utils/userApi'
export default {
  async fetch() {
    this.results = await getUserInfo()
  },
  data() {
    return {
      overlay: false,
      truckName: '',
      results: []
    }
  },
  methods: {
    async queryCreateTruck(evt) {
      evt.preventDefault()
      try {
        this.overlay = false
        const myresult = await addTruck(this.truckName)
        console.log(myresult)
      } catch (e) {}
    },
    cancelSubmission() {
      this.overlay = false
    }
  }
}
</script>
