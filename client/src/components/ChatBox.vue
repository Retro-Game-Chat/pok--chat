<template>
  <div class="box">
    <ul>
      <li v-for="event in events" v-bind:key="'event' + event.id" class="chat-row">
        <div v-if="event.type === 'text'">
          <strong>{{ name(members.get(event.from).display_name) }}</strong>: {{ event.body.text }}
        </div>
        <div v-else-if="event.type === 'member:joined'">
          <strong>{{ name(event.body.user.display_name) }}</strong> has joined <strong>#{{ event.conversation.display_name }}</strong>.
        </div>
      </li>
    </ul>
    <p class="notice">Press Y to chat.</p>
  </div>
</template>

<script>
export default {
  name: 'ChatBox',

  props: {
    conversation: {
      type: Object,
      required: true
    },
  },

  data () {
    let members = new Map()

    if (this.conversation) {
      members = this.conversation.members
    }

    return {
      events: [],
      members
    }
  },

  mounted () {
    this.registerListeners()
  },

  methods: {
    name(data) {
      return JSON.parse(data).n
    },
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
        const items = document.querySelectorAll(".chat-row")
        const last = items[items.length-1]

        if (last !== undefined) {
          last.scrollIntoView()
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

.notice {
  position: absolute;
  right: 0.5rem;
  bottom: 0;
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

ul {
  height: 7rem;
  overflow-y: scroll;
}
</style>