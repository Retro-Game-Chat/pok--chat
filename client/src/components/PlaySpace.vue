<template>
  <div class="PlaySpace">
    <div class="PlayBox" v-if="!!conversation">
      <Characters v-if="!!conversation" :conversation="conversation" :members="members" :me="me" />
      <ChatEntry v-if="!!conversation" :conversation="conversation" :typing="typing" />
      <ChatBox v-if="!!conversation" :conversation="conversation" :members="members" />
    </div>
    <template v-else>
      <Notice message="Loading..."/>
    </template>
  </div>
</template>

<script>
import Characters from '@/components/Characters'
import ChatBox from '@/components/ChatBox'
import ChatEntry from '@/components/ChatEntry'
import Notice from '@/components/Notice.vue'

import Client from 'nexmo-client'
import UserService from '@/services/User'

const move = {
  up: (character) => {
    if (character.data.y > -9) {
      character.data.y -= 1
    }
  },
  down: (character) => {
    if (character.data.y < 8) {
      character.data.y += 1
    }
  },
  left: (character) => {
    if (character.data.x > -20) {
      character.data.x -= 1
    }
  },
  right: (character) => {
    if (character.data.x < 19) {
      character.data.x += 1
    }
  }
}

const keys = {
  38: {
    name: 'up',
    do: move.up
  },
  87: {
    name: 'up',
    do: move.up
  },
  40: {
    name: 'down',
    do: move.down
  },
  83: {
    name: 'down',
    do: move.down
  },
  37: {
    name: 'left',
    do: move.left
  },
  65: {
    name: 'left',
    do: move.left
  },
  39: {
    name: 'right',
    do: move.right
  },
  68: {
    name: 'right',
    do: move.right
  }
}

export default {
  name: 'PlaySpace',

  components: {
    Characters,
    ChatBox,
    ChatEntry,
    Notice
  },

  data () {
    const { member: me, conversation } = this.$route.params

    if (this.$route.params.member ) {
      me.data = JSON.parse(me.display_name)
    }

    return {
      app: null,
      conversation: null,
      members: null,
      conversationId: conversation,
      typing: false,
      syncing: false,
      me,
      characters: [
        {
          name: 'greg',
          color: 'blue',
          direction: 'left',
          moving: false,
          x: 19,
          y: -1
        }
      ]
    }
  },

  created() {
    if (this.me === undefined) {
      this.$router.push({ name: 'Login' })
    } else {
      this.connect()
    }
  },

  methods: {
    moved() {
      if (!this.syncing) {
        this.syncing = true

        setTimeout(() => {
          UserService
            .sync({
              user_id: this.me.user_id,
              display_name: JSON.stringify(this.me.data)
            })
            .then(() => {
              this.syncing = false
            })
        }, 5000)
      }
    },

    connect () {
      new Client()
        .login(this.me.token)
        .then(app => {
          this.app = app

          return app.getConversation(this.conversationId)
        })
        .then((conversation) => {
          this.conversation = conversation

          window.addEventListener('keydown', this.listenWillMove)
          window.addEventListener('keydown', this.listenTyping)
          window.addEventListener('keydown', this.listenLook)
          window.addEventListener('keyup', this.listenMove)

          console.log(conversation.members)
          this.members = conversation.members
        })
        .catch(console.error)
    },

    listenTyping(e) {
      if (!this.typing) {
        // don't block built in commands like Cmd+R
        if (!e.metaKey && !e.shiftKey && !e.ctrlKey && !e.altKey) {
          e.preventDefault()
        }

        // press Y to chat
        if (e.which === 89) {
          this.typing = true
        }
      } else {
        if (e.which === 27) {
          this.typing = false
        }
      }
    },

    listenWillMove(e) {
      if (!this.typing) {
        const action = keys[e.which]

        if (action) {
          this.me.data.moving = true
        }
      }
    },

    listenMove(e) {
      if (!this.typing) {
        const action = keys[e.which]

        if (action) {
          action.do(this.me)
          this.me.data.moving = false
          this.moved()
        }
      }
    },

    listenLook(e) {
      if (!this.typing) {
        const action = keys[e.which]

        if (action) {
          this.me.data.direction = action.name
        }
      }
    },
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
