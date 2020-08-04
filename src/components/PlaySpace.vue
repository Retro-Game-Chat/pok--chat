<template>
  <div class="PlayBox">
    <div class="PlayArea">
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlaySpace'
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
