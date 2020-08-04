<template>
  <div class="PlaySpace">
    <div class="PlayBox"
    :style="{ backgroundImage: `url(${require(`@/assets/images/${location}.png`)})` }"
    >
      <Characters :characters="characters" :me="me" />
      <ChatBox />
    </div>
  </div>
</template>

<script>
import Characters from './Characters'
import ChatBox from './ChatBox'

const keys = {
  38: {
    name: 'up',
    do: (character) => {
      character.y -= 1
    }
  },
  40: {
    name: 'down',
    do: (character) => {
      character.y += 1
    }
  },
  37: {
    name: 'left',
    do: (character) => {
      character.x -= 1
    }
  },
  39: {
    name: 'right',
    do: (character) => {
      character.x += 1
    }
  }
}

export default {
  name: 'PlaySpace',

  components: {
    Characters,
    ChatBox
  },

  data () {
    return {
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
    window.addEventListener('keydown', this.listenLook)
    window.addEventListener('keyup', this.listenMove)
  },

  methods: {
    listenMove(e) {
      const action = keys[e.which]

      if (action) {
        action.do(this.me)
      }
    },
    listenLook(e) {
      const action = keys[e.which]

      if (action) {
        this.me.direction = action.name
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
  @apply relative border border-black flex justify-center items-center;
}
</style>
