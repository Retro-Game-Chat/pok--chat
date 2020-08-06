<template>
  <div id="app">
    <router-view v-if="!!server.status && server.status === 'ok'" />
    <template v-else>
      <Connecting message="Connecting..."/>
    </template>
  </div>
</template>

<script>
import Connecting from '@/components/Connecting.vue'
import ServerService from '@/services/Server'

export default {
  name: 'App',
  components: {
    Connecting,
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  @apply h-full;
}
</style>
