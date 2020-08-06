<template>
  <form>
    <div class="Title box">Login to play!</div>
    <div>
      <label for="name">
        Name
      </label>
      <div class="box">
        <input :class="{ 'border-red-500': errors.length, 'border-2': errors.length }" id="name" type="text" ref="name" placeholder="Enter character name..." v-model="name">
      </div>
      <p v-for="(error, index) in errors" :key="`error-${index}`" class="text-red-500 text-xs italic">{{ error }}</p>
    </div>
    <div>
      <label>
        Avatar
      </label>
      <div class="w-full">
        <div>
          <label for="red" class="Character__label">
            <input type="radio"
              id="red"
              value="Red"
              v-model="versionOption">

            <span class="Character Character--down-red"></span>
          </label>
          <label for="blue" class="Character__label">
            <input type="radio"
              id="blue"
              value="Blue"
              v-model="versionOption">

            <span class="Character Character--down-blue"></span>
          </label>
        </div>
      </div>
    </div>

    <div class="text-center">
      <button class="box" type="button" @click.prevent="submitted">
        Sign Up
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
        this.errors.push('Pick a character.')
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

.Character {
  @apply inline-block h-4 w-4;
  zoom: 600%;
}

.Character--down-red {
  background: no-repeat url('~@/assets/images/overworld.png') 0rem 0rem;
}

.Character--down-blue {
  background: no-repeat url('~@/assets/images/overworld.png') -8rem 0rem;
  left: 5rem;
}

input[type=radio] { 
  position: absolute;
  left: -9000rem;
}

input[type=radio]:checked + span {
  outline: 1px solid #f00;
}

form {
  @apply text-center mt-10;
}

.box {
  top: -1.8rem;
  font-size: 0.5rem;
  font-family: "Pokemon GB", Arial, sans-serif;
  border-radius: 0.125rem;
  padding: 0.5rem;
  text-align: center;

  width: 20rem;
  min-height: 2rem;
  line-height: 1rem;
  margin: auto;
  background: white;
  border: 1px solid white;
  box-shadow: 0 1px 0 1px black,
              inset 0 1px 0 1px black,
              0 0 0 1px black,
              inset 0 0 0 1px black;
}

input[type="text"] {
  @apply w-full outline-none leading-normal h-5 overflow-visible p-4;
  font-size: 0.5rem;
  box-sizing: border-box;
}

input[type="text"]::placeholder {
  @apply overflow-visible;
}

.Title {
  font-size: 1rem;
  padding: 1rem;
}

label {
  font-family: "Pokemon GB", Arial, sans-serif;
  @apply block m-5;
}

.Character__label {
  display: inline-block;
}

button.box {
  width: 10rem;
  border: 0px;
  box-shadow: 0 1px 0 1px black,
              inset 0 1px 0 1px black,
              0 0 0 1px black,
              inset 0 0 0 1px black;
}

button.box:hover {
  @apply bg-gray-200;
}
</style>
