<template>
  <ul class="Chat__Events" ref="events">
    <li class="Chat__Event Chat__Event--welcome">Welcome to <strong>{{ conversation.display_name }}</strong> chat!</li>
    <li class="Chat__Event" :class="`Chat__Event--${event.type}`" v-for="event in events" v-bind:key="'event' + event.id">
      <div v-if="event.type === 'text'">
        <strong>{{ memberName(event.from) }}</strong>: {{ event.body.text }}
      </div>
      <div v-else-if="event.type === 'member:joined'">
        <strong>{{ memberName(event.from) }}</strong> has joined <strong>{{ event.conversation.display_name }}</strong> chat!
      </div>
      <div v-else-if="event.type === 'tip'">
        Welcome to <strong>{{ conversation.display_name }}</strong> chat, <strong>{{ memberName(event.from) }}</strong>. You can use <span class="Notice__Key">W</span>/<span class="Notice__Key">A</span>/<span class="Notice__Key">S</span>/<span class="Notice__Key">D</span> and the <span class="Notice__Key">arrow</span> keys to move around. Press <span class="Notice__Key">Y</span> to chat / <span class="Notice__Key">Esc</span> to close chat / <span class="Notice__Key">↵</span> to send msg.
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ChatHeader',

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

  watch: {
    events() {
      // Defer the callback to be executed after the next DOM update cycle
      // (wait until all events are in the DOM before trying to scroll to the last one)
      this.$nextTick(() => {
        this.scrollChat()
      })
    }
  },

  methods: {
    addTip () {
      this.events.push({
        type: 'tip',
        from: this.conversation.me.id
      })
    },

    scrollChat () {
      const events = this.$refs.events;
      events.scrollTop = events.scrollHeight;
    },

    addEvent (type, event) {
      if (
        "user" in event.body
        && !this.members.has(event.from)
      ) {
        this.members.set(event.from, event.body.user)
      }

      if (
        type === event.type
        && this.members.has(event.from)
      ) {
        this.events.push(event)
      }
    },

    registerListeners () {
      const { conversation } = this.$props

      conversation.on('text', (user, event) => {
        this.addEvent('text', event)
      })

      conversation.on('member:joined', (user, event) => {
        this.addEvent('member:joined', event)
      })
    },

    getEventHistory () {
      const { conversation } = this.$props

      conversation
        .getEvents({ page_size: 25, order: 'desc', event_type: 'member:joined' })
        .then(eventsPage => {
          eventsPage.items.forEach(event => {
            if (
              ['member:joined'].includes(event.type)
              && this.members.has(event.from)
            ) {
              this.events.unshift(event)
            }
          })
        })
        .catch(console.error)
    },

    memberName (memberId) {
      const member = this.members.get(memberId)
      member.data = JSON.parse(member.display_name)

      return member.data.name || member.user.name
    }
  },

  computed: {
    members () {
      return new Map(
        [...this.conversation.members] // eslint-disable-next-line
          .filter(([k, v]) => v.state === 'JOINED')
      );
    },
  }
}
</script>

<style scoped>
.Chat__Events {
  @apply flex-auto overflow-y-auto border-b;
  margin-left: -0.4rem;
}

.Chat__Event {
  @apply py-1;
  padding-left: 0.4rem;
}

.Chat__Event:hover {
  @apply bg-gray-200;
}

.Chat__Event--tip {
  @apply py-1 bg-gray-200 mb-1;
}

.Chat__Event--welcome {
  @apply py-4 text-base;
}
</style>