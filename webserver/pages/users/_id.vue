<template lang="html">
  <div>
    name: 'index-id' <br />
    params: {{ JSON.stringify($route.params) }} <br />
    query:{{ JSON.stringify($route.query) }} <br />
    hash:{{ JSON.stringify($route.hash) }} <br />
  </div>
</template>

<script>
export default {}
</script>
