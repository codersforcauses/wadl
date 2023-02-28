<script setup>
import { ChevronDownIcon, ChevronLeftIcon } from "@heroicons/vue/24/solid";
defineProps({
  showPlus: {
    type: Boolean,
    default: true,
  },
  expandFunc: {
    type: Function,
    default: () => {},
  },
});
</script>

<template>
  <div class="w-full flex pr-5 justify-end p-1 text-black">
    <button>
      <div v-if="showPlus" @click="expandFunc()">
        <ChevronLeftIcon class="w-7 h-7" />
      </div>
      <div v-else @click="expandFunc()">
        <ChevronDownIcon class="w-7 h-7" />
      </div>
    </button>
  </div>
</template>
