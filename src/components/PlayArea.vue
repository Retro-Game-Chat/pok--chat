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
      default: () => []
    }
  },
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
