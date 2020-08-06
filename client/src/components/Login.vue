<template>
  <div class="Login">
    <form class="Login__form">
      <div class="Login__form--name-layout w-full">
        <label class="Login__form--name-label" for="grid-name">
          Name
        </label>
        <input class="Login__form--name-input" :class="{ 'border-red-500': errors.length }" id="grid-name" type="text" ref="name" placeholder="Luke" v-model="name" @keydown.esc.exact.prevent @keyup.esc.exact="$event.target.blur()">
        <p v-for="(error, index) in errors" :key="`error-${index}`" class="text-red-500 text-xs italic">{{ error }}</p>
      </div>
      <div class="Login__form--version-layout">
        <div class="w-full">
          <div class="Login__form--radio-layout">
            <label for="red">
              <input type="radio"
                    id="red"
                    value="Red"
                    class="Login__form--radio"
                    v-model="versionOption">

              <span class="Character Character--down-red"></span>
            </label>
            <label for="blue">
              <input type="radio"
                    id="blue"
                    value="Blue"
                    class="Login__form--radio"
                    v-model="versionOption">

              <span class="Character Character--down-blue"></span>
            </label>
          </div>
        </div>
      </div>

      <div class="md:flex md:items-center">
        <div class="md:w-2/3">
          <button class="Login__form--button" type="button" @click.prevent="submitted">
            Sign Up
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import UserService from '@/services/User'

const keys = {
  82: {
    name: 'red',
    do: () => {
      if (!this.isTextInputFocused) {
        console.log('red')
      }
    }
  },
  66: {
    name: 'blue',
    do: () => {
      if (!this.isTextInputFocused) {
        console.log('blue')
      }
    }
  },
}

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

  created() {
    window.addEventListener('keyup', this.listenChoice)
  },

  methods: {
    listenChoice(e) {
        const action = keys[e.which]

        if (action) {
          action.do();
        }
    },

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
        this.errors.push('Pick a character.')
      }
    }
  }
}
</script>

<style scoped>
.Login {
  @apply flex w-full h-full justify-center items-center;
  margin-top: 5rem;
}

.Login__form {
  @apply w-full max-w-lg
}

.Login__form--name-label {
  @apply block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2
}

.Login__form--name-input {
  @apply appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight
}

.Login__form--name-input:focus {
  @apply outline-none bg-white
}

.Login__form--version-label {
  @apply block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2
}

.Login__form--button {
  @apply shadow bg-purple-500 text-white font-bold py-2 px-4 rounded
}

.Login__form--button:hover {
  @apply bg-purple-400
}

.Login__form--button:focus {
  @apply shadow-outline outline-none
}

.Login__form--name-layout
.Login__form--version-layout {
  @apply flex flex-wrap -mx-3 mb-2
}

.Character {
  @apply absolute h-4 w-4;
  zoom: 400%;
}

.Character--down-red {
  background: no-repeat url('~@/assets/images/overworld.png') 0rem 0rem;
}

.Character--down-blue {
  background: no-repeat url('~@/assets/images/overworld.png') -8rem 0rem;
  left: 5rem;
}

/* .Login__form--radio {
  width: 0;
  height: 0;
} */

.Login__form--radio-layout {
  height: 5rem;
}

[type=radio] { 
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

/* CHECKED STYLES */
[type=radio]:checked + span {
  outline: 1px solid #f00;
}
</style>
