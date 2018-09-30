<template>
  <div class="about">
    <h1>this is a about page</h1>
    <h2>{{ name }}</h2>
  </div>
</template>
<script>
import { name } from 'data'
export default {
  data () {
    return {
      name
    }
  }
}
</script>

<style lang="stylus">
</style>
