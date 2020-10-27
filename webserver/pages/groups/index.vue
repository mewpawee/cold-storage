<template lang="html">
  <div class="d-flex flex-wrap">
    <p v-if="$fetchState.pending">Fetching...</p>
    <p v-else-if="$fetchState.error">An error occurred :(</p>
    <div v-else>
      <v-card
        v-for="truck in results.data.user.trucks"
        :key="truck._id"
        class="mx-auto"
        max-width="344"
        outlined
      >
        <li>{{ truck._id }}</li>
      </v-card>
    </div>
  </div>
</template>

<script>
import { getUserInfo } from '@/utils/userApi'
export default {
  data() {
    return {
      results: []
    }
  },
  async fetch() {
    this.results = await getUserInfo()
  }
}
</script>
