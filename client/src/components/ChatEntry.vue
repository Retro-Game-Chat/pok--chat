<template>
  <div class="box" :class="{ 'hidden': !typing, 'block': typing }">
    <label for="chatEntry">Your msg:</label>
    <input 
      id="chatEntry"
      type="text"
      ref="chatEntry"
      :disabled="disabled"
      maxlength="30" 
      @keydown.enter.exact.prevent
      @keyup.enter.exact="sendMessage"
    />
    <p>⏎ to send</p>
  </div>
</template>

<script>
export default {
  name: 'ChatEntry',

  data () {
    return {
      disabled: true
    }
  },

  props: {
    typing: {
      type: Boolean,
      default: false
    },
    conversation: {
      type: Object,
      required: true
    },
  },

  watch: {
    typing (typing) {
      this.disabled = !typing

      if (typing) {
        this.$nextTick(() => {
          this.$refs.chatEntry.focus()
        })
      } else {
        this.$refs.chatEntry.value = ''
      }
    }
  },

  methods: {
    sendMessage () {
      const chatEntry = this.$refs.chatEntry.value

      if (chatEntry.replace(/\s/g,'').length > 0) {
        this.$props.conversation
          .sendText(chatEntry.trim())
          .then(() => {
            this.$nextTick(() => {
              this.$refs.chatEntry.focus()
              this.$refs.chatEntry.value = ''
            });
          })
          .catch(console.error)
      }
    }
  }
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
  top: 14rem;
  position: absolute;
  font-size: 0.5rem;
  font-family: "Pokemon GB", Arial, sans-serif;
  border-radius: 0.125rem;
  padding: 0.5rem;

  width: 26rem;
  height: 2rem;
  line-height: 1rem;
  margin: auto;
  background: white;
  border: 1px solid white;
  box-shadow: 0 1px 0 1px black,
              inset 0 1px 0 1px black,
              0 0 0 1px black,
              inset 0 0 0 1px black;
}

label, input, p {
  display: inline-block
}

label {
  width: 5rem
}

input {
  width: 13.5rem;
  margin-right: 1rem
}

p {
  width: 5rem
}

input:focus {
  @apply outline-none
}
</style>