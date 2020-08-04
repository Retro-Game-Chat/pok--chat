<template>
  <div class="Character">
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
  },
}
</script>

<style scoped>
.Character {
  width: 20px;
  height: 20px;
  float: left;
  margin: 0.5px;
  background: #000000;
  border-radius: 2px;
}
</style>