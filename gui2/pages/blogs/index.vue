<template lang="html">
  <div>
    Blogg!! Require login
  </div>
</template>

<script>
import * as BlogApi from '@/utils/blogApi'
export default {
  middleware: 'auth',
  data() {
    return {
      blogs: []
    }
  },
  async mounted() {
    const response = await BlogApi.index()
    console.log('Response', response)
    this.blogs = response.data
  }
}
</script>
