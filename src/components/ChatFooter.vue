<template>
  <ul class="Chat__Footer">
    <li><span class="Chat__Key">Y</span> to chat</li>
    <li><span class="Chat__Key">Esc</span> to close chat</li>
    <li><span class="Chat__Key">↵</span> to send msg</li>
  </ul>
</template>

<script>
export default {
  name: 'ChatHeader'
}
</script>

<style scoped>
.Chat__Footer {
  @apply flex flex-row-reverse text-right align-middle;
  font-size: 0.5rem;
}

.Chat__Footer li {
  @apply pl-2;
}

.Chat__Footer li:not(:first-child)::after {
  content: " | ";
}

.Chat__Key {
  @apply font-bold;
}

.Chat__Key::before {
  content: "[";
}

.Chat__Key::after {
  content: "]";
}
</style>