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
import Character from '@/components/Character.vue'

export default {
  name: 'Characters',

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
  }
}
</script>
