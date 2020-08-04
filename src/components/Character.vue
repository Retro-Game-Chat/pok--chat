<template>
  <div 
    class="Character"
    :class="`Character--${character.direction || 'down'}`"
    :style="{
      left: x + 'rem',
      top: y + 'rem'
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

  watch: { 
    character: function(newVal, oldVal) {
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)
    }
  }
}
</script>

<style scoped>
.Character {
  @apply absolute h-4 w-4;
}

.Character--down {
  background: no-repeat url('~@/assets/images/overworld.png') 0rem 0rem;
}

.Character--up {
  background: no-repeat url('~@/assets/images/overworld.png') -1rem 0rem;
}

.Character--left {
  background: no-repeat url('~@/assets/images/overworld.png') -2rem 0rem;
}

.Character--right {
  background: no-repeat url('~@/assets/images/overworld.png') -2rem 0rem;
  transform: scaleX(-1);
}
</style>