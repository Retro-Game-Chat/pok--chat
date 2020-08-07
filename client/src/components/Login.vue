<template>
  <form class="PokéBox LoginForm">
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
          v-model="versionOption"
        >

        <label for="blue" class="Character_Label">
          <span class="Character__Image Character__Image--blue"></span>
        </label>
      </div>
      <div class="Character">
        <input
          type="radio"
          class="Character__Input"
          id="red"
          value="red"
          v-model="versionOption"
        >

        <label for="red" class="Character_Label">
          <span class="Character__Image Character__Image--red"></span>
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

export default {
  name: 'Login',

  components: {
  },

  data () {
    return {
      name: null,
      versionOption: null,
      errors: [],
      isTextInputFocused: false
    }
  },

  mounted() {
    this.$refs.name.focus();
  },

  methods: {
    submitted() {
      if (this.name && this.versionOption) {
        UserService
          .login({ name: this.name, version: this.versionOption })
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
      if (!this.versionOption) {
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

.Character .Character__Image {
  @apply inline-block h-4 w-4;
}

.Character .Character__Image--red {
  background: no-repeat url('~@/assets/images/overworld.png') 0rem 0rem;
}

.Character .Character__Image--blue {
  background: no-repeat url('~@/assets/images/overworld.png') -8rem 0rem;
}

</style>
