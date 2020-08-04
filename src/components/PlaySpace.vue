<template>
  <div class="PlaySpace">
    <div class="PlayBox"
    :style="{ backgroundImage: `url(${require(`@/assets/images/${location}.png`)})` }"
    >
      <TitleBox />
      <Characters :characters="characters" :me="me" />
      <ChatBox />
    </div>
  </div>
</template>

<script>
import Characters from './Characters'
import ChatBox from './ChatBox'
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
  40: {
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
  39: {
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
    TitleBox
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
  @apply mt-20 relative border border-black flex justify-center items-center;
}
</style>
