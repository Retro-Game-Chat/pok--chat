<template>
  <div 
    class="Character"
    :class="[`Character--${character.direction || 'down'}`, { 'Character--moving' : character.moving } ]"
    :style="{
      left: (character.x + 20) + 'rem',
      top: (character.y + 9) + 'rem'
    }"
  />
</template>

<script>
export default {
  name: 'Character',

  props: {
    character: {
      type: Object,
      required: true
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

.Character--down.Character--moving {
  background: no-repeat url('~@/assets/images/overworld.png') -3rem 0rem;
}

.Character--up {
  background: no-repeat url('~@/assets/images/overworld.png') -1rem 0rem;
}

.Character--up.Character--moving {
  background: no-repeat url('~@/assets/images/overworld.png') -4rem 0rem;
}

.Character--left {
  background: no-repeat url('~@/assets/images/overworld.png') -2rem 0rem;
}

.Character--left.Character--moving {
  background: no-repeat url('~@/assets/images/overworld.png') -5rem 0rem;
}

.Character--right {
  background: no-repeat url('~@/assets/images/overworld.png') -2rem 0rem;
  transform: scaleX(-1);
}

.Character--right.Character--moving {
  background: no-repeat url('~@/assets/images/overworld.png') -5rem 0rem;
  transform: scaleX(-1);
}
</style>