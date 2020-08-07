<template>
  <div>
    <!-- <Character
      v-for="(character, index) in characters"
      :key="index"
      :character="character"
    /> -->
    <Me :me="me" :conversation="conversation"/>
  </div>
</template>

<script>
// import Character from '@/components/Character.vue'
import Me from '@/components/Me.vue'

export default {
  name: 'Characters',

  components: {
    // Character,
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
}
</script>
