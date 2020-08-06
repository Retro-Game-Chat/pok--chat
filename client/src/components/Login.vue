<template>
  <div class="Login">
    <form class="w-full max-w-lg">
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-name">
            Name
          </label>
          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" :class="{ 'border-red-500': errors.length }" id="grid-name" type="text" placeholder="Luke" v-model="name">
          <p v-for="(error, index) in errors" :key="`error-${index}`" class="text-red-500 text-xs italic">{{ error }}</p>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-2">
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-version">
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
          <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button" @click.prevent="submitted">
            Sign Up
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
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

  methods: {
    submitted() {
      if (this.name && this.versionOption) {
        this.$router.push({ name: 'PlaySpace', params: { name: this.name, version: this.versionOption } })
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
</style>
