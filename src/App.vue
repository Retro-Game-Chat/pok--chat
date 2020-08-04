<template>
  <div id="app">
    <Nav class="mb-6" />
    <PlaySpace />
  </div>
</template>

<script>
import PlaySpace from './components/PlaySpace.vue'
import Nav from './components/Nav.vue'

export default {
  name: 'App',
  components: {
    PlaySpace,
    Nav
  }
}
</script>
