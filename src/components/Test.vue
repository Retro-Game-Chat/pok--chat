<template>
  <div class="PokéBox CharacterCustomisation">
    <div class="w-1/3 h-auto my-auto" style="zoom:200%">
      <div class="m-auto" :style="`width: 1rem; height: 1rem; background: no-repeat url('/artwork/gif/body/${body}.gif') 0rem 0rem`">
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
    <div class="w-2/3 text-center">
      <div class="py-2 leading-8">
        <input 
          class="bg-gray-200 outline-none text-center w-48"
          type="text"
          placeholder="What's your name?"
        >
      </div>
      <div class="py-2 inline-flex">
        <button 
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 text-center w-8 rounded-l"
          @click.prevent="head = head-1 > 1 ? head-1 : 1"
        >
          &lt;
        </button>
        <input 
          class="bg-gray-200 outline-none text-center w-32"
          type="text"
          value="Head"
          @focus="$event.target.blur()"
        >
        <button
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 text-center w-8 rounded-r"
          @click.prevent="head = head+1"
        >
          &gt;
        </button>
      </div>
      <div class="py-2 inline-flex">
        <button 
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 text-center w-8 rounded-l"
          @click.prevent="torso = torso-1 > 1 ? torso-1 : 1"
        >
          &lt;
        </button>
        <input 
          class="bg-gray-200 outline-none text-center w-32"
          type="text"
          value="Torso"
          @focus="$event.target.blur()"
        >
        <button
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 text-center w-8 rounded-r"
          @click.prevent="torso = torso+1"
        >
          &gt;
        </button>
      </div>
      <div class="py-2 inline-flex">
        <button 
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 text-center w-8 rounded-l"
          @click.prevent="legs = legs-1 > 1 ? legs-1 : 1"
        >
          &lt;
        </button>
        <input 
          class="bg-gray-200 outline-none text-center w-32"
          type="text"
          value="Legs"
          @focus="$event.target.blur()"
        >
        <button
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 text-center w-8 rounded-r"
          @click.prevent="legs = legs+1"
        >
          &gt;
        </button>
      </div>
      <div class="py-2 inline-flex">
        <button 
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 text-center w-8 rounded-l"
          @click.prevent="body = body-1 > 1 ? body-1 : 1"
        >
          &lt;
        </button>
        <input 
          class="bg-gray-200 outline-none text-center w-32"
          type="text"
          value="Body"
          @focus="$event.target.blur()"
        >
        <button
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 text-center w-8 rounded-r"
          @click.prevent="body = body+1"
        >
          &gt;
        </button>
      </div>
      <div class="leading-8 py-2">
        <button
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold w-48 text-center rounded"
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
      head: 1,
      torso: 1,
      legs: 1,
      body: 1
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