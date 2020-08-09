<template>
  <div class="PokéBox PokéBox__ChatBox">
    <ul id="ChatBox">
      <li class="mb-2">Welcome to <strong>{{ conversation.display_name }}</strong> chat!</li>
      <li v-for="event in events" v-bind:key="'event' + event.id">
        <div v-if="event.type === 'text'">
          <strong>{{ member(event.from).data.name }}</strong>: {{ event.body.text }}
        </div>
        <div v-else-if="event.type === 'member:joined'">
          <strong>{{ member(event.from).data.name }}</strong> has joined <strong>{{ event.conversation.display_name }}</strong> chat!.
        </div>
      </li>
      <li> </li>
    </ul>
    <p class="ChatBox__Notice"><span class="Notice__Key">Y</span> to chat / <span class="Notice__Key">Esc</span> to close chat / <span class="Notice__Key">↵</span> to send msg.</p>
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
    this.getEventHistory()
    this.registerListeners()
  },

  computed: {
    members () {
      return this.conversation.members
    },
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


    getEventHistory () {
      const { conversation } = this.$props

      conversation
        .getEvents({ page_size: 25, order: 'desc' })
        .then(eventsPage => {
          eventsPage.items.forEach(event => {
            if (['member:joined', 'text'].includes(event.type)) {
              this.events.unshift(event)
            }
          })

          this.scrollChat()
        })
        .catch(console.error)
    },

    scrollChat () {
      const chatBox = document.getElementById("ChatBox")
      chatBox.scrollTop = chatBox.scrollHeight;
    },
    
    member (memberId) {
      const member = this.members.get(memberId)
      member.data = JSON.parse(member.display_name)

      return member
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
  min-height: 1rem;
  @apply w-full block;
}

.ChatBox__Notice {
  @apply absolute mb-1;
  right: 0.5rem;
  bottom: 0;
  font-size: 0.4rem;
}

.Notice__Key {
  @apply border p-1 font-bold;
}
</style>