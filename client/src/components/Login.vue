<template>
  <form
    class="PokéBox LoginForm"
    @keydown.enter.prevent
  >
    <label class="LoginForm__InputLabel">
      Who are you?
    </label>
    <input
      class="LoginForm__Input"
      :class="{ 'border-red-500': errors.length }"
      id="name"
      type="text"
      ref="name"
      v-model="name"
      autocomplete="off"
      @keydown.esc.exact.prevent
      @keyup.esc.exact="$event.target.blur()"
      @focus="typing = true"
      @blur="typing = false"
    >
    <ul v-if="errors.length > 0" class="LoginForm__Errors">
      <li
        v-for="(error, index) in errors"
        :key="`error-${index}`"
        class="LoginForm__Error"
      >
        {{ error }}
      </li>
    </ul>
    <label class="LoginForm__CharactersLabel">
      Choose a character
    </label>
    <div class="Characters">
      <div class="Character">
        <input
          type="radio"
          class="Character__Input"
          id="blue"
          value="blue"
          ref="blue"
          v-model="color"
        >

        <label for="blue" class="Character_Label">
          <span class="Character__Image Character__Image--blue">B</span>
        </label>
      </div>
      <div class="Character">
        <input
          type="radio"
          class="Character__Input"
          id="red"
          value="red"
          ref="red"
          v-model="color"
        >

        <label for="red" class="Character_Label">
          <span class="Character__Image Character__Image--red">R</span>
        </label>
      </div>
    </div>
    <div class="text-right">
      <button type="button" @click.prevent="submitted">
        ⏎ start
      </button>
    </div>
  </form>
</template>

<script>
import UserService from '@/services/User'

const keys = {
  66: {
    name: 'b',
    do: (context) => {
      context.color = 'blue'
    }
  },
  82: {
    name: 'r',
    do: (context) => {
      context.color = 'red'
    }
  },
  13: {
    name: 'enter',
    do: (context) => {
      context.submitted()
    }
  },
}

export default {
  name: 'Login',

  data () {
    return {
      name: null,
      color: null,
      errors: [],
      typing: false
    }
  },

  mounted() {
    this.$refs.name.focus();
    window.addEventListener('keydown', this.shortcuts)
  },

  beforeDestroy() {
    window.removeEventListener('keydown', this.shortcuts);
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

    submitted() {
      if (this.name && this.color) {
        UserService
          .login({ name: this.name, color: this.color })
          .then((response) => {
            this.$router.push({ 
              name: 'PlaySpace', 
              params: { ...response.data } 
            })
          })
      }

      this.errors = []

      if (!this.name) {
        this.errors.push('Name required.')
      }
      if (!this.color) {
        this.errors.push('Character required.')
      }
    }
  }
}
</script>

<style scoped>
.LoginForm {
  @apply flex flex-col w-64 mt-20;
}

.LoginForm__Input {
  @apply border-b border-black mt-4 outline-none;
}

.LoginForm__Errors {
  @apply mt-4 text-red-500 italic;
}

.LoginForm__CharactersLabel {
  @apply mt-4;
}

.Characters {
  @apply flex;
}

.Character {
  @apply m-2;
  zoom: 150%;
}

.Character__Input {
  @apply absolute;
  left: -9999px;
}

.Character__Input:checked + .Character_Label {
  @apply border-b-2 border-black;
}

.Character__Image {
  @apply inline-block h-4 w-4 pt-3 pl-4;
  font-size: 8px;
}

.Character__Image--red {
  background: no-repeat url('~@/assets/images/overworld.png') 0rem 0rem;
}

.Character__Image--blue {
  background: no-repeat url('~@/assets/images/overworld.png') -8rem 0rem;
}

</style>
