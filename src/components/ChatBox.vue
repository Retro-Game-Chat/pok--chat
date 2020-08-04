<template>
  <div class="box">Welcome to Route 11 chat!</div>
</template>

<script>
export default {
  name: 'ChatBox'
}
</script>

<style scoped>
@font-face {
  font-family: "Pokemon GB";
  src: url('~@/assets/fonts/pokemon-gb/PokemonGb-RAeo.ttf') format("truetype");
  font-weight: normal;
  font-style: normal;
}

.box {
  bottom: -7.8rem;
  position: absolute;
  font-size: 0.5rem;
  font-family: "Pokemon GB", Arial, sans-serif;
  border-radius: 0.125rem;
  padding: 0.5rem;

  width: 38rem;
  height: 8rem;
  line-height: 1rem;
  margin: auto;
  background: white;
  border: 1px solid white;
  box-shadow: 0 1px 0 1px black,
              inset 0 1px 0 1px black,
              0 0 0 1px black,
              inset 0 0 0 1px black;
}
</style>