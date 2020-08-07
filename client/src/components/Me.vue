<template>
  <Character :character="me" />
</template>

<script>
import Character from '@/components/Character.vue'
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
  name: 'Me',

  components: {
    Character
  },

  props: {
    conversation: {
      type: Object,
      required: true
    },
    me: {
      type: Object,
      required: true
    }
  },
  
  mounted() {
    window.addEventListener('keyup', this.listenMove)
  },

  beforeDestroy() {
    window.removeEventListener('keyup', this.listenMove)
  },

  methods: {
    moved() {
      this.conversation
        .sendCustomEvent({ type: 'moving', body: this.me})
        .then(() => {
          console.log('custom event was sent')
        })
        .catch(console.error)
      
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
  }

}
</script>