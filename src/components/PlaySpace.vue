<template>
  <div class="PlaySpace">
    <div class="PlayBox"
    :style="{ backgroundImage: `url(${require(`@/assets/images/${location}.png`)})` }"
    >
      <Characters :characters="characters" :me="me" />
    </div>
  </div>
</template>

<script>
import Characters from './Characters'

export default {
  name: 'PlaySpace',

  components: {
    Characters
  },

  data () {
    return {
      location: 'route11',
      me: {
        name: 'luke',
        color: 'red',
        direction: 'down',
        x: 0,
        y: 0
      },
      characters: [
        {
          name: 'greg',
          color: 'blue',
          direction: 'down',
          x: 0,
          y: 0
        }
      ]
    }
  },

  created() {
    window.addEventListener('keyup', this.listenKeysPressed)
  },

  methods: {
    listenKeysPressed(e) {
      const keys = {
        38: {
          name: 'up',
          do: (character) => {
            character.y += 1
          }
        },
        40: {
          name: 'down',
          do: (character) => {
            character.y -= 1
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

      const action = keys[e.which]

      if (action) {
        this.me.direction = action.name
        console.log(this.me, action.name)
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
  width: 40rem;
  height: 18rem;
  @apply relative border border-black;
}
</style>
