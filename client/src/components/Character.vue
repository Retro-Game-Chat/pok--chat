<template>
  <div 
    class="Character Tooltip"
    :class="[`Character--${character.direction || 'down'}`, { 'Character--moving' : character.moving } ]"
    :style="{
      left: (character.x + 20) + 'rem',
      top: (character.y + 9) + 'rem'
    }"
  >
    <span class="Character--tooltip Tooltip-text">{{ character.name }}</span>
  </div>
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
.Tooltip .Tooltip-text {
  visibility: hidden;
  text-align: center;
  padding: 2px 20px;
  position: absolute;
  z-index: 100;
}
.Tooltip:hover .Tooltip-text {
  visibility: visible;
}

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

.Character--tooltip {
  @apply bg-white p-3 -mt-6 -ml-6 rounded
}
</style>