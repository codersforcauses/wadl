<template>
  <div class="flex py-6 justify-center w-3/4">
    <span
      class="inline-flex items-center rounded-l-md border-2 border-r-0 px-2 py-2"
    >
      <MagnifyingGlassIcon class="h-5 w-5 text-gray-600" />
    </span>
    <input
      v-model="searchString"
      type="text"
      placeholder="Search"
      class="px-2 border-2 border-l-0 border-grey-300 rounded-r-md w-11/12 focus:outline-none"
      @input="emit('handleFilter', searchString.toLowerCase())"
    />
  </div>
</template>
<script setup>
import { MagnifyingGlassIcon } from "@heroicons/vue/24/solid";

const emit = defineEmits(["handleFilter"]);

// eslint-disable-next-line prefer-const
let searchString = "";
</script>
