<template>
  <div class="Login">
    <form class="Login--form">
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="Login--form-name-label" for="grid-name">
            Name
          </label>
          <input class="Login--form-name-input" :class="{ 'border-red-500': errors.length }" id="grid-name" type="text" ref="name" placeholder="Luke" v-model="name">
          <p v-for="(error, index) in errors" :key="`error-${index}`" class="text-red-500 text-xs italic">{{ error }}</p>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-2">
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label class="Login--form-version-label" for="grid-version">
              Version
          </label>
          <div class="relative">	
            <label for="red">
              <input type="radio"
                    id="red"
                    value="Red"
                    v-model="versionOption"> Red
            </label>
            <label for="blue">
              <input type="radio"
                    id="blue"
                    value="Blue"
                    v-model="versionOption"> Blue
            </label>
          </div>
        </div>
      </div>

      <div class="md:flex md:items-center">
        <div class="md:w-2/3">
          <button class="Login--button" type="button" @click.prevent="submitted">
            Sign Up
          </button>
        </div>
      </div>
    </form>
  </div>
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
    }
  },

  mounted() {
    this.focusInput();
  },

  methods: {
    focusInput() {
      this.$refs.name.focus();
    },

    submitted() {
      if (this.name && this.versionOption) {
        UserService
          .login({ name: this.name, version: this.versionOption })
          .then((response) => {
            console.log(response)
          })

        this.$router.push({ 
          name: 'PlaySpace', 
          params: { 
            name: this.name, 
            version: this.versionOption 
          } 
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
}

.Login--form {
  @apply w-full max-w-lg
}

.Login--form-name-label {
  @apply block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2
}

.Login--form-name-input {
  @apply appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight
}

.Login--form-name-input:focus {
  @apply outline-none bg-white
}

.Login--form-version-label {
  @apply block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2
}

.Login--button {
  @apply shadow bg-purple-500 text-white font-bold py-2 px-4 rounded
}

.Login--button:hover {
  @apply bg-purple-400
}

.Login--button:focus {
  @apply shadow-outline outline-none
}
</style>
