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
        <div v-else-if="event.type === 'tip'">
          Welcome to <strong>{{ conversation.display_name }}</strong> chat, <strong>{{ member(event.from).data.name }}</strong>. You can use <span class="Notice__Key">W</span>/<span class="Notice__Key">A</span>/<span class="Notice__Key">S</span>/<span class="Notice__Key">D</span> and the <span class="Notice__Key">arrow</span> keys to move around. Press <span class="Notice__Key">Y</span> to chat / <span class="Notice__Key">Esc</span> to close chat / <span class="Notice__Key">↵</span> to send msg.
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
    this.addTip()
  },

  computed: {
    members () {
      console.log(this.conversation.members)
      return this.conversation.members
    },
  },

  methods: {
    addTip () {
      // this.events.push({
      //   type: 'tip',
      //   from: this.conversation.me.id
      // })
    },

    registerListeners () {
      const { conversation } = this.$props

      conversation.on('text', (user, event) => {
        console.log(event)

        this.events.push(event)

        this.scrollChat()
      })

      conversation.on("member:joined", (user, event) => {
        console.log(event)

        this.events.push(event)

        this.scrollChat()
      })
    },

    getEventHistory () {
      const { conversation } = this.$props

      conversation
        .getEvents({ page_size: 25, order: 'desc', event_type: 'text' })
        .then(eventsPage => {
          eventsPage.items.forEach(event => {
            console.log(event)

            if (['text'].includes(event.type)) {
              this.events.unshift(event)
            }
          })

          this.scrollChat()
        })
        .catch(console.error)
    },

    scrollChat () {
      const chatBox = document.getElementById("ChatBox")
      chatBox.scrollTop = chatBox.scrollHeight
    },
    
    member (memberId) {
      const member = this.members.get(memberId)

      if (member) {
        member.data = JSON.parse(member.display_name)

        return member
      }
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
  @apply w-full block pt-1;
  min-height: 1rem;
  line-height: 1.4rem;
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