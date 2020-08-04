<template>
  <div class="PlaySpace">
    <div class="PlayBox"
    :style="{ backgroundImage: `url(${require(`@/assets/images/${location}.png`)})` }"
    >
      <Characters :characters="characters" />
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
    const everyone = [
      {
        name: 'greg',
        color: 'blue',
        x: 0,
        y: 0
      }
    ]

    const me = {
      name: 'luke',
      color: 'red',
      x: 0,
      y: 0
    }

    return {
      location: 'route11',
      me,
      characters: [ ...everyone, me ]
    }
  },

  created() {
    window.addEventListener('keyup', this.listenKeysPressed)
  },

  methods: {
    listenKeysPressed(e) {
      const keys = {
        38: {
          name: 'UP',
          do: (character) => {
            character.y += 1
          }
        },
        40: {
          name: 'DOWN',
          do: (character) => {
            character.y -= 1
          }
        },
        37: {
          name: 'LEFT',
          do: (character) => {
            character.x -= 1
          }
        },
        39: {
          name: 'RIGHT',
          do: (character) => {
            character.x += 1
          }
        }
      }

      const action = keys[e.which]

      if (action) {
        console.log(action.name)
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
