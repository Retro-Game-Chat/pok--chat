<template>
  <div class="PokéBox flex flex-col h-64 mt-64">
    <ChatHeader :conversation="conversation" :me="me" />
    <ChatEvents :conversation="conversation" />
    <ChatFooter />
  </div>
</template>

<script>
import ChatHeader from '@/components/ChatHeader'
import ChatEvents from '@/components/ChatEvents'
import ChatFooter from '@/components/ChatFooter'

export default {
  name: 'Chat',

  components: {
    ChatHeader,
    ChatEvents,
    ChatFooter
  },

  props: {
    conversation: {
      type: Object,
      required: true
    },
    me: {
      type: Object,
      required: true
    }
  },
}
</script>

<style scoped>
</style>