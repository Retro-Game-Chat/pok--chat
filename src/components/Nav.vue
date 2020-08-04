<template>
  <nav class="Nav">
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div>
        <a href="#" class="Nav__download">Download</a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Nav'
}
</script>

<style scoped>
.Nav {
  @apply flex items-center justify-between flex-wrap bg-teal-500 p-6;
}
.Nav__download {
  @apply inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0;
}
</style>