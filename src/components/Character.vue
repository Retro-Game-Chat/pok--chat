<template>
  <div 
    class="Character"
    :style="{
      left: x + 'rem',
      top: y + 'rem',
      backgroundImage: `url(${require(`@/assets/images/overworld.png`)})`
    }"
  />
</template>

<script>
export default {
  name: 'Character',

  data() {
    return {
      x: this.character.x > 0 ? this.character.x > 0 : 20,
      y: this.character.y > 0 ? this.character.y > 0 : 9
    }
  },

  props: {
    character: {
      type: Object,
      required: true
    }
  },
}
</script>

<style scoped>
.Character {
  @apply absolute h-4 w-4;
}
</style>