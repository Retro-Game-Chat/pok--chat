<template>
  <div>
    <template v-if="characters.length > 0">
      <Character
        v-for="(character, index) in characters"
        :key="index"
        :character="character"
      />
    </template>
    <Me :me="me" :conversation="conversation"/>
  </div>
</template>

<script>
import Character from '@/components/Character.vue'
import Me from '@/components/Me.vue'

export default {
  name: 'Characters',

  components: {
    Character,
    Me
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

  data () {
    return {
      everyone: []
    }
  },

  mounted () {
    this.registerListeners()
  },

  methods: {
    registerListeners () {
      const { conversation } = this.$props

      conversation.on('character:move', (from, event) => {
        const existingChar = this.everyone.findIndex(character => character.id == event.body.id);

        if (existingChar < 0) {
          this.everyone.push(event.body)
        } else {
          this.everyone[existingChar].data = event.body.data
        }
      })
    }
  },

  computed: {
    characters () {
      return this.everyone.filter(character => character.id !== this.me.id)
    }
  }
}
</script>
