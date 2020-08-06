<template>
  <div class="PlaySpace">
    <div class="PlayBox">
      <Characters :characters="characters" :me="me" />
      <ChatEntry v-if="!!conversation" :conversation="conversation" :typing="typing" />
      <ChatBox v-if="!!conversation" :conversation="conversation" :members="members" />
    </div>
  </div>
</template>

<script>
import Characters from '@/components/Characters'
import ChatBox from '@/components/ChatBox'
import ChatEntry from '@/components/ChatEntry'
import Client from 'nexmo-client'

const move = {
  up: (character) => {
    if (character.y > -9) {
      character.y -= 1
    }
  },
  down: (character) => {
    if (character.y < 8) {
      character.y += 1
    }
  },
  left: (character) => {
    if (character.x > -20) {
      character.x -= 1
    }
  },
  right: (character) => {
    if (character.x < 19) {
      character.x += 1
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

const startingPosition = {
  direction: 'left',
  moving: false,
  x: 19,
  y: -1
}

export default {
  name: 'PlaySpace',

  components: {
    Characters,
    ChatBox,
    ChatEntry
  },

  data () {
    const { member: user, conversation } = this.$route.params

    if (this.$route.params.member ) {
      user.data = JSON.parse(user.display_name)
      user.unique_name = user.name
      user.name = user.data.n
      user.color = user.data.s
    }

    return {
      app: null,
      conversation: null,
      members: null,
      conversationId: conversation,
      typing: false,
      me: {
        ...user,
        ...startingPosition
      },
      characters: [
        {
          name: 'greg',
          color: 'blue',
          ...startingPosition
        }
      ]
    }
  },

  created() {
    if (this.me.token === undefined) {
      this.$router.push({ name: 'Login' })
    } else {
      this.connect()
    }

    window.addEventListener('keydown', this.listenWillMove)
    window.addEventListener('keydown', this.listenTyping)
    window.addEventListener('keydown', this.listenLook)
    window.addEventListener('keyup', this.listenMove)
  },

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
          this.me.moving = true
        }
      }
    },
    listenMove(e) {
      if (!this.typing) {
        const action = keys[e.which]

        if (action) {
          action.do(this.me)
          this.me.moving = false
        }
      }
    },
    listenLook(e) {
      if (!this.typing) {
        const action = keys[e.which]

        if (action) {
          this.me.direction = action.name
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
  @apply relative border border-black flex justify-center items-center;
}
</style>
