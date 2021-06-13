<template>
  <v-app dark>
    <Topbar />
    <LeftDrawer :drawer="drawer" />
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Footer from '@/components/Global/Footer'
import LeftDrawer from '@/components/Global/LeftDrawer'
import Topbar from '@/components/Global/Topbar'
export default {
  components: {
    LeftDrawer,
    Topbar,
    Footer,
  },
  computed: {
    drawer() {
      return this.$store.state.leftDrawer.status
    },
  },
}
</script>
