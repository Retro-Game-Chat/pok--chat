<template>
  <div class="PlaySpace">
    <div class="PlayBox"
    :style="{ backgroundImage: `url(${require(`@/assets/images/${location}.png`)})` }"
    >
      <TitleBox />
      <Characters :characters="characters" :me="me" />
      <ChatEntry :typing="typing" />
      <ChatBox />
    </div>
  </div>
</template>

<script>
import Characters from '@/components/Characters'
import ChatBox from '@/components/ChatBox'
import ChatEntry from '@/components/ChatEntry'
import TitleBox from '@/components/TitleBox'

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
    ChatEntry,
    TitleBox
  },

  data () {
    const { member: user } = this.$route.params

    user.data = JSON.parse(user.display_name)
    user.unique_name = user.name
    user.name = user.data.n
    user.color = user.data.s

    return {
      typing: false,
      location: 'route11',
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
    if (this.me.name === undefined && this.me.color === undefined) {
      this.$router.push({ name: 'Login'})
    }

    window.addEventListener('keydown', this.listenWillMove)
    window.addEventListener('keydown', this.listenTyping)
    window.addEventListener('keydown', this.listenLook)
    window.addEventListener('keyup', this.listenMove)
  },

  methods: {
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
.PlaySpace {
  @apply flex w-full h-full justify-center items-center;
}

.PlayBox {
  zoom: 120%;
  width: 40rem;
  height: 18rem;
  @apply mt-20 relative border border-black flex justify-center items-center;
}
</style>
