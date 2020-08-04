<template>
  <div 
    class="Character"
    :class="[`Character--${character.direction || 'down'}`, { 'Character--moving' : moving } ]"
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
      moving: false,
      x: this.character.x > 0 ? this.character.x > 0 : 20,
      y: this.character.y > 0 ? this.character.y > 0 : 9
    }
  },

  created() {
    window.addEventListener('keydown', this.listenMove)
    window.addEventListener('keyup', this.listenStop)
  },

  methods: {
    listenMove() {
      this.moving = true
    },
    listenStop() {
      this.moving = false
    }
  },

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
  animation: movingUpDown 1s linear infinite; 
}

.Character--up {
  background: no-repeat url('~@/assets/images/overworld.png') -1rem 0rem;
}

.Character--up.Character--moving {
  background: no-repeat url('~@/assets/images/overworld.png') -4rem 0rem;
  animation: movingUpDown 1s linear infinite;
}

.Character--left {
  background: no-repeat url('~@/assets/images/overworld.png') -2rem 0rem;
}

.Character--left.Character--moving {
  animation: movingLeft 1s steps(1, start) infinite; 
}

.Character--right {
  background: no-repeat url('~@/assets/images/overworld.png') -2rem 0rem;
  transform: scaleX(-1);
}

/* .Character--right.Character--moving {
  background: no-repeat url('~@/assets/images/overworld.png') -2rem 0rem;
  animation: movingRight 1s linear infinite; 
} */

@keyframes movingUpDown {
  49.999% { transform: scaleX(1); }
  50% { transform: scaleX(-1); }
  100% { transform: scaleX(-1); }
}

@keyframes movingLeft {
  0% { background-position-x: -5rem; }
  49.999% { background-position-x: -2rem; }
  50% { background-position-x: -5rem; }
  100% { background-position-x: -2rem; }
}
</style>