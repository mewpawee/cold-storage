<template lang="html">
  <v-carousel v-model="model">
    <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src">
      <v-row class="fill-height" align="center" justify="center">
        <div class="display-3">Slide {{ i + 1 }}</div>
      </v-row>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import truck1 from '@/static/carousel/truck-carousel-1.jpg'
import truck2 from '@/static/carousel/truck-carousel-2.jpg'
import truck3 from '@/static/carousel/truck-carousel-3.jpg'
export default {
  layout: 'session',
  data: () => ({
    model: 0,
    items: [
      {
        src: truck1,
      },
      {
        src: truck2,
      },
      {
        src: truck3,
      },
    ],
  }),
  mounted() {
    if (this.$auth.loggedIn) {
      this.$router.replace({ name: 'dashboard' })
    }
  },
}
</script>
