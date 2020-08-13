<template>
  <div class="PlaySpace">
    <div class="PlayBox" v-if="!!conversation">
      <Characters v-if="!!conversation" :conversation="conversation" :me="me" />
      <!-- <ChatEntry v-if="!!conversation" :conversation="conversation" :typing="typing" />
      <ChatBox v-if="!!conversation" :conversation="conversation" /> -->
    </div>
    <template v-else>
      <Notice message="Loading..."/>
    </template>
  </div>
</template>

<script>
import Characters from '@/components/Characters'
// import ChatBox from '@/components/ChatBox'
// import ChatEntry from '@/components/ChatEntry'
import Notice from '@/components/Notice'

import Client from 'nexmo-client'

export default {
  name: 'PlaySpace',

  components: {
    Characters,
    Notice
  },

  data () {
    const { member: me, conversation: conversationId } = this.$route.params

    if (this.$route.params.member ) {
      me.data = JSON.parse(me.display_name)
    }

    return {
      app: null,
      conversation: null,
      typing: false,
      syncing: false,
      conversationId,
      me,
    }
  },

  created() {
    if (this.me === undefined) {
      this.$router.push({ name: 'Login' })
    } else {
      this.connect()
    }
  },

  // beforeDestroy() {
  //   window.removeEventListener('keydown', this.listenTyping)
  // },

  methods: {
    connect () {
      new Client()
        .login(this.me.token)
        .then(app => {
          this.app = app

          return app.getConversation(this.conversationId)
        })
        .then((conversation) => {
          this.conversation = conversation

          window.addEventListener('keydown', this.listenTyping)
        })
        .catch(console.error)
    },

    // listenTyping(e) {
    //   if (!this.typing) {
    //     // don't block built in commands like Cmd+R
    //     if (!e.metaKey && !e.shiftKey && !e.ctrlKey && !e.altKey) {
    //       e.preventDefault()
    //     }

    //     // press Y to chat
    //     if (e.which === 89) {
    //       this.typing = true
    //     }
    //   } else {
    //     if (e.which === 27) {
    //       this.typing = false
    //     }
    //   }
    // },
  }
}
</script>

<style scoped>
.PlayBox {
  width: 40rem;
  height: 18rem;
  @apply relative flex justify-center items-center;
}
</style>
