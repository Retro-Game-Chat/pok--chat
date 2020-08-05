<template>
  <div id="app">
    <!-- <Nav class="mb-6" /> -->
    <PlaySpace v-if="!!server.status && server.status === 'ok'" />
    <template v-else>
      <Connecting message="Connecting..."/>
    </template>
  </div>
</template>

<script>
import Connecting from '@/components/Connecting.vue'
import PlaySpace from '@/components/PlaySpace.vue'
import ServerService from '@/services/Server'
// import Nav from './components/Nav.vue'

export default {
  name: 'App',
  components: {
    PlaySpace,
    Connecting,
    // Nav
  },
  data () {
    return {
      server: {},
    }
  },
  mounted () {
    this.getServerStatus()
  },
  methods: {
    getServerStatus () {
      ServerService.fetchStatus()
        .then((response) => {
          this.server = response.data
        })
    }
  }
}
</script>

<style scoped>
#app {
  @apply h-full;
}
</style>