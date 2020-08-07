<template>
  <div id="app">
    <div class="AppSpace">
      <TitleBox />
      <router-view v-if="!!server.status && server.status === 'ok'" />
      <template v-else>
        <Notice message="Connecting..."/>
      </template>
    </div>
  </div>
</template>

<script>
import Notice from '@/components/Notice.vue'
import TitleBox from '@/components/TitleBox'
import ServerService from '@/services/Server'

export default {
  name: 'App',
  components: {
    Notice,
    TitleBox
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
  @apply w-full h-full mt-4 flex justify-center;
}

.AppSpace {
  @apply text-gray-600 antialiased;
  background: url('~@/assets/images/route11.png') no-repeat 0rem 3.5rem;
  width: 40rem;
  height: 21.5rem;
}
</style>
