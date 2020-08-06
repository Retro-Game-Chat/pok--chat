<template>
  <div class="PokéBox PokéBox_ChatEntry" :class="{ 'hidden': !typing, 'block': typing }">
    <label class="ChatEntry__Label" for="chatEntry">Your msg:</label>
    <input class="ChatEntry__Input"
      id="chatEntry"
      type="text"
      ref="chatEntry"
      :disabled="disabled"
      maxlength="30" 
      @keydown.enter.exact.prevent
      @keyup.enter.exact="sendMessage"
    />
    <button class="ChatEntry__Action" type="button" @click.prevent="sendMessage">
      ⏎ to send
    </button>
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
.PokéBox_ChatEntry {
  @apply leading-8;
  width: 30rem;
}

.ChatEntry__Label, .ChatEntry__Input, .ChatEntry__Action {
  @apply inline-block;
}

.ChatEntry__Label {
  @apply ml-4 w-24;
}

.ChatEntry__Input {
  @apply mr-4 w-56;
}

.ChatEntry__Action {
  @apply w-24;
}

.ChatEntry__Input:focus {
  @apply outline-none;
}
</style>