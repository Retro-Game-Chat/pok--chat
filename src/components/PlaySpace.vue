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
import Characters from './Characters'
import ChatBox from './ChatBox'
import ChatEntry from './ChatEntry'
import TitleBox from './TitleBox'

const keys = {
  38: {
    name: 'up',
    do: (character) => {
      if (character.y > 0) {
        character.y -= 1
      }
    }
  },
  87: {
    name: 'up',
    do: (character) => {
      if (character.y > 0) {
        character.y -= 1
      }
    }
  },
  40: {
    name: 'down',
    do: (character) => {
      if (character.y < 17) {
        character.y += 1
      }
    }
  },
  83: {
    name: 'down',
    do: (character) => {
      if (character.y < 17) {
        character.y += 1
      }
    }
  },
  37: {
    name: 'left',
    do: (character) => {
      if (character.x !== 0) {
        character.x -= 1
      }
    }
  },
  65: {
    name: 'left',
    do: (character) => {
      if (character.x !== 0) {
        character.x -= 1
      }
    }
  },
  39: {
    name: 'right',
    do: (character) => {
      if (character.x < 39) {
        character.x += 1
      }
    }
  },
  68: {
    name: 'right',
    do: (character) => {
      if (character.x < 39) {
        character.x += 1
      }
    }
  }
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
    return {
      typing: false,
      location: 'route11',
      me: {
        name: 'luke',
        color: 'red',
        direction: 'down',
        x: 20,
        y: 9
      },
      characters: [
        {
          name: 'greg',
          color: 'blue',
          direction: 'down',
          x: 20,
          y: 9
        }
      ]
    }
  },

  created() {
    window.addEventListener('keydown', this.listenTyping)
    window.addEventListener('keydown', this.listenLook)
    window.addEventListener('keyup', this.listenMove)
  },

  methods: {
    listenTyping(e) {
      if (!this.typing) {
        if (e.which === 84) {
          this.typing = true
        }
      } else {
        if (e.which === 27) {
          this.typing = false
        }
      }
    },
    listenMove(e) {
      if (!this.typing) {
        const action = keys[e.which]

        if (action) {
          action.do(this.me)
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
  zoom: 150%;
  width: 40rem;
  height: 18rem;
  @apply mt-20 relative border border-black flex justify-center items-center;
}
</style>
