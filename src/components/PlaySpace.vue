<template>
  <div class="PlayBox">
    <div class="PlayArea">
      <Character  id="paddle" :style="{
                        left: xPos + 'px',
                        top: yPos + 'px',
                    }" />
    </div>
  </div>
</template>

<script>
import KEYS from "./../config/keys.js";
import Character from './Character.vue';
export default {
  name: 'PlaySpace',
  components: {
    Character
  },
  data () {
    return {
      xPos: 0,
      yPos: 0
    }
  },
  created() {
    window.addEventListener("keydown", this.listenKeysPressed);
  },
  methods: {
    move() {

    },
    listenKeysPressed(e) {
      if (e.which === KEYS.RIGHT) {
        console.log(e.which);
        this.move(e.which);
        this.xPos = this.xPos + 20;
      }
    },
  }
}
</script>

<style scoped>
.PlayBox {
  @apply box-content h-32 w-64 p-4 border-4 border-gray-400 bg-gray-200;
}

.PlayArea {
  @apply h-full w-full bg-gray-400;
}


#paddle {
    position: absolute;
    left: 10px;
    top: 500px;
    width: 20px;
    height: 20px;
    margin: 0.5px;
    background: #000000;
    border-radius: 2px;
}
</style>
