<template>
  <div class="Notice__Container">
    <div class="PokéBox PokéBox_Notice">{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: 'Notice',

  props: {
    message: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.Notice__Container {
  @apply flex mt-10 justify-center
}

.PokéBox_Notice {
  @apply w-3/4 text-center
}
</style>