<template lang="html">
  <div>
    name: 'posts-postId' <br />
    params: {{ JSON.stringify($route.params) }} <br />
    query:{{ JSON.stringify($route.query) }} <br />
    hash:{{ JSON.stringify($route.hash) }} <br />
    <v-text-field v-model="query" label="Search keywoard"></v-text-field>
    <v-btn text small @click="handleSearchClicked">Search</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: ''
    }
  },
  methods: {
    handleSearchClicked() {
      console.log('clicked with keyword', this.query)
      this.$router.replace({
        name: 'posts-search',
        query: {
          q: this.query
        }
      })
    }
  }
}
</script>
