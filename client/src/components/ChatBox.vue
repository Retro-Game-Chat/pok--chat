<template>
  <div class="PokéBox PokéBox__ChatBox">
    <ul id="ChatBox">
      <li class="mb-2">Welcome to <strong>{{ conversation.display_name }}</strong> chat!</li>
      <li v-for="event in events" v-bind:key="'event' + event.id">
        <div v-if="event.type === 'text'">
          <strong>{{ event.from }}</strong>: {{ event.body.text }}
        </div>
        <div v-else-if="event.type === 'member:joined'">
          <strong>{{ event.from }}</strong> has joined <strong>{{ event.conversation.display_name }}</strong> chat!.
        </div>
      </li>
      <li> </li>
    </ul>
    <p class="ChatBox__Notice">Press Y to chat.</p>
  </div>
</template>

<script>
export default {
  name: 'ChatBox',

  props: {
    conversation: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      events: []
    }
  },

  mounted () {
    this.registerListeners()
  },

  methods: {
    registerListeners () {
      const { conversation } = this.$props

      conversation.on('text', (user, event) => {
        this.events.push(event)

        this.scrollChat()
      })

      conversation.on("member:joined", (user, event) => {
        this.events.push(event)

        this.scrollChat()
      })
    },
    scrollChat () {
      const chatBox = document.getElementById("ChatBox")
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }
}
</script>

<style scoped>
.PokéBox__ChatBox {
  bottom: -9.8rem;
  position: absolute;

  width: 38rem;
  height: 10rem;
}

.PokéBox__ChatBox ul {
  height: 8rem;
  overflow: auto;
}

.PokéBox__ChatBox ul li {
  @apply h-4 w-full;
  display: block;
}

.ChatBox__Notice {
  position: absolute;
  right: 0.5rem;
  bottom: 0;
}
</style>