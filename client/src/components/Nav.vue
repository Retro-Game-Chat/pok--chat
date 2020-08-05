<template>
  <nav class="Nav">
    <div class="Nav__download">
      <div>
        <a href="#" class="Nav__download--link">Download</a>
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
  @apply w-full block flex-grow
}
.Nav__download:lg {
  @apply flex items-center w-auto
}
.Nav__download--link {
  @apply inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white mt-4;
}
.Nav__download--link:hover {
  @apply border-transparent text-teal-500 bg-white;
}
.Nav__download--link:lg {
  @apply mt-0;
}
</style>