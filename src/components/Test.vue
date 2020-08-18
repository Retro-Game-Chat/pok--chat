<template>
  <div class="PokéBox CharacterCustomisation">
    <div class="w-1/3 h-auto my-auto" style="zoom: 150%">
      <div class="m-auto overflow-y-visible" :style="`width: 1rem; height: 1rem; background: no-repeat url('${require(`@/assets/artwork/gif/body/${data.body}.gif`)}') 0rem 0rem`">
        <div :style="`width: 1rem; height: 1rem; background: no-repeat url('${require(`@/assets/artwork/gif/torso/${data.torso}.gif`)}') 0rem 0rem`">
          <div :style="`width: 1rem; height: 1rem; background: no-repeat url('${require(`@/assets/artwork/gif/legs/${data.legs}.gif`)}') 0rem 0rem`">
            <div :style="`width: 1rem; height: 1rem; background: no-repeat url('${require(`@/assets/artwork/gif/head/${data.head}.gif`)}') 0rem 0rem`"></div>
          </div>
        </div>
      </div>
      <div class="mx-auto mt-2" :style="`width: 1rem; height: 1rem; background: no-repeat url('${require(`@/assets/artwork/gif/body/${data.body}.gif`)}') -4rem 0rem`">
        <div :style="`width: 1rem; height: 1rem; background: no-repeat url('${require(`@/assets/artwork/gif/torso/${data.torso}.gif`)}') -4rem 0rem`">
          <div :style="`width: 1rem; height: 1rem; background: no-repeat url('${require(`@/assets/artwork/gif/legs/${data.legs}.gif`)}') -4rem 0rem`">
            <div :style="`width: 1rem; height: 1rem; background: no-repeat url('${require(`@/assets/artwork/gif/head/${data.head}.gif`)}') -4rem 0rem`"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-2/3 text-right">
      <div class="py-2 leading-8">
        <input 
          class="bg-gray-200 outline-none text-center w-full"
          :class="{ 'border border-red-500': errors.name }"
          type="text"
          v-model="name"
          placeholder="What's your name?"
        >
      </div>
      <div class="flex py-2 text-red-500" v-if="errors.name">
        {{ errors.name }}
      </div>
      <div class="py-2 flex">
        <button 
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-3 flex rounded-l"
          @click.prevent="data.head = data.head-1 > 1 ? data.head-1 : 1"
        >
          &lt;
        </button>
        <input 
          class="bg-gray-200 outline-none text-center flex-auto"
          type="text"
          :value="`Head (${data.head})`"
          @focus="$event.target.blur()"
        >
        <button
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-3 flex rounded-r"
          @click.prevent="data.head = data.head+1 < headEnd ? data.head+1 : headEnd"
        >
          &gt;
        </button>
        <button
          class="font-bold py-2 text-center flex px-3 ml-2 text-base"
          @click.prevent="data.head = random(1, headEnd)"
        >
          ↻
        </button>
      </div>
      <div class="py-2 flex">
        <button 
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-3 flex rounded-l"
          @click.prevent="data.torso = data.torso-1 > 1 ? data.torso-1 : 1"
        >
          &lt;
        </button>
        <input 
          class="bg-gray-200 outline-none text-center flex-auto"
          type="text"
          :value="`Torso (${data.torso})`"
          @focus="$event.target.blur()"
        >
        <button
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-3 flex rounded-r"
          @click.prevent="data.torso = data.torso+1 < torsoEnd ? data.torso+1 : torsoEnd"
        >
          &gt;
        </button>
        <button
          class="font-bold py-2 text-center flex px-3 ml-2 text-base"
          @click.prevent="data.torso = random(1, torsoEnd)"
        >
          ↻
        </button>
      </div>
      <div class="py-2 flex">
        <button 
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-3 flex rounded-l"
          @click.prevent="data.legs = data.legs-1 > 1 ? data.legs-1 : 1"
        >
          &lt;
        </button>
        <input 
          class="bg-gray-200 outline-none text-center flex-auto"
          type="text"
          :value="`Legs (${data.legs})`"
          @focus="$event.target.blur()"
        >
        <button
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-3 flex rounded-r"
          @click.prevent="data.legs = data.legs+1 < legsEnd ? data.legs+1 : legsEnd"
        >
          &gt;
        </button>
        <button
          class="font-bold py-2 text-center flex px-3 ml-2 text-base"
          @click.prevent="data.legs = random(1, legsEnd)"
        >
          ↻
        </button>
      </div>
      <div class="py-2 flex">
        <button 
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-3 flex rounded-l"
          @click.prevent="data.body = data.body-1 > 1 ? data.body-1 : 1"
        >
          &lt;
        </button>
        <input 
          class="bg-gray-200 outline-none text-center flex-auto"
          type="text"
          :value="`Body (${data.body})`"
          @focus="$event.target.blur()"
        >
        <button
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-3 flex rounded-r"
          @click.prevent="data.body = data.body+1 < bodyEnd ? data.body+1 : bodyEnd"
        >
          &gt;
        </button>
        <button
          class="font-bold py-2 text-center flex px-3 ml-2 text-base"
          @click.prevent="data.body = random(1, bodyEnd)"
        >
          ↻
        </button>
      </div>
      <div class="flex py-2">
        <button
          class="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 text-center w-1/2 px-3 mr-2"
          @click.prevent="
            data.head = random(1, headEnd);
            data.torso = random(1, torsoEnd);
            data.legs = random(1, legsEnd);
            data.body = random(1, bodyEnd);
          "
        >
          <span class="text-base">↻</span> Random
        </button>
        <button
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold w-1/2 text-center rounded"
          @click.prevent="submit"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Test',

  data() {
    return {
      errors: {},
      name: null,
      data: {
        head: 1,
        torso: 1,
        legs: 1,
        body: 1,
      },
      headEnd: 69,
      torsoEnd: 2,
      legsEnd: 2,
      bodyEnd: 6,
    }
  },

  methods: {
    submit () {
      this.errors = {}

      if (!this.name) {
        this.errors['name'] = 'Name required'

        // console.log(this.errors)
      }

      if (Object.keys(this.errors).length === 0) {
        console.log({
          name: this.name,
          data: this.data
        })
      } 
    },

    random (min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)

      return Math.floor(Math.random() * (max - min + 1)) + min
    }
  }
}
</script>

<style scoped>
.CharacterCustomisation {
  @apply mt-10 flex;
  width: 35rem
}
</style>