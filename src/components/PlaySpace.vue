<template>
  <div class="PlayBox">
    <PlayArea :characters="characters" />
  </div>
</template>

<script>
import PlayArea from './PlayArea'

export default {
  name: 'PlaySpace',

  components: {
    PlayArea
  },

  data () {
    return {
      characters: [
        {
          name: 'my name',
          color: 'red',
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
          name: 'UP',
          do: (character) => {
            character.y += 20
          }
        },
        40: {
          name: 'DOWN',
          do: (character) => {
            character.y -= 20
          }
        },
        37: {
          name: 'LEFT',
          do: (character) => {
            character.x -= 20
          }
        },
        39: {
          name: 'RIGHT',
          do: (character) => {
            character.x += 20
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
.PlayBox {
  @apply box-content h-32 w-64 p-4 border-4 border-gray-400 bg-gray-200;
}

.PlayArea {
  @apply h-full w-full bg-gray-400;
}
</style>
