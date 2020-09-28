<template>
  <v-app dark>
    <Topbar />
    <LeftDrawer />
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <RightDrawer />
    <Footer />
  </v-app>
</template>

<script>
import Footer from '@/components/Global/Footer'
import LeftDrawer from '@/components/Global/LeftDrawer'
import RightDrawer from '@/components/Global/RightDrawer'
import Topbar from '@/components/Global/Topbar'
export default {
  components: {
    LeftDrawer,
    Topbar,
    RightDrawer,
    Footer
  }
}
</script>
