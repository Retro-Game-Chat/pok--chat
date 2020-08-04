<template>
  <div class="PlayArea">
    <Character
      v-for="(character, index) in characters"
      :key="index"
      :character="character"
    />
  </div>
</template>

<script>
import Character from './Character.vue'

export default {
  name: 'PlayArea',

  components: {
    Character
  },

  props: {
    characters: {
      type: Array,
      default: () => ([])
    }
  },
}
</script>
