<template>
  <div>
    <!-- <Character
      v-for="(character, index) in characters"
      :key="index"
      :character="character"
    /> -->
    <Character
      :character="me"
    />
  </div>
</template>

<script>
import Character from './Character.vue'

export default {
  name: 'Characters',

  components: {
    Character
  },

  props: {
    characters: {
      type: Array,
      default: () => ([])
    },
    me: {
      type: Object,
      required: true
    }
  },

  watch: { 
    me: function(newVal, oldVal) {
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)
    }
  }
}
</script>
