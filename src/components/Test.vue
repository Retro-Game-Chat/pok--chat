<template>
  <div class="PokéBox CharacterCustomisation">
    <div class="w-1/3 h-auto my-auto" style="zoom:250%">
      <div class="m-auto overflow-y-visible" :style="`width: 1rem; height: 1rem; background: no-repeat url('/artwork/gif/body/${body}.gif') 0rem 0rem`">
        <div :style="`width: 1rem; height: 1rem; background: no-repeat url('/artwork/gif/torso/${torso}.gif') 0rem 0rem`">
          <div :style="`width: 1rem; height: 1rem; background: no-repeat url('/artwork/gif/legs/${legs}.gif') 0rem 0rem`">
            <div :style="`width: 1rem; height: 1rem; background: no-repeat url('/artwork/gif/head/${head}.gif') 0rem 0rem`"></div>
          </div>
        </div>
      </div>
      <div class="mx-auto mt-2" :style="`width: 1rem; height: 1rem; background: no-repeat url('/artwork/gif/body/${body}.gif') -4rem 0rem`">
        <div :style="`width: 1rem; height: 1rem; background: no-repeat url('/artwork/gif/torso/${torso}.gif') -4rem 0rem`">
          <div :style="`width: 1rem; height: 1rem; background: no-repeat url('/artwork/gif/legs/${legs}.gif') -4rem 0rem`">
            <div :style="`width: 1rem; height: 1rem; background: no-repeat url('/artwork/gif/head/${head}.gif') -4rem 0rem`"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-2/3 text-right">
      <div class="py-2 leading-8">
        <input 
          class="bg-gray-200 outline-none text-center w-full"
          type="text"
          v-model="name"
          placeholder="What's your name?"
        >
      </div>
      <div class="py-2 flex">
        <button 
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-3 flex rounded-l"
          @click.prevent="head = head-1 > 1 ? head-1 : 1"
        >
          &lt;
        </button>
        <input 
          class="bg-gray-200 outline-none text-center flex-auto"
          type="text"
          :value="`Head (${head})`"
          @focus="$event.target.blur()"
        >
        <button
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-3 flex rounded-r"
          @click.prevent="head = head+1 < headEnd ? head+1 : headEnd"
        >
          &gt;
        </button>
        <button
          class="font-bold py-2 text-center flex px-3 ml-2 text-base"
          @click.prevent="head = random(1, headEnd)"
        >
          ↻
        </button>
      </div>
      <div class="py-2 flex">
        <button 
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-3 flex rounded-l"
          @click.prevent="torso = torso-1 > 1 ? torso-1 : 1"
        >
          &lt;
        </button>
        <input 
          class="bg-gray-200 outline-none text-center flex-auto"
          type="text"
          :value="`Torso (${torso})`"
          @focus="$event.target.blur()"
        >
        <button
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-3 flex rounded-r"
          @click.prevent="torso = torso+1 < torsoEnd ? torso+1 : torsoEnd"
        >
          &gt;
        </button>
        <button
          class="font-bold py-2 text-center flex px-3 ml-2 text-base"
          @click.prevent="torso = random(1, torsoEnd)"
        >
          ↻
        </button>
      </div>
      <div class="py-2 flex">
        <button 
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-3 flex rounded-l"
          @click.prevent="legs = legs-1 > 1 ? legs-1 : 1"
        >
          &lt;
        </button>
        <input 
          class="bg-gray-200 outline-none text-center flex-auto"
          type="text"
          :value="`Legs (${legs})`"
          @focus="$event.target.blur()"
        >
        <button
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-3 flex rounded-r"
          @click.prevent="legs = legs+1 < legsEnd ? legs+1 : legsEnd"
        >
          &gt;
        </button>
        <button
          class="font-bold py-2 text-center flex px-3 ml-2 text-base"
          @click.prevent="legs = random(1, legsEnd)"
        >
          ↻
        </button>
      </div>
      <div class="py-2 flex">
        <button 
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-3 flex rounded-l"
          @click.prevent="body = body-1 > 1 ? body-1 : 1"
        >
          &lt;
        </button>
        <input 
          class="bg-gray-200 outline-none text-center flex-auto"
          type="text"
          :value="`Body (${body})`"
          @focus="$event.target.blur()"
        >
        <button
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-3 flex rounded-r"
          @click.prevent="body = body+1 < bodyEnd ? body+1 : bodyEnd"
        >
          &gt;
        </button>
        <button
          class="font-bold py-2 text-center flex px-3 ml-2 text-base"
          @click.prevent="body = random(1, bodyEnd)"
        >
          ↻
        </button>
      </div>
      <div class="flex py-2">
        <button
          class="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 text-center w-1/2 px-3 mr-2"
          @click.prevent="
            head = random(1, headEnd);
            torso = random(1, torsoEnd);
            legs = random(1, legsEnd);
            body = random(1, bodyEnd);
          "
        >
          <span class="text-base">↻</span> Random
        </button>
        <button
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold w-1/2 text-center rounded"
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
      name: null,
      head: 1,
      headEnd: 69,
      torso: 1,
      torsoEnd: 2,
      legs: 1,
      legsEnd: 2,
      body: 1,
      bodyEnd: 6,
    }
  },

  methods: {
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
  width: 30rem
}
</style>