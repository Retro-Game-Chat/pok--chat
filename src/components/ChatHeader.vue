<template>
  <div class="Chat__Header">
    <input class="Chat__Input"
      id="message"
      type="text"
      ref="message"
      maxlength="50"
      placeholder="Y to chat"
      v-model="message"
      autocomplete="off"
      @keyup.enter.exact="sendMessage"
      @keyup.esc.exact="$event.target.blur()"
      @focus="typing = true"
      @blur="typing = false"
    />
    <button class="Chat__Action" type="button" @click.prevent="sendMessage">
      ↵ to send
    </button>
  </div>
</template>

<script>
const keys = {
  89: {
    name: 'y',
    do: (context) => {
      context.$nextTick(() => {
        context.$refs.message.focus()
      })
    }
  }
}

export default {
  name: 'ChatHeader',

  props: {
    conversation: {
      type: Object,
      required: true
    },
    me: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      message: null,
      errors: [],
      typing: false
    }
  },

  mounted() {
    window.addEventListener('keyup', this.shortcuts)
  },

  beforeDestroy() {
    window.removeEventListener('keyup', this.shortcuts)
  },

  methods: {
    shortcuts(e) {
      if (!this.typing) {
        const action = keys[e.which]

        if (action) {
          keys[e.which].do(this)
        }
      }
    },

    sendMessage () {
      const message = this.message

      if (message.replace(/\s/g,'').length > 0) {
        this.conversation
          .sendText(message.trim())
          .then(() => {
            this.$nextTick(() => {
              this.$refs.message.focus()
              this.$refs.message.value = ''
            })
          })
          .catch(console.error)
      }
    }
  }
}
</script>

<style scoped>
.Chat__Header {
  @apply border-b flex pb-2;
}

.Chat__Input {
  @apply flex-1;
}

.Chat__Input:focus {
  @apply outline-none;
}

.Chat__Action {
  @apply flex-none;
}
</style>